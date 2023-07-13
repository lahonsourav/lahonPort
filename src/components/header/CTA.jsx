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
      <div className="btn">Time is</div>

      <div href="#contact" className="btn btn-primary">
        {currentTime}
      </div>
    </div>
  );
};

export default CTA;
