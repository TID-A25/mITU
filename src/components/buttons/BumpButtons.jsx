import { useNavigate } from "react-router-dom";
import "./Buttons.css";

export default function BumpButtons({
  onClick,
  onSecondaryClick,
  variant = "sent",
}) {
  const navigate = useNavigate();

  // Define labels and text based on bump state
  const getLabels = () => {
    switch (variant) {
      case "received":
        return { 
          big: "Accept Bump", 
          small: "Decline",
          text: "Not interested?"
        };
      case "accepted":
        return { 
          big: "View Contact", 
          small: "Back",
          text: "Or go back.."
        };
      case "sent":
      default:
        return { 
          big: "Back to Home", 
          small: "Cancel",
          text: "Want to take back your bump?"
        };
    }
  };

  const labels = getLabels();

  // primaryHandler uses `onClick` if provided, otherwise navigates home
  // secondaryHandler uses `onSecondaryClick` if provided, otherwise navigates home
  const navigateHome = () => navigate("/");
  const primaryHandler = onClick ? onClick : navigateHome;
  const secondaryHandler = onSecondaryClick ? onSecondaryClick : navigateHome;

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
        <p>{labels.text}</p>
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
