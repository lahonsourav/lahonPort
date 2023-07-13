import React from "react";
import "./featured.css";
import ART from "../../assets/2018.jpg";
import Tilt from "react-parallax-tilt";

const featured = () => {
  return (
    <section id="featured">
      <h5 data-aos="fade-down">Let's start </h5>
      <h2>with a Painting</h2>
      <div className="container__portfolio__container">
        <Tilt>
          <div className="art__container">
            <img className="art__img" src={ART} alt="romantic evening art" />
          </div>
        </Tilt>
      </div>
    </section>
  );
};

export default featured;
