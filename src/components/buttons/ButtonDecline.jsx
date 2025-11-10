import React from "react";
import "./Buttons.css";

export default function ButtonDecline({ label = "text", onClick }) {
  return (
    <button onClick={onClick} className="button button--small button--danger">
      {label}
    </button>
  );
}
