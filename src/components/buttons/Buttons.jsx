import React from "react";
import "./Buttons.css";

/**
 * Unified Buttons component.
 * Props:
 * - mode: 'single' | 'bump' | 'back' (default 'single')
 * - size: 'big' | 'small' (for single)
 * - color: 'teal' | 'danger' | 'gray' (for single)
 * - label: string (for single)
 * - variant: 'sent' | 'received' (for bump)
 */
export default function Buttons({
  mode = "single",
  size = "big",
  color = "teal",
  label = "",
  onClick,
  variant = "sent",
}) {
  if (mode === "bump") {
    const labels =
      variant === "received"
        ? { big: "Accept!", small: "Decline" }
        : { big: "OK", small: "Cancel" };
    return (
      <div className="bump-buttons">
        <div className="button-big">
          <button
            type="button"
            className="button button--big button--teal"
            onClick={onClick}
          >
            {labels.big}
          </button>
        </div>

        <div className="bump-buttons-small">
          <button
            type="button"
            className="button button--small button--danger"
            onClick={onClick}
          >
            {labels.small}
          </button>
        </div>
      </div>
    );
  }

  if (mode === "back") {
    return (
      <button
        onClick={onClick}
        className="button button--small button--gray"
        aria-label="Back"
      >
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

  const sizeClass = size === "small" ? "button--small" : "button--big";
  const colorClass =
    color === "danger"
      ? "button--danger"
      : color === "gray"
      ? "button--gray"
      : "button--teal";
  return (
    <button onClick={onClick} className={`button ${sizeClass} ${colorClass}`}>
      {label}
    </button>
  );
}
