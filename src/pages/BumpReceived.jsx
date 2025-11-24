// BumpReceived page - shows incoming bump request from another user
import React from "react";
import { mockProfileData } from "../data/mockProfiles.js";
import profilePicture from "../assets/images/profiles/Athena.jpg";
import otherProfilePicture from "../assets/images/profiles/Chad.jpg";
import ActionButtons from "../components/buttons/ActionButtons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";

export default function BumpReceived() {
  // Load mock data for demo (Athena and Chad)
  // Note: Replace with actual bump request data from backend
  const currentUser = mockProfileData[0]; // Athena
  const otherUser = mockProfileData[1];   // Chad

  return (
    <div className="page container stack">
      {/* Header showing who sent the bump */}
      <BumpHeader
        currentUser={currentUser}
        otherUser={otherUser}
        leftImageSrc={profilePicture}
        rightImageSrc={otherProfilePicture}
        interest={currentUser.interest}
        type="received"
      />

      {/* Action buttons (Accept/Decline) */}
      <ActionButtons mode="bump" variant="received" />
    </div>
  );
}
