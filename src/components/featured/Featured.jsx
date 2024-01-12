import React from "react";
import "./featured.css";
// import ART from "../../assets/startup.png";
// import Tilt from "react-parallax-tilt";

const featured = () => {
  return (
    <section className="featured_container" id="featured">
      <h5 data-aos="fade-down">Browse my Start-Up </h5>
      <h2>Gamusa - Assamese Traditional Attire</h2>

      <div className="container__portfolio__container">
        {/* <Tilt>
          <div className="art__container">
            <img className="art__img" src={ART} alt="romantic evening art" />
          </div>
        </Tilt> */}

        <iframe
          className="gamusa"
          title="gamusa"
          src="https://www.gamusagogamukh.in"
        >
          Gamusa - Assamese Traditional Attire - Loading
        </iframe>
      </div>
    </section>
  );
};

export default featured;
