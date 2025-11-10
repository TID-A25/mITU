import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";
import "../buttons/Button.css";

/**
 * Footer - bottom navigation bar
 */
export default function Footer() {
  return (
    <footer className="bottom-nav">
      <Link to="">
        <button className="button button--round button--small">🔔</button>
      </Link>
      <Link to="/">
        <button className="button button--round button--small">🏠</button>
      </Link>
      <Link to="/user-profile">
        <button className="button button--round button--small">👤</button>
      </Link>
    </footer>
  );
}
