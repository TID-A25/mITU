import React from "react";
import "./BumpHeader.css";
import InterestGallery from "../interestGallery/InterestGallery.jsx";

/**
 * BumpHeader
 * Props:
 * - currentUser: object (your profile)
 * - otherUser: object (other profile)
 * - leftImageSrc: string (image URL for left profile)
 * - rightImageSrc: string (image URL for right profile)
 * - interest: string|array (shared interest passed to InterestCard)
 * - type: 'sent'|'received' (controls title copy)
 */
export default function BumpHeader({
  currentUser = {},
  otherUser = {},
  leftImageSrc,
  rightImageSrc,
  interest,
  type = "sent",
}) {
  const leftAlt = currentUser.name || "You";
  const rightAlt = otherUser.name || "Other";

  return (
    <div className="bump-header">
      <div className="bumping-pictures">
        <img src={leftImageSrc} alt={leftAlt} className="profile-img" />
        <img src={rightImageSrc} alt={rightAlt} className="profile-img" />
      </div>

      <div className="bump-title">
        <h2 className="name-row">
          {type === "received"
            ? `${otherUser.name} bumped into you!`
            : `You bumped into ${otherUser.name}!`}
        </h2>
      </div>
    </div>
  );
}
