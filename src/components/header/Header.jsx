import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../buttons/Buttons.css";

/**
 * Header - sticks to top of the page
 */
export default function Header() {
  return (
    <header className="app-header">
      <h1>mITU</h1>
      <nav>
        <Link to="/" className="button button--text active">
          Profiles
        </Link>
      </nav>
    </header>
  );
}
