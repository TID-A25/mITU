import React from "react";
import { Link } from "react-router-dom";
import "./BumpHeader.css";
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
  const rightAlt = otherUser.name || "Someone";

  return (
    <div className="bump-header">
      <div className="bumping-pictures">
        <img src={leftImageSrc} alt={leftAlt} className="profile-img" />
        {otherUser ? (
          // Link to the other user's profile when we have an id, otherwise fallback to generic profile route
          (() => {
            const profileId = otherUser.objectId || otherUser.id;
            const to = profileId ? `/user/${profileId}` : "/user-profile";
            return (
              <Link to={to} className="profile-link">
                <img
                  src={rightImageSrc}
                  alt={rightAlt}
                  className="profile-img"
                />
              </Link>
            );
          })()
        ) : (
          <img src={rightImageSrc} alt={rightAlt} className="profile-img" />
        )}
      </div>

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
