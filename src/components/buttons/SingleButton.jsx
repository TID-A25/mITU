import React from "react";
import "./Buttons.css";

export default function SingleButton({ size = "big", color = "teal", label = "", onClick }) {
  const sizeClass = size === "small" ? "button--small" : "button--big";
  const colorClass =
    color === "danger" ? "button--danger" : color === "gray" ? "button--gray" : "button--teal";

  return (
    <button onClick={onClick} className={`button ${sizeClass} ${colorClass}`}>
      {label}
    </button>
  );
}
