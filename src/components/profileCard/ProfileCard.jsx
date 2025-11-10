import { Link } from "react-router-dom";
import React from "react";
import "./ProfileCard.css";

/**
 * ProfileCard Component
 * @param {Object} profile - contains name, degree, image
 */
export default function ProfileCard({ profile }) {
  return (
    <Link to="/other-user-profile">
      <div className="profile-card">
        <div
          className="profile-photo"
          style={{ backgroundImage: `url(${profile.image})` }}
        >
          <div className="profile-info">
            <h3>{profile.name}</h3>
            <p>{profile.degree}</p>
          </div>
        </div>

        <div className="interests">
          <span>Interest</span>
          <span>Interest</span>
          <span>Interest</span>
        </div>
      </div>
    </Link>
  );
}
