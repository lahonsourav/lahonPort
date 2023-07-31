import "./header.css";
import CTA from "./CTA";
import Solar from "../solar/Solar";

const Header = () => {
  return (
    <header>
      <div className="header__containerpc">
        <h5>This is</h5>
        <h1>
          LA<span className="h">H</span>ON
        </h1>
        <div className="wrapper2">
          <div className="typing-demo">an engineer who loves Space</div>
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
