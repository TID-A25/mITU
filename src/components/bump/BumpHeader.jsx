import React from "react";
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

  // Generate title and subtitle based on bump type
  const getHeaderContent = () => {
    switch (type) {
      case "received":
        return {
          title: `${rightAlt} wants to bump with you!`,
          subtitle: "Accept to share contact details"
        };
      case "accepted":
        return {
          title: `You and ${rightAlt} bumped!`,
          subtitle: "You can now see each other's contact details"
        };
      case "sent":
      default:
        return {
          title: `Bump request sent to ${rightAlt}!`,
          subtitle: "Waiting for them to accept"
        };
    }
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <div className="bump-header">
      <div className="bumping-pictures">
        <img src={leftImageSrc} alt={leftAlt} className="profile-img" />
        <img src={rightImageSrc} alt={rightAlt} className="profile-img" />
      </div>

      <div className="bump-title">
        <h2 className="name-row">{title}</h2>
        <p className="bump-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
