import React from "react";
import "./Header.css";

/**
 * Header - sticks to top of the page
 */
export default function Header() {
  return (
    <header className="app-header">
      <h1>mITU</h1>
      <nav>
        <button className="active">Profiles</button>
        <span>|</span>
        <button>Events</button>
      </nav>
    </header>
  );
}