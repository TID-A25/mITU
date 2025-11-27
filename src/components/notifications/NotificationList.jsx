import React from "react";
import NotificationItem from "./NotificationItem";
import "./Notifications.css";
import refreshIcon from "../../assets/images/icons/Refresh.svg";

export default function NotificationList({ items = [], onOpen, onRefresh }) {
  if (!items.length) {
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
        <p>No notifications yet</p>
      </div>
    );
  }

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
      {items.map((n) => (
        <NotificationItem key={n.id} notification={n} onOpen={onOpen} />
      ))}
    </div>
  );
}
