import React from "react";
import { useNavigate } from "react-router-dom";
import "./Buttons.css";

export default function BumpButtons({
  onClick,
  onSecondaryClick,
  variant = "sent",
}) {
  const navigate = useNavigate();

  // Define labels based on bump state
  const getLabels = () => {
    switch (variant) {
      case "received":
        return { big: "Accept Bump", small: "Decline" };
      case "accepted":
        return { big: "View Contact", small: "Back to Home" };
      case "sent":
      default:
        return { big: "Back to Home", small: "View Profile" };
    }
  };

  const labels = getLabels();
    
  // default action: go back to home if no handler provided
  const navigateHome = () => navigate("/");
  const primaryHandler = onClick ? onClick : navigateHome;
  const secondaryHandler = onSecondaryClick
    ? onSecondaryClick
    : onClick
    ? onClick
    : navigateHome;

  return (
    <div className="bump-buttons">
      <div className="button-big">
        <button
          type="button"
          className="button button--big button--teal"
          onClick={primaryHandler}
        >
          {labels.big}
        </button>
      </div>

      <div className="name-row">
        <p>Want to take back your bump?</p>
      </div>

      <div className="bump-buttons-small">
        <button
          type="button"
          className="button button--small button--danger"
          onClick={secondaryHandler}
        >
          {labels.small}
        </button>
      </div>
    </div>
  );
}
