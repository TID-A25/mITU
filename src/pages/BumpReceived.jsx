import React from "react";
import { mockProfileData } from "../data/mockProfiles.js";
import profilePicture from "../assets/images/profiles/Athena.jpg";
import otherProfilePicture from "../assets/images/profiles/Chad.jpg";
import confetti_orange from "../assets/images/icons/Confetti_orange.svg";
import confetti_teal from "../assets/images/icons/Confetti_teal.svg";
import Buttons from "../components/buttons/Buttons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";

export default function BumpReceived() {
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
        type="received"
      />

      {/* Simple presentational buttons component — variant="received" */}
      <Buttons mode="bump" variant="received" />
    </div>
  );
}
