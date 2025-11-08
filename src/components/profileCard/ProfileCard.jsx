import { Link } from "react-router-dom";
import React from "react";
import "../profileSection/ProfileSection.css";

export default function ProfileCard({ profile }) {
  return (
    <Link to={`/user/${profile.objectId}`}>
      <div className="profile-card">
        <div
          className="profile-photo"
          style={{ backgroundImage: `url(${profile.profile_pic?.url})` }}
        >
          <div className="profile-info">
            <h3>{profile.first_name} {profile.last_name}</h3>
            <p>{profile.programme}</p>
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
