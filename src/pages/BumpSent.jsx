import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ActionButtons from "../components/buttons/ActionButtons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";
import InterestGallery from "../components/interestGallery/InterestGallery.jsx";
import "../App.css";
import "./Pages.css";
import useProfile from "../hooks/useProfile";
import useCancelBump from "../hooks/useCancelBump";
import Toast from "../components/ui/Toast.jsx";
import useCreateBump from "../hooks/useCreateBump";
import { CURRENT_USER_ID } from "../constants/currentUser";

export default function BumpSent() {
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

  const { message } = useCreateBump(
    currentProfile?.id,
    otherProfile?.id,
    currentProfile?.id
  );

  const { handleCancel, error: cancelError } = useCancelBump(
    CURRENT_USER_ID,
    otherUserId
  );

  const sharedInterests = (currentProfile?.interests || []).filter((i) =>
    (otherProfile?.interests || []).includes(i)
  );

  const onCancel = async () => {
    const success = await handleCancel();
    if (success) {
      setToastMessage("The bump has been cancelled.");
      setToastOpen(true);
    } else if (cancelError) {
      setToastMessage(cancelError);
      setToastOpen(true);
    }
  };

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
      {message && (
        <div
          style={{
            background: "#fff3cd",
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
        type="sent"
      />

      <div className="shared-interest-title">
        <h4 className="name-row">You both like:</h4>
      </div>
      <div className="shared-interest-card">
        <InterestGallery
          interests={sharedInterests}
          showSharedInterestsMessage={true}
        />
      </div>

      <ActionButtons
        mode="bump"
        variant="sent"
        onClick={() => navigate(-1)}
        onSecondaryClick={onCancel}
      />

      <Toast
        open={toastOpen}
        message={toastMessage}
        duration={2200}
        onClose={() => {
          setToastOpen(false);
          navigate(-1);
        }}
        type="success"
      />
    </div>
  );
}
