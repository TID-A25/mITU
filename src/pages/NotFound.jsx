import { useNavigate } from "react-router-dom";
import "./Pages.css";

export default function NotFound() {
const navigate = useNavigate();

  return (
    <div className="page container stack">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, this page doesn't exist.</p>
      <button onClick={() => navigate("/")} className="button">
        Back to Atrium
      </button>
    </div>
  );
}
