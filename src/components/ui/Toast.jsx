import { useEffect } from "react";
import "./Toast.css";

export default function Toast({
  open,
  message = "",
  duration = 2000,
  onClose,
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  return <div className="app-toast">{message}</div>;
}
