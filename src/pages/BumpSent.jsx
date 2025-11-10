import React from "react";
import { mockProfileData } from "../data/mockProfiles.js";
import profilePicture from "../assets/images/profiles/Athena.jpg";
import otherProfilePicture from "../assets/images/profiles/Chad.jpg";
import confetti_orange from "../assets/images/icons/Confetti_orange.svg";
import confetti_teal from "../assets/images/icons/Confetti_teal.svg";
import BumpButtons from "../components/bump/BumpButtons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";
import "../App.css"; // Load global styles here
import "./Pages.css"; // Load page-specific styles here

export default function BumpSent() {
  // load first and second element of mock data list, Athena and Chad
  const you = mockProfileData[0];
  const other = mockProfileData[1];

  return (
    <div className="page container stack">
      <BumpHeader
        you={you}
        other={other}
        leftImageSrc={profilePicture}
        rightImageSrc={otherProfilePicture}
        interest={you.interest}
        type="sent"
      />

      {/* Simple presentational buttons component — variant="sent" */}
      <BumpButtons variant="sent" />
    </div>
  );
}
