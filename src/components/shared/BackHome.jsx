import { useNavigate } from "react-router-dom";
import "./BackHome.css";

const BackHome = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={`back-home ${className}`}
      onClick={() => navigate("/")}
    >
      ← Back
    </button>
  );
};

export default BackHome;
