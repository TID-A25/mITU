import "./Buttons.css";
import BackButton from "./BackButton";
import SingleButton from "./SingleButton";
import BumpButtons from "./BumpButtons";

// ActionButtons: pick which focused button to render based on `mode`

export default function ActionButtons(props) {
  // reads `mode` from props, all other props are passed through
  const { mode = "single" } = props;

  // if mode is "bump", render the two-button bump UI
  if (mode === "bump") {
    return <BumpButtons {...props} />;
  }

  // if mode is "back", render the small back button
  if (mode === "back") {
    return <BackButton {...props} />;
  }

  // otherwise render a single main button (size/color/label come from props)
  return <SingleButton {...props} />;
}

// export the focused button components for direct use
export { BackButton, SingleButton, BumpButtons };
