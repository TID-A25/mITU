import React from "react";
import "./BumpHeader.css";
/**
 * BumpHeader
 * Shows side-by-side profile pictures and a title indicating bump direction
 * Props:
 * - currentUser: object (your profile data)
 * - otherUser: object (other user's profile data)
 * - leftImageSrc: string (image URL for left profile picture)
 * - rightImageSrc: string (image URL for right profile picture)
 * - interest: string|array (shared interest - currently unused)
 * - type: 'sent'|'received' (controls whether to say "bumped into" or "You bumped")
 */
export default function BumpHeader({
  currentUser = {},
  otherUser = {},
  leftImageSrc,
  rightImageSrc,
  interest,
  type = "sent",
}) {
  // Generate accessible alt text from user names
  const leftAlt = currentUser.name || "You";
  const rightAlt = otherUser.name || "Someone";

  return (
    <div className="bump-header">
      {/* Side-by-side profile pictures */}
      <div className="bumping-pictures">
        <img src={leftImageSrc} alt={leftAlt} className="profile-img" />
        <img src={rightImageSrc} alt={rightAlt} className="profile-img" />
      </div>

      {/* Title text changes based on whether bump was sent or received */}
      <div className="bump-title">
        <h2 className="name-row">
          {type === "received"
            ? `${rightAlt} bumped into you!`
            : `You bumped into ${rightAlt}!`}
        </h2>
      </div>
    </div>
  );
}
