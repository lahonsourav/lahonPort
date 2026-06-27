import "./education.css";
import myLogo from "../../treeicons/one.png";
import micro from "../../treeicons/micro.png";
import simp from "../../treeicons/simp.png";
import css from "../../treeicons/csspng.png";
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

const Education = () => (
  <section id="education">
    <h5>where i&apos;ve been</h5>
    <h2>Experience</h2>

    <div className="edu__timeline">
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
            <img src={myLogo} alt="NIT Silchar" />
          </div>
        </div>
        <div />
      </div>
    </div>
  </section>
);

export default Education;
