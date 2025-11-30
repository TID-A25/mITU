import React from "react";
// asset paths: this file lives at src/components/profile, so go up two levels to src/
import verifiedBadge from "../../assets/images/icons/Verified.svg";
import globe from "../../assets/images/icons/Globe.svg";
import phoneIcon from "../../assets/images/icons/Phone.svg";
import hat from "../../assets/images/icons/Graduation_hat.svg";
import ActionButtons from "../buttons/ActionButtons.jsx";
import "./ProfileInfo.css";

export default function ProfileInfo({
  profile,
  isOwnProfile = false,
  onBump = () => {}
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

      <div className="info-row">
        <img src={phoneIcon} className="phone" alt="Phone" />
        <p className="phone-label">WhatsApp: {profile.phone || 'Not specified'}</p>
      </div>

      {/* small helper to make sure every profile shows a deterministic DK number when there's no phone in the data */}
    </div>
  );
}
