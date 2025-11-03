import React from "react";
import { mockProfileData } from "../data/mockProfiles.js";
import profilePicture from "../assets/Athena.jpg";
import otherProfilePicture from "../assets/Chad.jpg";
import confetti_orange from "../assets/Confetti_orange.svg";
import confetti_teal from "../assets/Confetti_teal.svg";
import ButtonBig from "../components/buttons/ButtonBig.jsx";
import ButtonBack from "../components/buttons/ButtonBack.jsx";
import ButtonDecline from "../components/buttons/ButtonDecline.jsx";
import InterestCard from "../components/profile/InterestCard.jsx";

export default function BumpReceived() {
  // load first and second element of mock data list, Athena and Chad
  const you = mockProfileData[0];
  const other = mockProfileData[1];

  return (
    <div className="bump-page">
      {/* The two profile pictures */}
      <div className="bumping-pictures">
        <img src={profilePicture} alt={you.name} className="profile-img" />
        <img
          src={otherProfilePicture}
          alt={other.name}
          className="profile-img"
        />
      </div>

      {/* Title message saying they bumped into you */}
      <div className="bump-title">
        <h3 className="name-row">{other.name} bumped into you!</h3>
      </div>

      {/* Showing You both like: and interest card */}
      <div className="shared-interest-title">
        <h4 className="name-row">You both like:</h4>
      </div>
      <div className="shared-interest-card">
        <InterestCard interest={you.interest} />
      </div>

      <div className="buttons">
        {/* Accept button */}
        <div className="button-big">
          <ButtonBig label="Accept!" />
        </div>

        {/* Back and decline button */}
        <div className="bump-buttons-small">
          <ButtonBack />
          <ButtonDecline label="Decline" />
        </div>
      </div>
    </div>
  );
}
