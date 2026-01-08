import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProfileHeader from "../components/profileHeader/ProfileHeader";
import ProfileInfo from "../components/profileInfo/ProfileInfo";
import InterestGallery from "../components/interestGallery/InterestGallery";
import UserSwitcher from "../components/userSwitcher/UserSwitcher";
import "./Pages.css";
import useProfile from "../hooks/useProfile";
import useBumpStatus from "../hooks/useBumpStatus";

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  //managing which user is selected in userswitcher
  const { currentDemoUser, handleUserChange, CURRENT_USER_ID } =
    useProfile(null);
  const isOwnProfile =
    location.pathname === "/user-profile" || userId === currentDemoUser;
  const targetUserId =
    location.pathname === "/user-profile" ? currentDemoUser : userId;

    //fetch profile data for viewing the user profile page
  const { profile, loading, error } = useProfile(targetUserId);

  // Check bump status when viewing another user's profile
  const { bumpStatus, loading: checkingBump } = useBumpStatus(
    isOwnProfile ? null : CURRENT_USER_ID,
    isOwnProfile ? null : targetUserId
  );

  /* We load the userswitcher in each state so it is still visible to user */
  if (loading) {
    return (
      <div className="page container stack">
        {location.pathname === "/user-profile" && (
          <UserSwitcher onUserChange={handleUserChange} />
        )}
        <div className="loading-container">
          <p className="loading-message">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page container stack">
        {location.pathname === "/user-profile" && (
          <UserSwitcher onUserChange={handleUserChange} />
        )}
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page container stack">
        {location.pathname === "/user-profile" && (
          <UserSwitcher onUserChange={handleUserChange} />
        )}
        <p className="error-message">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="page container stack">
      {location.pathname === "/user-profile" && (
        //pass handleuserchange to userswitcher so tjat when user changes, it updates the state in useprofile
        <UserSwitcher onUserChange={handleUserChange} />
      )}

      <ProfileHeader
        profilePicture={profile.profilePicture}
        isOwnProfile={isOwnProfile}
      />
      <ProfileInfo
        profile={profile}
        isOwnProfile={isOwnProfile}
        bumpStatus={bumpStatus}
        checkingBump={checkingBump}
        onBump={() => navigate(`/bump-sent/${profile.objectId || profile.id}`)}
      />
      <div className="padding-lg">
        <h2>Interests</h2>
        <InterestGallery interests={profile.interests} />
      </div>
    </div>
  );
}
