import { useEffect, useRef } from "react";
import "./education.css";
import micro from "../../treeicons/micro.png";
import blackrock from "../../treeicons/blackrock.png";

const entries = [
  {
    side: "left",
    icon: blackrock,
    iconAlt: "BlackRock",
    date: "Jul 2025 – Present",
    title: "Software Engineer",
    subtitle: "BlackRock",
    desc: "Building data transformation tools (Perl, Python, SQL), real-time ingestion pipelines (C#, .NET, Kafka), and automating index creation — cutting build time from 30 min to 5 min.",
  },
  {
    side: "right",
    icon: blackrock,
    iconAlt: "BlackRock",
    date: "Jan 2025 – Jun 2025",
    title: "Data Analyst Intern",
    subtitle: "BlackRock",
    desc: "Built end-to-end automation in Python, Pandas, Unix & Streamlit — reducing deployment time by 90%. Automated QC reporting across market indexes, cutting manual effort by 80%.",
  },
  {
    side: "left",
    icon: micro,
    iconAlt: "Microsoft",
    date: "May 2024 – Jul 2024",
    title: "Software Engineer Intern",
    subtitle: "Microsoft",
    desc: "Built a debug tool for the MSAI-UX team — Response Debugger, Accessibility Debugger, and Performance Analyzer — reducing triage time by 30% and boosting performance by 50%.",
  },
];

const Education = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    // Cache entry midpoints — re-measuring offsetTop/offsetHeight on every
    // scroll event forces layout and makes scrolling stutter.
    let entryData = [];
    const measure = () => {
      entryData = Array.from(timeline.querySelectorAll(".edu__entry")).map((el) => ({
        el,
        mid: ((el.offsetTop + el.offsetHeight / 2) / timeline.offsetHeight) * 100,
      }));
    };
    measure();

    let ticking = false;
    let lastPercent = -1;

    const update = () => {
      ticking = false;
      const rect = timeline.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Start only when the vine's stem tip arrives (it tracks 60% of the
      // viewport height), so the timeline continues the same line seamlessly
      const scrolled = viewH * 0.6 - rect.top;
      const total = rect.height + viewH * 0.1;
      const percent = Math.max(0, Math.min(100, (scrolled / total) * 100));
      if (Math.abs(percent - lastPercent) < 0.05) return;
      lastPercent = percent;

      timeline.style.setProperty("--line-scale", percent / 100);

      entryData.forEach(({ el, mid }) => {
        el.classList.toggle("edu__entry--visible", percent >= mid);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const ro = new ResizeObserver(() => {
      measure();
      lastPercent = -1;
      update();
    });
    ro.observe(timeline);

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <section id="experience">
      <div className="edu__timeline" ref={timelineRef}>
        {entries.map((e, i) => (
          <div key={i} className={`edu__entry edu__entry--${e.side}`}>
            {e.side === "left" ? (
              <>
                <div className="edu__card">
                  <h3>{e.title}</h3>
                  <h4>{e.subtitle}</h4>
                  <p>{e.desc}</p>
                </div>
                <div className="edu__center">
                  <div className="edu__icon-wrap">
                    <svg className="edu__ring" viewBox="0 0 54 54" aria-hidden="true">
                      <circle cx="27" cy="27" r="25" />
                    </svg>
                    <img src={e.icon} alt={e.iconAlt} />
                  </div>
                </div>
                <div className="edu__date">{e.date}</div>
              </>
            ) : (
              <>
                <div className="edu__date edu__date--r">{e.date}</div>
                <div className="edu__center">
                  <div className="edu__icon-wrap">
                    <svg className="edu__ring" viewBox="0 0 54 54" aria-hidden="true">
                      <circle cx="27" cy="27" r="25" />
                    </svg>
                    <img src={e.icon} alt={e.iconAlt} />
                  </div>
                </div>
                <div className="edu__card">
                  <h3>{e.title}</h3>
                  <h4>{e.subtitle}</h4>
                  <p>{e.desc}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
