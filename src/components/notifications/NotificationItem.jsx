import React from "react";
import "./NotificationItem.css";

export default function NotificationItem({ notification = {} }) {
  const { actor = {}, type, text } = notification;

  const actorName = actor.name || "Someone";

  let message = text || "";

  switch (type) {
    case "bump_sent":
      message = `You sent a bump to ${actorName} and are waiting for their response`;
      break;
    case "bump_received":
      message = `${actorName} has sent you a bump`;
      break;
    case "bump_accepted":
      message = `Your bump has been accepted. You can now see their Whatsapp`;
      break;
    case "accepted_by_you":
      message = `You accepted ${actorName}'s bump, now you can see their whatsapp`;
      break;
    default:
      message = text || "Notification";
  }

  return (
    <div className="notification-item simple">
      <div className="notification-avatar">
        {actor.avatar ? (
          <img src={actor.avatar} alt={actorName} />
        ) : (
          <div className="avatar-placeholder">{actorName.charAt(0)}</div>
        )}
      </div>
      <div className="notification-body">
        <div className="notification-title">{message}</div>
      </div>
    </div>
  );
}
