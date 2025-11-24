// ProfileInfo component - displays user details with name, degree, country, and action buttons
import React from "react";

// asset paths: this file lives at src/components/profile, so go up two levels to src/
import verifiedBadge from "../../assets/images/icons/Verified.svg";
import settingsIcon from "../../assets/images/icons/Settings.svg";
import globe from "../../assets/images/icons/Globe.svg";
import hat from "../../assets/images/icons/Graduation_hat.svg";
import ActionButtons from "../buttons/ActionButtons.jsx";
import "./ProfileInfo.css";

export default function ProfileInfo({
  profile,               // Profile object with name, degree, semester, country
  isOwnProfile = false,  // Whether this is the current user's own profile
  onBump = () => {},     // Callback when bump button is clicked
  onSettings = () => {}, // Callback when settings icon is clicked
}) {
  return (
    <div className="user-profile-info">
      {/* Name row with verification badge and action button */}
      <div className="name-row">
        <h3>{profile.name}</h3>
        {/* Verified badge icon */}
        <img src={verifiedBadge} className="badge" alt="Verified badge" />
        {/* Show bump button if viewing another user's profile */}
        {!isOwnProfile && (
          <ActionButtons
            mode="single"
            size="small"
            color="teal"
            label="Bump"
            onClick={onBump}
          />
        )}
        {/* Show settings icon if viewing own profile */}
        {isOwnProfile && (
          <img
            src={settingsIcon}
            className="settings-icon"
            alt="Settings"
            onClick={onSettings}
          />
        )}
      </div>

      {/* Education information row */}
      <div className="info-row">
        <img src={hat} className="hat" alt="Graduation hat" />
        <p>
          {profile.degree}, {profile.semester}
        </p>
      </div>

      {/* Country information row */}
      <div className="info-row">
        <img src={globe} className="globe" alt="Globus" />
        <p>{profile.country}</p>
      </div>
    </div>
  );
}
