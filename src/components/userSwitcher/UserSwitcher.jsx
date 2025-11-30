import React, { useState, useEffect } from 'react';
import { CURRENT_USER_ID, setCurrentUserId, DEMO_USERS, initializeCurrentUser } from '../../constants/currentUser';
import './UserSwitcher.css';

export default function UserSwitcher({ onUserChange }) {
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    // Initialize current user from localStorage or default
    initializeCurrentUser();
    setSelectedUser(CURRENT_USER_ID);
  }, []);

  const handleChange = (event) => {
    const newUserId = event.target.value;
    setSelectedUser(newUserId);
    setCurrentUserId(newUserId);
    
    if (onUserChange) {
      onUserChange(newUserId);
    }
  };

  return (
    <div className="user-switcher">
      <label htmlFor="user-select">Current User:</label>
      <select 
        id="user-select"
        value={selectedUser} 
        onChange={handleChange}
        className="user-select"
      >
        {Object.entries(DEMO_USERS).map(([userId, userName]) => (
          <option key={userId} value={userId}>
            {userName}
          </option>
        ))}
      </select>
    </div>
  );
}