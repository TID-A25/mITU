import React from "react";
import "./Buttons.css";

export default function ButtonBig({ label = "text", onClick }) {
  return (
    <button onClick={onClick} className="button button--big">
      {label}
    </button>
  );
}
