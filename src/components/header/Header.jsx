import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const PHRASES = [
  "an engineer who loves Space",
  "a beats producer & musician",
  "building tools for devs",
];

const Header = () => {
  const navigate = useNavigate();
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let t;

    if (!erasing && charIdx < phrase.length) {
      t = setTimeout(() => {
        setDisplayed(phrase.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 75);
    } else if (!erasing) {
      t = setTimeout(() => setErasing(true), 2200);
    } else if (charIdx > 0) {
      t = setTimeout(() => {
        setCharIdx(c => c - 1);
        setDisplayed(phrase.slice(0, charIdx - 1));
      }, 35);
    } else {
      setErasing(false);
      setPhraseIdx(i => (i + 1) % PHRASES.length);
    }

    return () => clearTimeout(t);
  }, [charIdx, erasing, phraseIdx]);

  return (
    <header id="header">
      <div className="header__containerpc">
        <h5>Hi, I'm</h5>
        <h1>
          LA<span className="h">H</span>ON
        </h1>
        <div className="wrapper2">
          <div className="typing-demo">{displayed}</div>
        </div>
        <div className="now-shipping" onClick={() => navigate("/mood")} role="button">
          <span className="now-dot" />
          now shipping: <strong>innercast</strong>
        </div>
      </div>
    </header>
  );
};

export default Header;
