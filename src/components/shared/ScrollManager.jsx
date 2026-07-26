import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Per-history-entry scroll memory. The browser's own popstate scroll
// restoration is unreliable here: routes are React.lazy-loaded, so
// popstate can fire before Suspense finishes mounting the real content,
// and the browser clamps to whatever (short) height the loading
// fallback has — it never retries once the real content grows in.
// We take manual control instead: record scrollY continuously per
// location.key, and on POP nudge scrollTo across a few frames until it
// holds, giving lazy content time to reach its full height.
const scrollPositions = new Map();

const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const key = location.key;
    const onScroll = () => scrollPositions.set(key, window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.key]);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (navigationType === "POP") {
      const target = scrollPositions.get(location.key) ?? 0;
      let attempts = 0;
      const tryRestore = () => {
        window.scrollTo(0, target);
        attempts += 1;
        if (attempts < 30 && Math.abs(window.scrollY - target) > 2) {
          rafRef.current = requestAnimationFrame(tryRestore);
        }
      };
      tryRestore();
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [location.key, navigationType]);

  return null;
};

export default ScrollManager;
