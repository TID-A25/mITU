import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProfileHeader from "../components/profileHeader/ProfileHeader";
import ProfileInfo from "../components/profileInfo/ProfileInfo";
import InterestGallery from "../components/interestGallery/InterestGallery";
import "./Pages.css";
import useProfile from "../hooks/useProfile";

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // For testing keep user id hardcoded; in production derive from auth
  const CURRENT_USER_ID = 'C6YoifVWmr';

  // whether we show current user's profile (route /user-profile) or a profile by param
  const isOwnProfile = location.pathname === '/user-profile' || userId === CURRENT_USER_ID;
  const targetUserId = location.pathname === '/user-profile' ? CURRENT_USER_ID : userId;

  // Use the reusable hook to fetch a single profile (uses parseQueries.fetchProfileById)
  const { profile, loading, error } = useProfile(targetUserId);

  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading profile..</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page container stack">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page container stack">
        <p className="error-message">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="page container stack">
      <ProfileHeader
        profilePicture={profile.profilePicture}
        showSettings={isOwnProfile}
        onBump={() => navigate(`/bump-sent/${profile.objectId || profile.id}`)}
      />
      <ProfileInfo profile={profile} />
      <InterestGallery interests={profile.interests} />
    </div>
  );
}
