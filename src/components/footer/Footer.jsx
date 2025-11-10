import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";
import "../buttons/Buttons.css";
import bell from "../../assets/images/icons/Bell.svg";
import home from "../../assets/images/icons/Home.svg";
import user from "../../assets/images/icons/User.svg";

/**
 * Footer - bottom navigation bar
 */
export default function Footer() {
  return (
    <footer className="bottom-nav">
      <Link to="">
        <button className="button button--small" aria-label="Notifications">
          <img src={bell} alt="" className="icon" />
        </button>
      </Link>
      <Link to="/">
        <button className="button button--small" aria-label="Home">
          <img src={home} alt="" className="icon" />
        </button>
      </Link>
      <Link to="/user-profile">
        <button className="button button--small" aria-label="Profile">
          <img src={user} alt="" className="icon" />
        </button>
      </Link>
    </footer>
  );
}
