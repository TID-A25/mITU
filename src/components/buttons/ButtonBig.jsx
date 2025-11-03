import React from "react";
import "./Button.css";

export default function ButtonBig({ label = "text", onClick }) {
  return (
    <button onClick={onClick} className="button button--round button--big button--teal">
      {label}
    </button>
  );
}
