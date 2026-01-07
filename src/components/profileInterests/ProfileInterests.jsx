import InterestGallery from "../interestGallery/InterestGallery.jsx";
import "./ProfileInterests.css";

// This file is not being imported anywhere else in the codebase.
export default function ProfileInterests({ interests }) {
  return (
    <div className="interests-row margin-top-md">
      <h3>Interests</h3>
      <InterestGallery interests={interests} />
    </div>
  );
}
