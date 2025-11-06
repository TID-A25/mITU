import React from "react";
import { mockProfileData } from "../data/mockProfiles.js";
import ProfileHeader from "../components/profileHeader/ProfileHeader.jsx";
import ProfileInfo from "../components/profileInfo/ProfileInfo.jsx";
import ProfileInterests from "../components/profileInterests/ProfileInterests.jsx";
import chadPic from "../assets/images/profiles/Chad.jpg";
import { useNavigate } from "react-router-dom";

export default function OtherUserProfilePage() {
  const profile = mockProfileData[1];
  const navigate = useNavigate();

  return (
    <div>
      <ProfileHeader
        profilePicture={chadPic}
        showSettings={false}
        //navigates to bump page
        onBump={() => navigate("/bump-sent")}
      />
      <ProfileInfo profile={profile} />
      <ProfileInterests
        interests={profile.interests || profile.interest}
      />
    </div>
  );
}
