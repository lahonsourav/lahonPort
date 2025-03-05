import "./App.css";
import AnimatedCursor from "react-animated-cursor";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Loading from "./additionals/loading/Loading.jsx";

const HomePage = lazy(() => import("./homePage/HomePage.jsx"));
const Home = lazy(() => import("./components/home/Home"));
const Askme = lazy(() => import("./additionals/askme/Askme.jsx"));
const SolarMenu = lazy(() => import("./additionals/solar/SolarMenu.jsx"));
const Music = lazy(() => import("./components/portfolio/Music.jsx"));

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

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<SolarMenu />} />
            <Route path="/solar" element={<SolarMenu />} />
            <Route path="/home" element={<Home />} />
            <Route path="/askme" element={<Askme />} />
            <Route path="/alien" element={<HomePage />} />
            <Route path="/music" element={<Music />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;