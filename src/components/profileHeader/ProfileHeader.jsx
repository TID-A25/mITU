// ProfileHeader component - displays cover photo and profile picture for user profiles
import React from "react";
import { useNavigate } from "react-router-dom";
// asset paths: this file lives at src/components/profile, so go up two levels to src/
import coverPhoto from "../../assets/images/profiles/Coverpicture.jpg";
import editIcon from "../../assets/images/icons/Edit.svg"; 
import "./ProfileHeader.css";

export default function ProfileHeader({ profilePicture, isOwnProfile = false }) {
  const navigate = useNavigate();
  return (
    <div className="header-wrap">
      {/* Cover photo banner */}
      <div className="cover-photo-header">
        <img src={coverPhoto} alt="Cover" />
      </div>

      {/* Profile picture overlapping the cover photo */}
      <div className="profile-picture-header">
        <img src={profilePicture} alt="Profile" className="profile-img" />
        
        {/* Settings icon - only shown on own profile */}
        {isOwnProfile && (
          <img
            src={editIcon} 
            className="settings-icon" 
            alt="Edit"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/ed-it-profile")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/edit-profile")}
          />
        )}
      </div>
    </div>
  );
}
