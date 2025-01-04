import "./App.css";
import AnimatedCursor from "react-animated-cursor";
import HomePage from "./homePage/HomePage.jsx";
import Home from "./components/home/Home";
import Askme from "./additionals/askme/Askme.jsx";
import SolarMenu from "./additionals/solar/SolarMenu.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomeMenu from "./homePage/HomeMenu.jsx";
import Music from "./components/portfolio/Music.jsx";

function App() {
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <div className="App">
        <AnimatedCursor
          innerSize={8}
          outerSize={30}
          color="255, 0, 0"
          outerAlpha={0.1}
          innerScale={1}
          outerScale={2}
          outerStyle={{
            border: "2px solid var(--color-cursor)",
            mixBlendMode: "exclusion",
          }}
          innerStyle={{
            backgroundColor: "#ff0000",
            mixBlendMode: "exclusion",
          }}
          trailingSpeed={10}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homemenu" element={<HomeMenu />} />
          <Route path="/solar" element={<SolarMenu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/askme" element={<Askme />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
