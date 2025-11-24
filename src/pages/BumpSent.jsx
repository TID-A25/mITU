// BumpSent page - shows confirmation after sending a bump to another user
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
  // Get the other user's ID from URL params
  const params = useParams();
  const otherUserId = params.otherUserId || params.userId;
  const navigate = useNavigate();

  // Hardcoded current user ID for demo (victoria)
  const CURRENT_USER_ID = "C6YoifVWmr";

  // Fetch both user profiles using the custom hook
  const currentHook = useProfile(CURRENT_USER_ID);
  const otherHook = useProfile(otherUserId);

  // Extract profile data and loading/error states
  const currentProfile = currentHook.profile;
  const otherProfile = otherHook.profile;
  const loading = currentHook.loading || otherHook.loading;
  const error = currentHook.error || otherHook.error;

  // Track whether we've created a bump to prevent duplicates on remount
  const [bumpCreated, setBumpCreated] = useState(false);
  // Message to show if bump already existed
  const [bumpMessage, setBumpMessage] = useState(null);

  // Compute interests shared between both users
  const sharedInterests = (currentProfile?.interests || []).filter((i) => (otherProfile?.interests || []).includes(i));

  // Effect: create bump once when both profiles are loaded
  useEffect(() => {
    async function sendBumpOnce() {
      // Wait until both profiles are loaded and bump hasn't been created yet
      if (!currentProfile || !otherProfile || bumpCreated) return;

      // Mark as created optimistically to prevent duplicate parallel requests
      setBumpCreated(true);
      try {
        // Attempt to create the bump (service checks for existing bumps)
        const result = await createBump({ userAId: currentProfile.id, userBId: otherProfile.id, requestedById: currentProfile.id });
        // If bump already existed, show notification
        if (result && result.created === false) {
          setBumpMessage("You have already sent a bump to this person");
        }
      } catch (err) {
        console.error("Failed to create bump:", err);
        // Reset flag on error so user can retry
        setBumpCreated(false);
      }
    }

    sendBumpOnce();
  }, [currentProfile, otherProfile, bumpCreated]);

  // Show loading state while fetching profiles
  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading bump page..</p>
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

  // Render bump confirmation page
  return (
    <div className="page container stack">
      {/* Show notification if bump already existed */}
      {bumpMessage && (
        <div style={{ background: "#fff3cd", padding: "10px", borderRadius: 6, marginBottom: 12 }}>
          {bumpMessage}
        </div>
      )}
      {/* Header showing both users and their connection */}
      <BumpHeader currentUser={currentProfile} otherUser={otherProfile} />

      {/* Display shared interests */}
      <div className="shared-interest-title">
        <h4 className="name-row">You both like:</h4>
      </div>
      <div className="shared-interest-card">
        <InterestGallery interests={sharedInterests} />
      </div>

      {/* Action buttons (OK/Cancel) */}
      <ActionButtons mode="bump" variant="sent" />
    </div>
  );
}
