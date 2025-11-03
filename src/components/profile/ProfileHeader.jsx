import React from "react";
// asset paths: this file lives at src/components/profile, so go up two levels to src/
import coverPhoto from "../../assets/Coverpicture.jpg";
import settingsIcon from "../../assets/Settings.svg";
import "./ProfileSection.css";


export default function ProfileHeader({
  profilePicture,
  showSettings = false,
  onBump, //callback function, runs when bump is clicked
}) {
  return (
    <div className="header-wrap">
      <div className="cover-photo-header">
        <img src={coverPhoto} alt="Cover" />
      </div>

      <div className="profile-picture-header">
        <img src={profilePicture} alt="Profile" className="profile-img" />

        {showSettings && (
          <img
            src={settingsIcon}
            className="settings-icon"
            alt="Settings icon"
          />
        )}

        {!showSettings && (
          //calls the onBump prop whn user clicks
          <button className="bump-button" onClick={onBump}>
            Bump
          </button>
        )}
      </div>
    </div>
  );
}
