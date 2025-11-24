// ProfileCard component - clickable card displaying profile photo, name, degree, and interests
import { Link } from "react-router-dom";
import React from "react";
import "./ProfileCard.css";

export default function ProfileCard({ profile }) {
  // Helper function to get profile picture URL with fallback
  const getProfilePicture = () => {
    if (profile.profilePicture) {
      return profile.profilePicture;
    }
    // Fallback to a placeholder image if no profile picture available
    return "https://via.placeholder.com/150x150/cccccc/666666?text=No+Image";
  };

  return (
    // Card links to the user's profile page
    <Link to={`/user/${profile.id}`}>
      <div className="profile-card">
        {/* Profile photo as background with text overlay */}
        <div
          className="profile-photo"
          style={{ 
            backgroundImage: `url(${getProfilePicture()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#f0f0f0' // Why is the styling in here?
          }}
        >
          {/* Name and degree overlay on photo */}
          <div className="profile-info">
            <h3>{profile.name}</h3>
            <p>{profile.degree}</p>
          </div>
        </div>

        {/* List of user's interests as badges */}
        <div className="interests">
          {(profile.interests || []).map((interest, i) => (
            <span key={i}>{interest}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
