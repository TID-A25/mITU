// asset paths: this file lives at src/components/profile, so go up two levels to src/
import verifiedBadge from "../../assets/images/icons/Verified.svg";
import globe from "../../assets/images/icons/Globe.svg";
import phoneIcon from "../../assets/images/icons/Phone.svg";
import hat from "../../assets/images/icons/Graduation_hat.svg";
import ActionButtons from "../buttons/ActionButtons.jsx";
import "./ProfileInfo.css";

export default function ProfileInfo({
  profile,
  isOwnProfile = false,
  bumpStatus = null,
  checkingBump = false,
  onBump = () => {},
}) {
  const phoneVisibility = profile.phoneVisibility || profile.phone_visibility || "bumps";
  const canShowPhone =
    isOwnProfile ||
    phoneVisibility === "all" ||
    (phoneVisibility === "bumps" && bumpStatus?.exists && bumpStatus.status === "accepted");
  const phoneLabel = canShowPhone
    ? profile.phone || "Not specified"
    : phoneVisibility === "none"
    ? "Hidden"
    : "Visible to bumps only";

  // Determine what to show for bump interaction
  const getBumpContent = () => {
    if (checkingBump) {
      return <span className="bump-status-text">Checking...</span>;
    }
    
    if (bumpStatus?.exists) {
      if (bumpStatus.status === "pending") {
        if (bumpStatus.requestedByCurrentUser) {
          return <span className="bump-status-text">⏳ Waiting for response</span>;
        } else {
          return <span className="bump-status-text">🔔 Waiting for you to respond</span>;
        }
      } else if (bumpStatus.status === "accepted") {
        return <span className="bump-status-text"> Bumped </span>;
      }
    }
    
    return (
      <ActionButtons
        mode="single"
        size="small"
        color="teal"
        label="Bump"
        onClick={onBump}
      />
    );
  };

  return (
    <div className="user-profile-info">
      <div className="name-row">
        <h3>{profile.name}</h3>
        <img src={verifiedBadge} className="badge" alt="Verified badge" />
        {!isOwnProfile && getBumpContent()}
      </div>

      <div className="info-row">
        <img src={hat} className="hat" alt="Graduation hat" />
        <p>
          {profile.degree}, {profile.semester}
        </p>
      </div>

      <div className="info-row">
        <img src={globe} className="globe" alt="Globus" />
        <p>{profile.country}</p>
      </div>

      {canShowPhone && (
        <div className="info-row">
          <img src={phoneIcon} className="phone" alt="Phone" />
          <p className="phone-label">WhatsApp: {phoneLabel}</p>
        </div>
      )}

      {/* small helper to make sure every profile shows a deterministic DK number when there's no phone in the data */}
    </div>
  );
}
