import { useNavigate } from "react-router-dom";
import "./NotificationItem.css";

export default function NotificationItem({ notification = {} }) {
  const navigate = useNavigate();
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
      message = `Your bump has been accepted. You can now see their WhatsApp, if they shared it`;
      break;
    case "accepted_by_current_user":
      message = `You accepted ${actorName}'s bump, now you can see their WhatsApp, if they shared it`;
      break;
    default:
      message = text || "Notification";
  }

  const handleClick = () => {
    // if someone sent you a bump, go to bump received page

    if (type === 'bump_received' && notification.otherUserId) {
      navigate(`/bump-received/${notification.otherUserId}`);
    } else if ((type === 'bump_accepted' || type === 'accepted_by_current_user') && notification.otherUserId) {
      // go to bump-accepted page for accepted bumps
      navigate(`/bump-accepted/${notification.otherUserId}`);
    }
  };

  return (
    <div 
      className="notification-item simple" 
      onClick={handleClick}
      style={{ cursor: type === 'bump_received' || type === 'bump_accepted' ? 'pointer' : 'default' }}
    >
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
