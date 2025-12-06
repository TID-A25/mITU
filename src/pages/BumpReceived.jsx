import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useProfile from "../hooks/useProfile";
import useAcceptBump from "../hooks/useAcceptBump";
import useCancelBump from "../hooks/useCancelBump";
import ActionButtons from "../components/buttons/ActionButtons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";
import InterestGallery from "../components/interestGallery/InterestGallery.jsx";
import Toast from "../components/ui/Toast.jsx";
import { CURRENT_USER_ID } from "../constants/currentUser";
import "../App.css";
import "./Pages.css";

export default function BumpReceived() {
  const params = useParams();
  const navigate = useNavigate();
  const otherUserId = params.otherUserId || params.userId;
  
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const currentHook = useProfile(CURRENT_USER_ID);
  const otherHook = useProfile(otherUserId);

  const currentProfile = currentHook.profile;
  const otherProfile = otherHook.profile;
  const loading = currentHook.loading || otherHook.loading;
  const error = currentHook.error || otherHook.error;

  const { handleAccept, error: acceptError, message } = useAcceptBump(
    CURRENT_USER_ID,
    otherUserId
  );

  const { handleCancel, error: cancelError } = useCancelBump(
    CURRENT_USER_ID,
    otherUserId
  );

  const sharedInterests = (currentProfile?.interests || []).filter((i) => 
    (otherProfile?.interests || []).includes(i)
  );

  const onAccept = async () => {
    const success = await handleAccept();
    if (success) {
      setToastMessage("Bump accepted!");
      setToastOpen(true);
    } else if (acceptError) {
      setToastMessage(acceptError);
      setToastOpen(true);
    }
  };

  const onDecline = async () => {
    const success = await handleCancel();
    if (success) {
      setToastMessage("Bump declined");
      setToastOpen(true);
    } else if (cancelError) {
      setToastMessage(cancelError);
      setToastOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading bump request...</p>
      </div>
    );
  }

  if (error || acceptError) {
    return (
      <div className="page container stack">
        <p className="error-message">{error || acceptError}</p>
      </div>
    );
  }

  return (
    <div className="page container stack">
      {message && (
        <div
          style={{
            background: "#d1f2eb",
            padding: "10px",
            borderRadius: 6,
            marginBottom: 12,
          }}
        >
          {message}
        </div>
      )}
      
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

      <ActionButtons
        mode="bump"
        variant="received"
        onClick={onAccept}
        onSecondaryClick={onDecline}
      />

      <Toast
        open={toastOpen}
        message={toastMessage}
        duration={2200}
        onClose={() => {
          setToastOpen(false);
          navigate("/notifications");
        }}
      />
    </div>
  );
}
