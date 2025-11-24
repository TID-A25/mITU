// ProfileSection component - displays profiles grouped by shared interest
import React from "react";
import ProfileGallery from "../profileGallery/ProfileGallery";
import "./ProfileSection.css";

//Profile Feed
/**
 * ProfileSection Component
 * Renders a title and a horizontal row of profiles
 * Used on the home page to group profiles by shared interests
 * 
 * Props:
 * - title: The name of the shared interest
 * - profiles: Array of profile objects who share this interest
 */

export default function ProfileSection({ title, profiles }) {
  return (
    <section className="profile-section">
      {/* Section title showing the shared interest name */}
      <h2>
        People who also like <strong>{title}</strong>
      </h2>
      {/* Horizontal gallery of profiles */}
      <ProfileGallery profiles={profiles} />
    </section>
  );
}
