import React from "react";
// asset paths: this file lives at src/components/profile, so go up two levels to src/
import verifiedBadge from "../../assets/images/icons/Verified.svg";
import globe from "../../assets/images/icons/Globe.svg";
import hat from "../../assets/images/icons/Graduation_hat.svg";
import "./ProfileInfo.css";


export default function ProfileInfo({ profile }) {
  return (
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
  );
}