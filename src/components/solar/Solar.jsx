import React, { useState } from "react";
import "./solar.css";

const Solar = () => {
  // State to track the selected planet and visibility of the popup
  const [selectedPlanet, setSelectedPlanet] = useState(null);

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
    earth: "Earth: Our home planet, the only known planet with life.",
    mars: "Got a question? Don’t just sit there – dial +91 60010 98923 and let the fun begin!",
    jupiter: "Ex-Software Sorcerer for a summer at Microsoft (2024) – Conjured up code, debugged dragons, and tamed tech beasts!",
    saturn: "Currently rocking the Software Engineer Intern gig (2025) at Blackrock – where the code flows as smoothly as coffee!",
    uranus: "Currently wrangling code and acing algorithms as a final-year CSE student at NIT Silchar – the campus hero by day, debugger by night!",
    neptune: "I'm a Computer Science and Engineering Undergrad at NIT Silchar! 💻 Currently leveling up my full stack web dev skills and sharpening my problem-solving powers! 💪 Oh, and did I mention I make music? 🎶 ♫ I’m on a mission to explore the universe 🌌, get lost in the stars ✨, and wonder about Jupiter – that gas giant with so much personality! 🪐 By the way, I adore dogs and cats 🐕🐈, but frogs? 😍 They're kinda the hidden cuties in the animal kingdom! 🐸💚",
  };

  return (
    <div className="clearfix">
      {/* Solar system UI */}
      <ul className="solarsystem">
        <li className="sun"></li>
        <li className="mercury" onClick={() => handlePlanetClick("mercury")}>
          <span></span>
        </li>
        <li className="venus" onClick={() => handlePlanetClick("venus")}>
          <span>credits</span>
        </li>
        <li className="earth" onClick={() => handlePlanetClick("earth")}>
          <span>
            <span className="moon"></span>
          </span>
        </li>
        <li className="mars" onClick={() => handlePlanetClick("mars")}>
          <span>contact</span>
        </li>
        <li className="asteroids_meteorids"></li>
        <li className="jupiter" onClick={() => handlePlanetClick("jupiter")}>
          <span>experience</span>
        </li>
        <li className="saturn" onClick={() => handlePlanetClick("saturn")}>
          <span>
            profession
            <span className="ring"></span>
          </span>
        </li>
        <li className="uranus" onClick={() => handlePlanetClick("uranus")}>
          <span>education</span>
        </li>
        <li className="neptune" onClick={() => handlePlanetClick("neptune")}>
          <span>about</span>
        </li>
        <li className="pluto"></li>
      </ul>

      {/* Pop-up Modal */}
      {selectedPlanet && (
        <div className="popup">
          <div className="popup-content">
          
            <p>{planetInfo[selectedPlanet]}</p>
            <button onClick={closePopup}>
              Close this damn thing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Solar;
