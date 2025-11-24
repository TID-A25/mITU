// ActionButtons component - unified button API that delegates to specific button types
// Provides backward compatibility while using focused components internally
import React from "react";
import "./Buttons.css";

import BackButton from "./BackButton";
import SingleButton from "./SingleButton";
import BumpButtons from "./BumpButtons";

/**
 * Compatibility wrapper around focused button components.
 * Delegates rendering based on mode prop:
 * - "bump": paired buttons for bump actions
 * - "back": back navigation button
 * - "single" (default): configurable single button
 */

export default function ActionButtons({
  mode = "single",
  size = "big",
  color = "teal",
  label = "",
  onClick,
  variant = "sent",
}) {
  // Render bump buttons for bump confirmations
  if (mode === "bump") {
    return <BumpButtons onClick={onClick} variant={variant} />;
  }

  // Render back button for navigation
  if (mode === "back") {
    return <BackButton onClick={onClick} />;
  }

  // Default: render single configurable button
  return <SingleButton size={size} color={color} label={label} onClick={onClick} />;
}

// Export individual button components for direct use
export { BackButton, SingleButton, BumpButtons };
