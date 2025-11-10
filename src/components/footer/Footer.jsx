import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";

/**
 * Footer - bottom navigation bar
 */
export default function Footer() {
  return (
    <footer className="bottom-nav">
      <Link to="">
        <button>🔔</button>
      </Link>
      <Link to="/">
        <button>🏠</button>
      </Link>
      <Link to="/user-profile">
        <button>👤</button>
      </Link>
    </footer>
  );
}
