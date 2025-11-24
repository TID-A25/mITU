// ProfileInterests component - displays a user's interests with title and gallery
import React from "react";
import InterestGallery from "../interestGallery/InterestGallery.jsx";
import "./ProfileInterests.css";

export default function ProfileInterests({ interests }) {
  return (
    <div className="profile-interests">
      {/* Section title */}
      <h3>Interests</h3>
      {/* Gallery displaying all interests with images */}
      <InterestGallery interests={interests} />
    </div>
  );
}
