import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ActionButtons from "../components/buttons/ActionButtons.jsx";
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
  const [bumpMessage, setBumpMessage] = useState(null);

  // compute shared interests when both profiles available
  const sharedInterests = (currentProfile?.interests || []).filter((i) => (otherProfile?.interests || []).includes(i));

  useEffect(() => {
    async function sendBumpOnce() {
      if (!currentProfile || !otherProfile || bumpCreated) return;

      // mark as created to avoid duplicate requests
      setBumpCreated(true);
      try {
        const result = await createBump({ userAId: currentProfile.id, userBId: otherProfile.id, requestedById: currentProfile.id });
        // If bump already existed, notify the user
        if (result && result.created === false) {
          setBumpMessage("You have already sent a bump to this person");
        }
      } catch (err) {
        console.error("Failed to create bump:", err);
        // reset so we can retry later
        setBumpCreated(false);
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
      {bumpMessage && (
        <div style={{ background: "#fff3cd", padding: "10px", borderRadius: 6, marginBottom: 12 }}>
          {bumpMessage}
        </div>
      )}
      <BumpHeader currentUser={currentProfile} otherUser={otherProfile} />

      <div className="shared-interest-title">
        <h4 className="name-row">You both like:</h4>
      </div>
      <div className="shared-interest-card">
        <InterestGallery interests={sharedInterests} />
      </div>

      <ActionButtons mode="bump" variant="sent" />
    </div>
  );
}
