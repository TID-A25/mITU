import { useState, useEffect } from 'react';
import { CURRENT_USER_ID, setCurrentUserId, DEMO_USERS, initializeCurrentUser } from '../../constants/currentUser';
import './UserSwitcher.css';

//onuserchange received as a prop from userprofile.jsx
export default function UserSwitcher({ onUserChange }) {
  const [selectedUser, setSelectedUser] = useState(''); // current selected user
  const [users, setUsers] = useState({}); // storing list of users {userid: username}
  const [loading, setLoading] = useState(true); // loading users from the server

  useEffect(() => {
    // Initialize current user from Cloud Function
    const init = async () => {
      try {
        const userId = await initializeCurrentUser();
        setSelectedUser(userId);
        setUsers({ ...DEMO_USERS });
      } catch (error) {
        console.error('Failed to initialize users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    init();
  }, []);

  const handleChange = async (event) => {
    const newUserId = event.target.value; // when a new user is selected in dropdown
    setSelectedUser(newUserId);
    
    const success = await setCurrentUserId(newUserId); // update current user in backend: Update CURRENT_USER_ID to be newUserId
    
    //if set successfull, and callback exists...
    if (success && onUserChange) {
      onUserChange(newUserId);
    }
  };

  // While still fetching users, show a simple loading message.
  if (loading) {
    return (
      <div className="user-switcher">
        <span>Loading users...</span>
      </div>
    );
  }

// dropdown to select user from DEMO_USERS
  return (
    <div className="user-switcher">
      <label htmlFor="user-select">Current User:</label>
      <select 
        id="user-select"
        value={selectedUser}  // keep dropdown in sync with selectedUser state
        onChange={handleChange}
        className="user-select"
        disabled={loading}
      > 
        {Object.entries(users).map(([userId, userName]) => ( //each entry/user in DEMO_USERS as option in dropdown
          <option key={userId} value={userId}>
            {userName}
          </option>
        ))}
      </select>
    </div>
  );
}