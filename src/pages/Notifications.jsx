import React from "react";
import NotificationList from "../components/notifications/NotificationList";
import "../components/notifications/Notifications.css";

import SineImg from "../assets/images/profiles/Athena.JPG";
import JakobImg from "../assets/images/profiles/Chad.jpg";
import CarolineImg from "../assets/images/profiles/Default_profile_pic.jpg";

{
  /* Mock notifications */
}
const MOCK = [
  { id: "1", type: "bump_sent", actor: { name: "Sine", avatar: SineImg } },
  {
    id: "2",
    type: "bump_accepted",
    actor: { name: "Jakob", avatar: JakobImg },
  },
  {
    id: "3",
    type: "bump_received",
    actor: { name: "Caroline", avatar: CarolineImg },
  },
  {
    id: "4",
    type: "accepted_by_you",
    actor: { name: "Someone", avatar: CarolineImg },
  },
];

export default function Notifications() {
  return (
    <div className="page container stack">
      <NotificationList items={MOCK} />
    </div>
  );
}
