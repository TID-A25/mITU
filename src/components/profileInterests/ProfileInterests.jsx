import React from "react";
import InterestGallery from "../interestGallery/InterestGallery.jsx";

export default function ProfileInterests({ interests }) {
  return (
    <div className="interests-row">
      <h3>Interests</h3>
      <InterestGallery interests={interests} />
    </div>
  );
}