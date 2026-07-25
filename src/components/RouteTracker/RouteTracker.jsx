import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackProjectVisit } from "../../lib/achievements";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackProjectVisit(location.pathname);
  }, [location.pathname]);

  return null;
};

export default RouteTracker;
