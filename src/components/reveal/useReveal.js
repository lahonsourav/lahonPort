import { useEffect } from "react";
import "./reveal.css";

/**
 * Lightweight replacement for AOS. Keeps the existing `data-aos` /
 * `data-aos-delay` markup, but drives it with an IntersectionObserver —
 * positions are always live, so late-loading images can't desync triggers.
 * Elements reveal on enter and un-reveal on exit (reverse on scroll up).
 */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll("[data-aos]");

    els.forEach((el) => {
      const delay = el.getAttribute("data-aos-delay");
      if (delay) el.style.transitionDelay = `${delay}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("reveal-in", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

export default useReveal;
