import React from "react";
import InterestScroller from "./InterestScroller.jsx";

export default function ProfileInterests({ interests }) {
  return (
    <div className="interests-row">
      <h3>Interests</h3>
      <InterestScroller interests={interests} />
    </div>
  );
}