import { useParams, useNavigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import useBumpStatus from "../hooks/useBumpStatus";
import ActionButtons from "../components/buttons/ActionButtons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";
import InterestGallery from "../components/interestGallery/InterestGallery.jsx";
import { CURRENT_USER_ID } from "../constants/currentUser";
import "../App.css";
import "./Pages.css";

export default function BumpAccepted() {
  const params = useParams();
  const navigate = useNavigate();
  const otherUserId = params.otherUserId || params.userId;

  const currentHook = useProfile(CURRENT_USER_ID);
  const otherHook = useProfile(otherUserId);

  const currentProfile = currentHook.profile;
  const otherProfile = otherHook.profile;
  const loading = currentHook.loading || otherHook.loading;
  const error = currentHook.error || otherHook.error;

  const { bumpStatus, loading: statusLoading } = useBumpStatus(
    CURRENT_USER_ID,
    otherUserId
  );

  const sharedInterests = (currentProfile?.interests || []).filter((i) =>
    (otherProfile?.interests || []).includes(i)
  );

  if (loading || statusLoading) {
    return (
      <div className="page container stack">
        <p>Loading...</p>
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

  // Verify bump is accepted
  if (!bumpStatus?.exists || bumpStatus.status !== "accepted") {
    return (
      <div className="page container stack">
        <p>This bump hasn't been accepted yet.</p>
        <button onClick={() => navigate("/notifications")} className="button">
          Back to Notifications
        </button>
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
        type="accepted"
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
        variant="accepted"
        onClick={() => navigate(`/user/${otherUserId}`)}
        onSecondaryClick={() => navigate("/")}
      />
    </div>
  );
}
