import { useEffect, useRef } from "react";
import "./education.css";
import myLogo from "../../treeicons/one.png";
import micro from "../../treeicons/micro.png";
import simp from "../../treeicons/simp.png";
import css from "../../treeicons/csspng.png";
import blackrock from "../../treeicons/blackrock.png";
import Aos from "aos";
import "aos/dist/aos.css";

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
  {
    side: "right",
    icon: simp,
    iconAlt: "Symphonits",
    date: "2023 – 2024",
    title: "Head",
    subtitle: "Symphonits, Music Club — NIT Silchar",
    desc: "Led the music club, arranged college-wide events and activities.",
  },
  {
    side: "left",
    icon: css,
    iconAlt: "CS Society",
    date: "2023 – 2024",
    title: "Design Wing Head",
    subtitle: "Computer Science Society — NIT Silchar",
    desc: "Led the design wing, driving the digital presence of the CS Society.",
  },
];

const Education = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    Aos.init({ duration: 700, easing: "ease-out-cubic", once: false });
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const onScroll = () => {
      const rect = timeline.getBoundingClientRect();
      const viewH = window.innerHeight;
      const scrolled = viewH - rect.top;
      const total = rect.height + viewH / 2;
      const percent = Math.max(0, Math.min(100, (scrolled / total) * 100));
      timeline.style.setProperty("--line-progress", `${percent}%`);

      // Reveal/hide each entry based on whether the line has passed its midpoint
      timeline.querySelectorAll(".edu__entry").forEach((entry) => {
        const entryMidPercent =
          ((entry.offsetTop + entry.offsetHeight / 2) / timeline.offsetHeight) * 100;
        if (percent >= entryMidPercent) {
          entry.classList.add("edu__entry--visible");
        } else {
          entry.classList.remove("edu__entry--visible");
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience">
      <h5 data-aos="fade-down">where i&apos;ve been</h5>
      <h2 data-aos="fade-down" data-aos-delay="100">Experience</h2>

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

        <div className="edu__entry edu__entry--end">
          <div />
          <div className="edu__center">
            <div className="edu__icon-wrap">
              <svg className="edu__ring" viewBox="0 0 54 54" aria-hidden="true">
                <circle cx="27" cy="27" r="25" />
              </svg>
              <img src={myLogo} alt="NIT Silchar" />
            </div>
          </div>
          <div />
        </div>
      </div>
    </section>
  );
};

export default Education;
