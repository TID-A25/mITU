import React from "react";
import "./Button.css";

export default function ButtonBack({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="button button--small button--gray"
      aria-label="Back"
    >
      {/* Arrow pointing left */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        style={{ width: "22px", height: "22px" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
}
