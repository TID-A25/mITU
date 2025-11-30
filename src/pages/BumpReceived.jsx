import React from "react";
import { useParams } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import ActionButtons from "../components/buttons/ActionButtons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";
import InterestGallery from "../components/interestGallery/InterestGallery.jsx";

export default function BumpReceived() {
  const params = useParams();
  const otherUserId = params.otherUserId || params.userId;
  
  // Hardcoded current user id for demo
  const CURRENT_USER_ID = "C6YoifVWmr"; // victoria

  const currentHook = useProfile(CURRENT_USER_ID);
  const otherHook = useProfile(otherUserId);

  const currentProfile = currentHook.profile;
  const otherProfile = otherHook.profile;
  const loading = currentHook.loading || otherHook.loading;
  const error = currentHook.error || otherHook.error;

  // Compute shared interests
  const sharedInterests = (currentProfile?.interests || []).filter((i) => 
    (otherProfile?.interests || []).includes(i)
  );

  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading bump request...</p>
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
      <BumpHeader
        currentUser={currentProfile}
        otherUser={otherProfile}
        leftImageSrc={currentProfile?.profilePicture}
        rightImageSrc={otherProfile?.profilePicture}
        type="received"
      />

      {sharedInterests.length > 0 && (
        <>
          <div className="shared-interest-title">
            <h4 className="name-row">You both like:</h4>
          </div>
          <div className="shared-interest-card">
            <InterestGallery interests={sharedInterests} />
          </div>
        </>
      )}

      <ActionButtons mode="bump" variant="received" />
    </div>
  );
}
