import React from "react";
import ProfileCard from "./ProfileCard";
import "./ProfileSection.css";

/**
 * HorizontalScroller Component
 * Displays profile cards in a horizontal scroll layout
 */
export default function HorizontalScroller({ profiles }) {
  return (
    <div className="horizontal-scroll">
      {profiles.map((profile, i) => (
        <ProfileCard key={i} profile={profile} />
      ))}
    </div>
  );
}