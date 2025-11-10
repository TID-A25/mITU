import React from "react";
import "./Header.css";
import "../buttons/Button.css";

/**
 * Header - sticks to top of the page
 */
export default function Header() {
  return (
    <header className="app-header">
      <h1>mITU</h1>
      <nav>
        <button className="button button--text active">Profiles</button>
        <span>|</span>
        <button className="button button--text">Events</button>
      </nav>
    </header>
  );
}
