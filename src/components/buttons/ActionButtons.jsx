import React from "react";
import "./Buttons.css";

import BackButton from "./BackButton";
import SingleButton from "./SingleButton";
import BumpButtons from "./BumpButtons";

/**
 * Compatibility wrapper around focused button components.
 * Keeps the original `Buttons` API but delegates rendering.
 */
export default function ActionButtons({
  mode = "single",
  size = "big",
  color = "teal",
  label = "",
  onClick,
  variant = "sent",
}) {
  if (mode === "bump") {
    return <BumpButtons onClick={onClick} variant={variant} />;
  }

  if (mode === "back") {
    return <BackButton onClick={onClick} />;
  }

  return <SingleButton size={size} color={color} label={label} onClick={onClick} />;
}

export { BackButton, SingleButton, BumpButtons };
