import React from "react";
// asset paths: this file lives at src/components/profile, so go up two levels to src/
import coverPhoto from "../../assets/images/profiles/Coverpicture.jpg";
import "./ProfileHeader.css";
import "../buttons/Buttons.css";

export default function ProfileHeader({
  profilePicture
}) {
  return (
    <div className="header-wrap">
      <div className="cover-photo-header">
        <img src={coverPhoto} alt="Cover" />
      </div>

      <div className="profile-picture-header">
        <img src={profilePicture} alt="Profile" className="profile-img" />

        {/* settings moved to ProfileInfo for layout consistency */}
      </div>
    </div>
  );
}
