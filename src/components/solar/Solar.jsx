import React, { useEffect, useState } from "react";
import "./solar.css";
import { useNavigate } from "react-router-dom";
import cv from "../../assets/resume.pdf";


const Solar = () => {
  // State to track the selected planet and visibility of the popup
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBack = () => {
      navigate(1);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [navigate]);


  // Function to handle planet clicks
  const handlePlanetClick = (planet) => {
    if (planet !== "sun" && planet !== "asteroids_meteorids" && planet !== "pluto") {
      setSelectedPlanet(planet);  // Only show pop-up for labeled planets
    }
  };

  // Function to close the popup
  const closePopup = () => {
    setSelectedPlanet(null);  // Reset the selected planet to hide the pop-up
  };

  // Map of labeled planets and their content
  const planetInfo = {
    mercury: "Mercury: The closest planet to the Sun.",
    venus: "All credits and acknowledgments are available in the README.md file of the GitHub repository.",
    earth: "I'm a Computer Science and Engineering Undergrad at NIT Silchar! 💻 Currently leveling up my full stack web dev skills and sharpening my problem-solving powers! 💪 Oh, and did I mention I make music? 🎶 ♫ I’m on a mission to explore the universe 🌌, get lost in the stars ✨, and wonder about Jupiter – that gas giant with so much personality! 🪐 By the way, I adore dogs and cats 🐕🐈, but frogs? 😍 They're kinda the hidden cuties in the animal kingdom! 🐸💚",
    mars: "Got a question? Don’t just sit there – dial +91 60010 98923 and let the fun begin!",
    jupiter: "oho! it's blank",
    saturn: "Currently rocking the Software Engineer Intern gig (2025) at Blackrock – where the code flows as smoothly as coffee!",
    uranus: "Currently wrangling code and acing algorithms as a final-year CSE student at NIT Silchar – the campus hero by day, debugger by night!",
    neptune: "oho! it's blank"
  };


  const handleResume = () => {
    window.open(cv, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <div className="clearfix">

        {/* Solar system UI */}
        <ul className="solarsystem">
          <li className="sun" onClick={() => navigate("/home")}></li>
          <li className="mercury" onClick={() => handlePlanetClick("mercury")}>
            <span></span>
          </li>
          <li className="venus" onClick={handleResume}>
            <span>resume</span>
          </li>
          <li className="earth" onClick={() => handlePlanetClick("earth")}>
            <span>
              <span className="moon"></span>
            </span>
          </li>
          <li className="mars" onClick={() => navigate("/creative")}>
            <span>creative</span>
          </li>
          <li className="asteroids_meteorids"></li>
          <li className="jupiter" onClick={() => navigate("/contactout")}>
            <span>contact</span>
          </li>
          <li className="saturn" >
            <span>

              <span className="ring"></span>
            </span>
          </li>
          <li className="uranus" onClick={() => navigate("/home")}>
            <span>portfolio</span>
          </li>
          <li className="neptune">
            <span></span>
          </li>
          <li className="pluto"></li>
        </ul>

        {/* Pop-up Modal */}
        {selectedPlanet && (
          <div className="popup">
            <div className="popup-content">

              <p>{planetInfo[selectedPlanet]}</p>
              <button className="btn btn-primary" onClick={closePopup}>
                Close this damn thing
              </button>
            </div>
          </div>
        )}
      </div>


      <small className="hint">
        No Clue? Click the <span>Sun</span> 🌞

      </small>



    </>


  );
};

export default Solar;
