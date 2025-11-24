import React from "react";
// asset paths: this file lives at src/components/profile, so go up two levels to src/
import verifiedBadge from "../../assets/images/icons/Verified.svg";
import settingsIcon from "../../assets/images/icons/Settings.svg";
import globe from "../../assets/images/icons/Globe.svg";
import hat from "../../assets/images/icons/Graduation_hat.svg";
import ActionButtons from "../buttons/ActionButtons.jsx";
import "./ProfileInfo.css";

export default function ProfileInfo({
  profile,
  isOwnProfile = false,
  onBump = () => {},
  onSettings = () => {},
}) {
  return (
    <div className="user-profile-info">
      <div className="name-row">
        <h3>{profile.name}</h3>
        <img src={verifiedBadge} className="badge" alt="Verified badge" />
        {!isOwnProfile && (
          <ActionButtons
            mode="single"
            size="small"
            color="teal"
            label="Bump"
            onClick={onBump}
          />
        )}
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
  );
}
