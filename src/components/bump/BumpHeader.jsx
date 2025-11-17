import React from "react";
import "./BumpHeader.css";
import InterestGallery from "../interestGallery/InterestGallery.jsx";

/**
 * BumpHeader
 * Props:
 * - you: object (your profile)
 * - other: object (other profile)
 * - leftImageSrc: string (image URL for left profile)
 * - rightImageSrc: string (image URL for right profile)
 * - interest: string|array (shared interest passed to InterestCard)
 * - type: 'sent'|'received' (controls title copy)
 */
export default function BumpHeader({
  you = {},
  other = {},
  leftImageSrc,
  rightImageSrc,
  interest,
  type = "sent",
}) {
  const leftAlt = you.name || "You";
  const rightAlt = other.name || "Other";

  return (
    <div className="bump-header">
      <div className="bumping-pictures">
        <img src={leftImageSrc} alt={leftAlt} className="profile-img" />
        <img src={rightImageSrc} alt={rightAlt} className="profile-img" />
      </div>

      <div className="bump-title">
        <h2 className="name-row">
          {type === "received"
            ? `${other.name} bumped into you!`
            : `You bumped into ${other.name}!`}
        </h2>
      </div>
    </div>
  );
}
