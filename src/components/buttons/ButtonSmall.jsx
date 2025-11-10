import React from "react";
import "./Buttons.css";

export default function ButtonSmall({ label = "text", onClick }) {
  return (
    <button onClick={onClick} className="button button--small button--teal">
      {label}
    </button>
  );
}
