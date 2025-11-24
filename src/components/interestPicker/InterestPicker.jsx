import React from "react";
import "./InterestPicker.css";

export default function InterestPicker({ items = [], selected = [], onToggle }) {
  return (
    <div className="interest-picker">
      {items.map(({ name, img }) => {
        const isSelected = selected.includes(name);
        return (
          <button
            type="button"
            key={name}
            className={`interest-card ${isSelected ? "selected" : ""}`}
            onClick={() => onToggle(name)}
            onKeyDown={(e) => e.key === "Enter" && onToggle(name)}
            aria-pressed={isSelected}
          >
            <img src={img} alt={name} />
            <div className="interest-name">{name}</div>
          </button>
        );
      })}
    </div>
  );
}
