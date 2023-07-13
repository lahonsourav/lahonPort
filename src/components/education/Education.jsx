import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import myLogo from "../../treeicons/one.png";
const Education = () => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#4db5ff", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #4db5ff" }}
        date="2004-2010"
        iconStyle={{ background: "#080707", color: "#fff" }}
        icon={<img src={myLogo} alt="myLogo" />}
      >
        <h3 className="vertical-timeline-element-title">Primary Education</h3>
        <h4 className="vertical-timeline-element-subtitle">
          Jatiya Vidyalaya, Gogamukh
        </h4>
        <p>
          Though my primary schooling started in the government school of my
          village, soon I had to admit in a private school, and my parents chose
          a regional language school because 'main budhu tha'.
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#eb4444", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #eb4444" }}
        date="2011-2014"
        iconStyle={{ background: "#080707", color: "#fff" }}
        icon={<img src={myLogo} alt="myLogo" />}
      >
        <h3 className="vertical-timeline-element-title">Secondary Education</h3>
        <h4 className="vertical-timeline-element-subtitle">
          JNV, Dhemaji, Assam
        </h4>
        <p>
          It was my fortune to clear the JNV Entrance exam in class 4, because
          papa mar marke padhate the, and main v mar khate khate padhaku bann
          gaya tha.
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#968b0b", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #968b0b" }}
        date="2015-2017"
        iconStyle={{ background: "#080707", color: "#fff" }}
        icon={<img src={myLogo} alt="myLogo" />}
      >
        <h3 className="vertical-timeline-element-title">
          Senior Secondary Education
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
          Kendriya Vidyalaya, Gerukamukh, Assam
        </h4>
        <p>
          I had to leave JNV Dhemaji, for some personal, mechanical, electrical,
          geographical, economical, technical reasons.
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#313ab5", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #313ab5" }}
        date="2018-2020"
        iconStyle={{ background: "#080707", color: "#fff" }}
        icon={<img src={myLogo} alt="myLogo" />}
      >
        <h3 className="vertical-timeline-element-title">
          Higher Secondary Education
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
          Brilliant Academy, North Lakhimpur
        </h4>
        <p>
          I don't have anything to talk about this, so I'm just writing this
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
          quae.'
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#3cf0ea", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #3cf0ea" }}
        date="2021-present"
        iconStyle={{ background: "#080707", color: "#fff" }}
        icon={<img src={myLogo} alt="myLogo" />}
      >
        <h3 className="vertical-timeline-element-title">Higher Education</h3>
        <h4 className="vertical-timeline-element-subtitle">NIT Silchar, CSE</h4>
        <p>
          Currently struggling to maintain 75% attendance, and definately
          becoming an Engineering failure.
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        iconStyle={{ background: "#fc0505", color: "#fff" }}
        icon={<img src={myLogo} alt="myLogo" />}
      />
    </VerticalTimeline>
  );
};

export default Education;
