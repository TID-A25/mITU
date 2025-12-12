import ProfileGallery from "../profileGallery/ProfileGallery";
import "./ProfileSection.css";

//Profile Feed
/**
 * ProfileSection Component
 * Renders a title and a horizontal row of profiles
 */
export default function ProfileSection({ title, profiles, isCommonInterest = false }) {
  return (
    <section className="profile-section">
      <h2>
        {isCommonInterest ? "People who also like" : "People who like"} <span className="interest-title">{title}</span>
      </h2>
      <ProfileGallery profiles={profiles} />
    </section>
  );
}
