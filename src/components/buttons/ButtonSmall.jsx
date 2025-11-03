import React from "react";
import "./Button.css";

export default function ButtonSmall({ label = "text", onClick }) {
  return (
    <button onClick={onClick} className="button button--round button--small button--teal">
      {label}
    </button>
  );
}
