import { useNavigate } from "react-router-dom";
import "./floodBanner.css";

const FloodBanner = () => {
  const navigate = useNavigate();

  const go = () => navigate("/assam-flood");

  return (
    <div
      className="flood_banner"
      onClick={go}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && go()}
    >
      <span className="flood_banner_text">
        🌊 Assam is flooded — donate anything and I'll <strong>double it</strong>, till 25th July midnight.
      </span>
      <span className="flood_banner_cta">Donate now →</span>
    </div>
  );
};

export default FloodBanner;
