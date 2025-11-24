import React from "react";
import { useNavigate } from "react-router-dom";
import "./Buttons.css";

export default function BumpButtons({ onClick, onSecondaryClick, variant = "sent" }) {
  const navigate = useNavigate();

  const labels =
    variant === "received" ? { big: "Accept!", small: "Decline" } : { big: "OK", small: "Cancel" };
    
  // default action: go back to home if no handler provided
  const navigateHome = () => navigate("/");
  const primaryHandler = onClick ? onClick : navigateHome;
  const secondaryHandler = onSecondaryClick ? onSecondaryClick : onClick ? onClick : navigateHome;

  return (
    <div className="bump-buttons">
      <div className="button-big">
        <button type="button" className="button button--big button--teal" onClick={primaryHandler}>
          {labels.big}
        </button>
      </div>

      <div className="bump-buttons-small">
        <button type="button" className="button button--small button--danger" onClick={secondaryHandler}>
          {labels.small}
        </button>
      </div>
    </div>
  );
}
