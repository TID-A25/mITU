// UserProfile page - displays detailed profile information for a user
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProfileHeader from "../components/profileHeader/ProfileHeader";
import ProfileInfo from "../components/profileInfo/ProfileInfo";
import InterestGallery from "../components/interestGallery/InterestGallery";
import "./Pages.css";
import useProfile from "../hooks/useProfile";

export default function UserProfile() {
  // Get user ID from URL params (if viewing another user's profile)
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Hardcoded current user ID for demo (victoria)
  const CURRENT_USER_ID = "C6YoifVWmr";

  // Determine if viewing own profile or another user's profile
  const isOwnProfile =
    location.pathname === "/user-profile" || userId === CURRENT_USER_ID;
  // Get the target user ID (current user or param user)
  const targetUserId =
    location.pathname === "/user-profile" ? CURRENT_USER_ID : userId;

  // Fetch the target user's profile
  const { profile, loading, error } = useProfile(targetUserId);

  // Show loading state while fetching profile
  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading profile..</p>
      </div>
    );
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="page container stack">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  // Show not found message if profile doesn't exist
  if (!profile) {
    return (
      <div className="page container stack">
        <p className="error-message">Profile not found.</p>
      </div>
    );
  }

  // Render profile page with header, info, and interests
  return (
    <div className="page container stack">
      {/* Profile picture header */}
      <ProfileHeader profilePicture={profile.profilePicture} />
      {/* User information and bump button */}
      <ProfileInfo
        profile={profile}
        isOwnProfile={isOwnProfile}
        onBump={() => navigate(`/bump-sent/${profile.objectId || profile.id}`)}
      />
      {/* Gallery of user's interests */}
      <InterestGallery interests={profile.interests} />
    </div>
  );
}
