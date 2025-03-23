import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';


const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const [hidden, setHidden] = useState(false);
  const [clickedBubble, setClickedBubble] = useState(null);
  const [allRed, setAllRed] = useState(false);

  const [hideWrapper3, setHideWrapper3] = useState(false); // State to hide wrapper3

  const handleClick = (label, index) => {
    if (label === "O2") {
      setClickedBubble(index); // Track the specific "O2" bubble clicked
      setTimeout(() => {
        setHidden(true); // Hide the #background-wrap
        setClickedBubble(null); // Reset the clicked bubble state

        setHideWrapper3(true); // Hide wrapper3 after clicking O2

        // Redirect to the /homemenu page after a delay
        navigate('/creative'); // Redirect to /homemenu
      }, 1000);
    } else {
      setAllRed(true); // Turn all bubbles red
      setTimeout(() => setAllRed(false), 1000); // Reset after 1 second
    }
  };

  return (
    <div className="homePage">


      {!hidden && (
        <div id="background-wrap">
          {["H", "He", "N2", "Cl", "Ar", "O2", "O2", "Kr", "O2", "Ne"].map((label, index) => (
            <div
              key={index}
              className={`bubble x${index + 1} ${allRed ? "red" : ""} ${clickedBubble === index ? "blue" : ""
                }`}
              onClick={() => handleClick(label, index)}
            >
              <h1>
                {label.includes("2") ? (
                  <>
                    {label[0]}
                    <sub>{label[1]}</sub>
                  </>
                ) : (
                  label
                )}
              </h1>
            </div>
          ))}
        </div>
      )}



      <div className="footer__copyright_home">
        {!hideWrapper3 && (
          <div className="wrapper3">
            <small>if you're not an alien</small>
            <small>press the <span>Oxygen</span> bubble</small>
          </div>
        )}
        <div className="footer__copyright__youtube">
          <small>
            <a
              href="https://github.com/lahonsourav/lahonPort"
              target="_blank"
              rel="noreferrer"
            >
              srcCode &nbsp;
            </a>
            |
            <a
              href="https://github.com/lahonsourav/lahonPort?tab=readme-ov-file#readme"
              target="_blank"
              rel="noreferrer"
            >
              &nbsp; Credits
            </a>
          </small>

          <small>&copy;&nbsp; www.lahon.in 2025</small>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
