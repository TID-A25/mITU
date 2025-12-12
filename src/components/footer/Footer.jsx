import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const pathname = location.pathname || "/";

  // Footer looks at the current page to determine which icon to highlight
  let active = "";
  if (pathname.startsWith("/notifications")) active = "notifications";
  else if (pathname === "/") active = "home";
  else if (pathname === "/user-profile") active = "profile";
  // If is not the current users profile, do not highlight profile icon

  return (
    <footer className="bottom-nav">
      {/* Notification button */}

      <Link
        to="/notifications"
        className="button button--small"
        aria-label="Notifications"
      >
        <img
          src={active === "notifications" ? bellFill : bell}
          alt=""
          className="icon"
        />
      </Link>

      {/* Home button */}
      <Link to="/" className="button button--small" aria-label="Home">
        <img
          src={active === "home" ? homeFill : home}
          alt=""
          className="icon"
        />
      </Link>

      {/* Profile button */}
      <Link
        to="/user-profile"
        className="button button--small"
        aria-label="Profile"
      >
        <img
          src={active === "profile" ? userFill : user}
          alt=""
          className="icon"
        />
      </Link>
    </footer>
  );
}
