import React from "react";
import NotificationList from "../components/notifications/NotificationList";
import "../components/notifications/Notifications.css";
import "./Pages.css";
import useNotifications from "../hooks/useNotifications";
import { CURRENT_USER_ID } from "../constants/currentUser"; 

export default function Notifications() {
  const { notifications, loading, error, refresh } = useNotifications(CURRENT_USER_ID);

  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading..</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page container stack">
        <p className="error-message">Failed to load notifications: {error}</p>
      </div>
    );
  }

  return (
    <div className="page container stack">
      <NotificationList items={notifications} onRefresh={refresh} />
    </div>
  );
}
