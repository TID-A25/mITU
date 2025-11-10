import React from "react";
import ProfileCard from "../profileCard/ProfileCard";
import "../../pages/Pages.css";
import "./ProfileGallery.css";

/**
 * HorizontalScroller Component
 * Displays profile cards in a horizontal scroll layout
 */
export default function ProfileGallery({ profiles }) {
  return (
    <div className="gallery">
      {profiles.map((profile, i) => (
        <ProfileCard key={i} profile={profile} />
      ))}
    </div>
  );
}
