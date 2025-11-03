import React from "react";
import ProfileCard from "./ProfileCard";
import "./ProfileSection.css";

/**
 * HorizontalScroller Component
 * Displays profile cards in a horizontal scroll layout
 */
export default function ProfileGallery({ profiles }) {
  return (
    <div className="profile-gallery">
      {profiles.map((profile, i) => (
        <ProfileCard key={i} profile={profile} />
      ))}
    </div>
  );
}