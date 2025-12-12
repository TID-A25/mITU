import NotificationItem from "./NotificationItem";
import "./Notifications.css";
import refreshIcon from "../../assets/images/icons/Refresh.svg";

export default function NotificationList({ items = [], onOpen, onRefresh }) {
  return (
    <div className="notifications-list">
      <div className="notifications-page-header">
        <h1>Notifications</h1>
        {onRefresh && (
          <img
            src={refreshIcon}
            className="refresh-icon"
            alt="Refresh"
            onClick={onRefresh}
          />
        )}
      </div>

      {/* Conditional rendering.
      If there are notifications, they get displayed, otherwise message displayed */}
      {items.length > 0 ? (
        items.map((n) => (
          <NotificationItem key={n.id} notification={n} onOpen={onOpen} />
        ))
      ) : (
        <p>No notifications yet</p>
      )}
    </div>
  );
}
