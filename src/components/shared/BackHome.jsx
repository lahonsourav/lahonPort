import { useNavigate } from "react-router-dom";
import { playClick } from "../../lib/sound";
import "./BackHome.css";

const BackHome = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={`back-home ${className}`}
      onClick={() => {
        playClick();
        navigate("/");
      }}
    >
      ← Back
    </button>
  );
};

export default BackHome;
