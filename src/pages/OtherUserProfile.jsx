import React from "react";
import { mockProfileData } from "../data/mockProfiles.js";
import ProfileHeader from "../components/profileHeader/ProfileHeader.jsx";
import ProfileInfo from "../components/profileInfo/ProfileInfo.jsx";
import ProfileInterests from "../components/profileInterests/ProfileInterests.jsx";
import chadPic from "../assets/images/profiles/Chad.jpg";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Load global styles here
import "./Pages.css"; // Load page-specific styles here

export default function OtherUserProfilePage() {
  const profile = mockProfileData[1];
  const navigate = useNavigate();

  return (
    <div className="page container stack">
      <ProfileHeader
        profilePicture={chadPic}
        showSettings={false}
        //navigates to bump page
        onBump={() => navigate("/bump-sent")}
      />
      <ProfileInfo profile={profile} />
      <ProfileInterests interests={profile.interests || profile.interest} />
    </div>
  );
}
