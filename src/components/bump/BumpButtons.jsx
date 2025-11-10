import React from "react";
import "./BumpButtons.css";

// Buttons component
// Props: 'sent' | 'received' (controls the labels)

export default function BumpButtons({ variant = "sent" }) {
  const labels =
    variant === "received"
      ? { big: "Accept!", small: "Decline" }
      : { big: "OK", small: "Cancel" };

  return (
    <div className="buttons bump-buttons">
      <div className="button-big">
        <button type="button" className="button button--big button--teal">
          {labels.big}
        </button>
      </div>

      <div className="bump-buttons-small">
        <button type="button" className="button button--small button--danger">
          {labels.small}
        </button>
      </div>
    </div>
  );
}