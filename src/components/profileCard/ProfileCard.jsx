import { Link } from "react-router-dom";
import React from "react";
import "./ProfileCard.css";

export default function ProfileCard({ profile }) {
  // Better fallback for profile picture
  const getProfilePicture = () => {
    if (profile.profilePicture) {
      return profile.profilePicture;
    }
    // Fallback to a default avatar or placeholder
    return "https://via.placeholder.com/150x150/cccccc/666666?text=No+Image";
  };

  return (
    <Link to={`/user/${profile.id}`}>
      <div className="profile-card">
        <div
          className="profile-photo"
          style={{ 
            backgroundImage: `url(${getProfilePicture()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#f0f0f0' // Fallback background color
          }}
        >
          <div className="profile-info">
            <h3>{profile.name}</h3>
            <p>{profile.degree}</p>
          </div>
        </div>

        <div className="interests">
          {(profile.interests || []).map((interest, i) => (
            <span key={i}>{interest}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
