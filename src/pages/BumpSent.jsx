import { useParams } from "react-router-dom";
import ActionButtons from "../components/buttons/ActionButtons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";
import InterestGallery from "../components/interestGallery/InterestGallery.jsx";
import "../App.css";
import "./Pages.css";
import useProfile from "../hooks/useProfile";
import Toast from "../components/ui/Toast.jsx";
import useCreateBump from "../hooks/useCreateBump";
import { CURRENT_USER_ID } from "../constants/currentUser"; 

export default function BumpSent() {
  const params = useParams();
  const otherUserId = params.otherUserId || params.userId;

  // Use hooks to fetch both profiles (current and the other user)
  const currentHook = useProfile(CURRENT_USER_ID);
  const otherHook = useProfile(otherUserId);

  const currentProfile = currentHook.profile;
  const otherProfile = otherHook.profile;
  const loading = currentHook.loading || otherHook.loading;
  const error = currentHook.error || otherHook.error;

  // Create bump automatically when both profiles are loaded
  const { result } = useCreateBump(
    currentProfile?.id,
    otherProfile?.id,
    currentProfile?.id
  );

  // Compute shared interests when both profiles available
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
      {result && result.created === false && (
        <div style={{ background: "#fff3cd", padding: "10px", borderRadius: 6, marginBottom: 12 }}>
          You have already sent a bump to this person
        </div>
      )}
      <BumpHeader
        currentUser={currentProfile}
        otherUser={otherProfile}
        leftImageSrc={currentProfile?.profilePicture || defaultAvatar}
        rightImageSrc={otherProfile?.profilePicture || defaultAvatar}
      />
        type="sent"

      <div className="name-row">
        <p>We'll let you know if they accept your request.</p>
      </div>

      <div className="shared-interest-title">
        <h4 className="name-row">You both like:</h4>
      </div>
      <div className="shared-interest-card">
        <InterestGallery interests={sharedInterests} />
      </div>

      <ActionButtons
        mode="bump"
        variant="sent"
        onClick={() => navigate(-1)}
        onSecondaryClick={() => {
          setToastMessage("Your bump has been cancelled.");
          setToastOpen(true);
        }}
      />

      <Toast
        open={toastOpen}
        message={toastMessage}
        duration={2200}
        onClose={() => {
          setToastOpen(false);
          navigate(-1);
        }}
      />
    </div>
  );
}
