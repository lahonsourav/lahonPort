import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import myLogo from "../../treeicons/one.png";
import micro from "../../treeicons/micro.png";
import simp from "../../treeicons/simp.png";
import css from "../../treeicons/csspng.png";

const Education = () => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#4db5ff", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #4db5ff" }}
        date="2023-2024"
        iconStyle={{ background: "#080707", color: "#fff" }}
        icon={<img src={simp} alt="myLogo" />}
      >
        <h3 className="vertical-timeline-element-title">Moderator</h3>
        <h4 className="vertical-timeline-element-subtitle">
          Symphonits, Music Club NIT Silchar
        </h4>
        <p>
          As a moderator, worked for the club, arranged various activities in
          the College, managed events
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#eb4444", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #eb4444" }}
        date="2023-2024"
        iconStyle={{ background: "#fff", color: "#fff" }}
        icon={<img src={css} alt="myLogo" />}
      >
        <h3 className="vertical-timeline-element-title">Design Wing Head</h3>
        <h4 className="vertical-timeline-element-subtitle">
          Computer Science Society, NIT Silchar
        </h4>
        <p>
          Appointed as the Head of the Design wing of Computer Science Society
          of NIT Silchar, worked for the betterment of Society in the aspect of
          digital presence.
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#968b0b", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #968b0b" }}
        date="2024 Summer"
        iconStyle={{ background: "#080707", color: "#fff" }}
        icon={<img src={micro} alt="myLogo" />}
      >
        <h3 className="vertical-timeline-element-title">
          Software developer Intern (upcoming){" "}
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Microsoft</h4>
        <p>
          Upcoming Software Developer Summer Intern at Microsoft, India. Looking
          forward to make the world better with my inputs in the technical
          domain.
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        iconStyle={{ background: "#080707", color: "#fff" }}
        icon={<img src={myLogo} alt="myLogo" />}
      />
    </VerticalTimeline>
  );
};

export default Education;
