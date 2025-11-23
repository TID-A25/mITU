import React from 'react';
import ProfileSection from '../components/profileSection/ProfileSection.jsx';
import '../App.css';
import './Pages.css';
import useProfiles from '../hooks/useProfiles';

export default function Home() {
  // Hardcoded current user id for demo
  const CURRENT_USER_ID = 'C6YoifVWmr'; // user is victoria

  const { profilesByInterest, loading, error, refresh } = useProfiles({
    excludeUserId: CURRENT_USER_ID,
  });

  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading profiles..</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page container stack">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!profilesByInterest || Object.keys(profilesByInterest).length === 0) {
    return (
      <div className="page container stack">
        <p>No profiles with matching interests found.</p>
      </div>
    );
  }

  return (
    <div className="page container stack">
      {Object.entries(profilesByInterest).map(([interest, profiles]) => (
        <ProfileSection key={interest} title={interest} profiles={profiles} />
      ))}
    </div>
  );
}
