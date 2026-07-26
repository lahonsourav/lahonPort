import { useNavigate, useLocation } from "react-router-dom";
import "./BackHome.css";

const BackHome = ({ className = "", to = "/", label = "← Back" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // location.key is "default" when this entry has no in-app history
    // behind it (direct link, new tab) — navigate(-1) would leave the
    // site entirely, so only fall back to `to` in that case. Otherwise
    // use real browser back so the referring page (and its scroll
    // position) is restored instead of landing on the top of `to`.
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate(to);
    }
  };

  return (
    <button
      type="button"
      className={`back-home ${className}`}
      onClick={handleBack}
    >
      {label}
    </button>
  );
};

export default BackHome;
