import React from "react";
import verifiedBadge from "../assets/Verified.svg";
import { mockProfileData } from "../data/mockProfiles.js";
import coverPhoto from "../assets/Coverpicture.jpg";
import profilePicture from "../assets/Athena.jpg";
import globe from "../assets/Globe.svg";
import hat from "../assets/Graduation_hat.svg";
import settingsIcon from "../assets/Settings.svg";
// InterestScroller lives under src/components/profile
import InterestScroller from "../components/profile/InterestScroller.jsx";

export default function UserProfile() {
  {
    /*We load the first element in the mock data list*/
  }
  const profile = mockProfileData[0];

  return (
    <div>
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
          <h3>{profile.name}</h3>
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
        <InterestScroller interests={profile.interests || profile.interest} />
      </div>
    </div>
  );
}
