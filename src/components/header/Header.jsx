import "./header.css";
import CTA from "./CTA";
import Solar from "../solar/Solar";
import { useState } from "react";

const Header = () => {
  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  setInterval(updateTime, 1000);

  return (
    <header>
      <div className="header__containerpc">
        <h5>This is</h5>
        <h1>
          LA<span className="h">H</span>ON
        </h1>
        <div className="wrapper2">
          <div className="typing-demo">an engineer who loves rap</div>
        </div>
        <CTA />
        <Solar />
        <div className="clock">
          <h4>Welcome to the Portfolio</h4>
          <p>
            Click on the planets to navigate to the desired sections <br />{" "}
            Click on the Home button to navigate to Top <br />
            This site is best viewed on PC <br />
            Happy Scrolling :)
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
