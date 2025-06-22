import "./App.css";
import AnimatedCursor from "react-animated-cursor";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";

import Loading from "./additionals/loading/Loading.jsx";
import HomePage from "./homePage/HomePage.jsx";
import Creative from "./components/portfolio/Creative.jsx";
import Admin from "./admin/Admin.jsx";

const Home = lazy(() => import("./components/home/Home"));
const SolarMenu = lazy(() => import("./additionals/solar/SolarMenu.jsx"));
const ContactOut = lazy(() => import("./components/contact/Contact"));

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
            <Route path="/creative" element={<Creative />} />
            <Route path="/contactout" element={<ContactOut />} />
          </Routes>
        </Suspense>

        <Routes>
          <Route path="/alien" element={<HomePage />} />
          <Route path="/adminsecret" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;