// BumpButtons component - paired buttons for bump confirmation/actions
// Shows different labels based on variant ("sent" or "received")
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Buttons.css";

export default function BumpButtons({ onClick, onSecondaryClick, variant = "sent" }) {
  const navigate = useNavigate();

  // Set button labels based on bump type
  const labels =
    variant === "received" ? { big: "Accept!", small: "Decline" } : { big: "OK", small: "Cancel" };
    
  // Default action: navigate home if no handler provided
  const navigateHome = () => navigate("/");
  // Primary button handler (big button)
  const primaryHandler = onClick ? onClick : navigateHome;
  // Secondary button handler (small button) - falls back to onClick, then navigateHome
  const secondaryHandler = onSecondaryClick ? onSecondaryClick : onClick ? onClick : navigateHome;

  return (
    <div className="bump-buttons">
      {/* Primary action button */}
      <div className="button-big">
        <button type="button" className="button button--big button--teal" onClick={primaryHandler}>
          {labels.big}
        </button>
      </div>

      {/* Secondary action button */}
      <div className="bump-buttons-small">
        <button type="button" className="button button--small button--danger" onClick={secondaryHandler}>
          {labels.small}
        </button>
      </div>
    </div>
  );
}
