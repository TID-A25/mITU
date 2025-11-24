import React from "react";
import NotificationItem from "./NotificationItem";
import "./Notifications.css";

export default function NotificationList({ items = [], onOpen }) {
  if (!items.length) return <p>No notifications</p>;

  return (
    <div className="notifications-list">
      <h1>Notifications</h1>
      {items.map((n) => (
        <NotificationItem key={n.id} notification={n} onOpen={onOpen} />
      ))}
    </div>
  );
}
