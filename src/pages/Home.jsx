// Home page component - displays profiles grouped by shared interests
import React from "react";
import ProfileSection from "../components/profileSection/ProfileSection.jsx";
import "../App.css";
import "./Pages.css";
import useProfiles from "../hooks/useProfiles";
import Atrium from "../assets/images/atrium.jpg";
import arrowDown from "../assets/images/icons/arrow_down.svg";
import { CURRENT_USER_ID } from "../constants/currentUser"; 

export default function Home() {

  // Fetch all profiles except current user, grouped by interests
  // Also fetch current user's interests to highlight common ones
  const { profilesByInterest, currentUserInterests, loading, error, refresh } =
    useProfiles({
      excludeUserId: CURRENT_USER_ID,
      currentUserId: CURRENT_USER_ID,
    });

  // Show loading state while fetching profiles
  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading profiles..</p>
      </div>
    );
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="page container stack">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  // Show empty state if no profiles with interests found
  if (!profilesByInterest || Object.keys(profilesByInterest).length === 0) {
    return (
      <div className="page container stack">
        <p>No profiles with matching interests found.</p>
      </div>
    );
  }

  // Render profiles grouped by interest
  return (
    <div className="page container stack">
      <img alt="Atrium" className="atrium" src={Atrium} />
      <div className="home-welcome">
        <h1 className="welcome-title">Welcome to the Atrium!</h1>
        <p className="welcome-subtitle">
          Take a look around and see if there's someone you'd like to bump into.
        </p>
      </div>
      <div className="arrow-down">
        <img src={arrowDown} alt="arrow-down" className="arrow-down" />
      </div>

      {/* Map over each interest and render a ProfileSection for it */}
      {Object.entries(profilesByInterest).map(([interest, profiles]) => (
        <ProfileSection
          key={interest}
          title={interest}
          profiles={profiles}
          isCommonInterest={currentUserInterests.includes(interest)}
        />
      ))}
    </div>
  );
}
