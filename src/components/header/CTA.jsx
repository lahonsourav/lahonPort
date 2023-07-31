import React, { useState } from "react";
// import CV from "F:lahonportfoliolahon-portfoliosrcassetspic.jpg";

const CTA = () => {
  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  setInterval(updateTime, 1000);
  return (
    <div className="cta">
      <a className="btn">Resume</a>

      <a href="#portfolio" className="btn btn-primary">
        Projects
      </a>
    </div>
  );
};

export default CTA;
