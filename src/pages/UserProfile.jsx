import React from "react";
import verifiedBadge from "../assets/images/icons/Verified.svg";
import { mockProfileData } from "../data/mockProfiles.js";
import coverPhoto from "../assets/images/profiles/Coverpicture.jpg";
import profilePicture from "../assets/images/profiles/Athena.jpg";
import globe from "../assets/images/icons/Globe.svg";
import hat from "../assets/images/icons/Graduation_hat.svg";
import settingsIcon from "../assets/images/icons/Settings.svg";
// InterestScroller lives under src/components/profile
import InterestGallery from "../components/interestGallery/InterestGallery.jsx";
import "../App.css"; // Load global styles here
import "./Pages.css"; // Load page-specific styles here

export default function UserProfile() {
  {
    /*We load the first element in the mock data list*/
  }
  const profile = mockProfileData[0];

  return (
    <div className="page container stack">
      {/* Header photo and cover photo */}

      <div className="header-wrap">
        <div className="cover-photo-header">
          <img src={coverPhoto} alt="Cover" />
        </div>

        <div className="profile-picture-header">
          <img
            src={profilePicture}
            alt="Profile Picture"
            className="profile-img"
          />
          <img
            src={settingsIcon}
            className="settings-icon"
            alt="Settings icon"
          />
        </div>
      </div>

      {/* Profile info on the page */}
      <div className="user-profile-info">
        <div className="name-row">
          <h2>{profile.name}</h2>
          <img src={verifiedBadge} className="badge" alt="Verified badge" />
        </div>

        <div className="info-row">
          <img src={hat} className="hat" alt="Graduation hat" />
          <p>
            {profile.degree}, {profile.semester}
          </p>
        </div>

        <div className="info-row">
          <img src={globe} className="globe" alt="Globus" />
          <p>{profile.country}</p>
        </div>
      </div>

      {/* Interests row*/}
      <div className="interests-row">
        <h3>Interests</h3>
        <InterestGallery interests={profile.interests || profile.interest} />
      </div>
    </div>
  );
}
