import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";
import "../buttons/Buttons.css";
import bell from "../../assets/images/icons/Bell.svg";
import bellFill from "../../assets/images/icons/Bell-Fill.svg";
import home from "../../assets/images/icons/Home.svg";
import homeFill from "../../assets/images/icons/Home-Fill.svg";
import user from "../../assets/images/icons/User.svg";
import userFill from "../../assets/images/icons/User-Fill.svg";

/**
 * Footer - bottom navigation bar
 */
export default function Footer() {
  const [active, setActive] = React.useState("home");
  return (
    <footer className="bottom-nav">
      {/* Notification button commented out */}

      {/*<Link to="" onClick={() => setActive("notifications")}>
        <button className="button button--small" aria-label="Notifications">
          <img
            src={active === "notifications" ? bellFill : bell}
            alt=""
            className="icon"
          />
        </button>
      </Link> */}

      {/* Home button */}
      <Link to="/" onClick={() => setActive("home")}>
        <button className="button button--small" aria-label="Home">
          <img
            src={active === "home" ? homeFill : home}
            alt=""
            className="icon"
          />
        </button>

        {/* Profile button */}
      </Link>
      <Link to="/user-profile" onClick={() => setActive("profile")}>
        <button className="button button--small" aria-label="Profile">
          <img
            src={active === "profile" ? userFill : user}
            alt=""
            className="icon"
          />
        </button>
      </Link>
    </footer>
  );
}
