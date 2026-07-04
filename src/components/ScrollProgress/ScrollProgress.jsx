import { useEffect, useRef } from "react";
import "./ScrollProgress.css";

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const progress = total > 0 ? el.scrollTop / total : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" ref={barRef} />;
};

export default ScrollProgress;
