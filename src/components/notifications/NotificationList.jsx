import React from "react";
import NotificationItem from "./NotificationItem";
import "./Notifications.css";

export default function NotificationList({ items = [], onOpen, onRefresh }) {
  if (!items.length) {
    return (
      <div className="notifications-list">
        <div>
          <h1>Notifications</h1>
          {onRefresh && (
            <button onClick={onRefresh}>
              Refresh
            </button>
          )}
        </div>
        <p>No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="notifications-list">
      <div>
        <h1>Notifications</h1>
        {onRefresh && (
          <button onClick={onRefresh}>
            Refresh
          </button>
        )}
      </div>
      {items.map((n) => (
        <NotificationItem key={n.id} notification={n} onOpen={onOpen} />
      ))}
    </div>
  );
}
