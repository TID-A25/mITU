import { useState, useEffect } from 'react';
import { CURRENT_USER_ID, setCurrentUserId, DEMO_USERS, initializeCurrentUser } from '../../constants/currentUser';
import './UserSwitcher.css';

export default function UserSwitcher({ onUserChange }) {
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

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
    const newUserId = event.target.value;
    setSelectedUser(newUserId);
    
    const success = await setCurrentUserId(newUserId);
    
    if (success && onUserChange) {
      onUserChange(newUserId);
    }
  };

  if (loading) {
    return (
      <div className="user-switcher">
        <span>Loading users...</span>
      </div>
    );
  }

  return (
    <div className="user-switcher">
      <label htmlFor="user-select">Current User:</label>
      <select 
        id="user-select"
        value={selectedUser} 
        onChange={handleChange}
        className="user-select"
        disabled={loading}
      >
        {Object.entries(users).map(([userId, userName]) => (
          <option key={userId} value={userId}>
            {userName}
          </option>
        ))}
      </select>
    </div>
  );
}