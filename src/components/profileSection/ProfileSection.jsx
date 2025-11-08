import React from "react";
import ProfileGallery from "../profileGallery/ProfileGallery";
import "./ProfileSection.css";

//Profile Feed
/**
 * ProfileSection Component
 * Renders a title and a horizontal row of profiles
 */
export default function ProfileSection({ title, profiles }) {
  return (
    <section className="profile-section">
      <h2>People who also like <strong>{title}</strong></h2>
      <ProfileGallery profiles={profiles} />
    </section>
  );
}