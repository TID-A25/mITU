// Footer component - bottom navigation bar with icon buttons
import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";
import "../buttons/Buttons.css";

// Import icons (outline and filled versions for active state)
import bell from "../../assets/images/icons/Bell.svg";
import bellFill from "../../assets/images/icons/Bell-Fill.svg";
import home from "../../assets/images/icons/Home.svg";
import homeFill from "../../assets/images/icons/Home-Fill.svg";
import user from "../../assets/images/icons/User.svg";
import userFill from "../../assets/images/icons/User-Fill.svg";

/**
 * Footer - bottom navigation bar
 * Tracks active page and shows filled icons for the current section
 */
export default function Footer() {
  // Track which navigation item is currently active
  const [active, setActive] = React.useState("home");
  return (
    <footer className="bottom-nav">
      {/* Notification button - page not yet implemented */}
        <Link
          to=""
          onClick={() => setActive("notifications")}
          className="button button--small"
          aria-label="Notifications"
        >
          {/* Show filled bell icon when notifications are active */}
          <img
            src={active === "notifications" ? bellFill : bell}
            alt=""
            className="icon"
          />
        </Link>


      {/* Home button - navigates to profiles feed */}
      <Link
        to="/"
        onClick={() => setActive("home")}
        className="button button--small"
        aria-label="Home"
      >
        {/* Show filled home icon when home is active */}
        <img
          src={active === "home" ? homeFill : home}
          alt=""
          className="icon"
        />
      </Link>

      {/* Profile button - navigates to user's own profile */}
      <Link
        to="/user-profile"
        onClick={() => setActive("profile")}
        className="button button--small"
        aria-label="Profile"
      >
        {/* Show filled user icon when profile is active */}
        <img
          src={active === "profile" ? userFill : user}
          alt=""
          className="icon"
        />
      </Link>
    </footer>
  );
}
