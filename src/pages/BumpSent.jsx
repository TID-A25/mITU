import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Buttons from "../components/buttons/Buttons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";
import InterestGallery from "../components/interestGallery/InterestGallery.jsx";
import "../App.css";
import "./Pages.css";
import useProfile from "../hooks/useProfile";
import { createBump } from "../services/parseQueries";

export default function BumpSent() {
  const params = useParams();
  const otherUserId = params.otherUserId || params.userId;
  const navigate = useNavigate();

  // Hardcoded current user id for demo
  const CURRENT_USER_ID = "C6YoifVWmr"; // victoria

  // Use hooks to fetch both profiles (current and the other user)
  const currentHook = useProfile(CURRENT_USER_ID);
  const otherHook = useProfile(otherUserId);

  const currentProfile = currentHook.profile;
  const otherProfile = otherHook.profile;
  const loading = currentHook.loading || otherHook.loading;
  const error = currentHook.error || otherHook.error;

  // track whether we've already created a bump to avoid duplicate saves
  const [bumpCreated, setBumpCreated] = useState(false);

  // compute shared interests when both profiles available
  const sharedInterests = (currentProfile?.interests || []).filter((i) => (otherProfile?.interests || []).includes(i));

  useEffect(() => {
    async function sendBumpOnce() {
      if (!currentProfile || !otherProfile || bumpCreated) return;
      try {
        await createBump({ userAId: currentProfile.id, userBId: otherProfile.id, requestedById: currentProfile.id });
        setBumpCreated(true);
      } catch (err) {
        console.error("Failed to create bump:", err);
      }
    }

    sendBumpOnce();
  }, [currentProfile, otherProfile, bumpCreated]);

  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading bump page..</p>
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

  return (
    <div className="page container stack">
      <BumpHeader currentUser={currentProfile} otherUser={otherProfile} />

      <div className="shared-interest-title">
        <h4 className="name-row">You both like:</h4>
      </div>
      <div className="shared-interest-card">
        <InterestGallery interests={sharedInterests} />
      </div>

      <Buttons mode="bump" variant="sent" />
    </div>
  );
}
