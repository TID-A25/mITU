// ProfileHeader component - displays cover photo and profile picture
import React from "react";
// asset paths: this file lives at src/components/profile, so go up two levels to src/
import coverPhoto from "../../assets/images/profiles/Coverpicture.jpg";
import "./ProfileHeader.css";
import "../buttons/Buttons.css";

export default function ProfileHeader({
  profilePicture // URL for the user's profile picture
}) {
  return (
    <div className="header-wrap">
      {/* Cover photo section */}
      <div className="cover-photo-header">
        <img src={coverPhoto} alt="Cover" />
      </div>

      {/* Profile picture overlays the cover photo */}
      <div className="profile-picture-header">
        <img src={profilePicture} alt="Profile" className="profile-img" />

        {/* Note: settings button moved to ProfileInfo for layout consistency */}
      </div>
    </div>
  );
}
