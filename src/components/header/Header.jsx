// Header component - top navigation bar that sticks to the top of the page
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../buttons/Buttons.css";

/**
 * Header - sticks to top of the page
 * Contains app branding and main navigation
 */
export default function Header() {
  return (
    <header className="app-header">
      {/* App title/logo */}
      <h1>mITU</h1>
      {/* Was used for navigation between profiles and events */}
      <nav>
        <Link to="/" className="button button--text active">
          Profiles
        </Link>
      </nav>
    </header>
  );
}
