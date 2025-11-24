// ProfileGallery component - displays a horizontal scroll of profile cards
import React from "react";
import ProfileCard from "../profileCard/ProfileCard";
import "./ProfileGallery.css";

/**
 * HorizontalScroller Component
 * Displays profile cards in a horizontal scroll layout
 * 
 * Props:
 * - profiles: Array of profile objects to display
 */

export default function ProfileGallery({ profiles }) {
  return (
    <div className="gallery">
      {/* Map each profile to a clickable ProfileCard component */}
      {profiles.map((profile, i) => (
        <ProfileCard key={i} profile={profile} />
      ))}
    </div>
  );
}
