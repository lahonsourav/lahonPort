import "./App.css";
import AnimatedCursor from "react-animated-cursor";
import Home from "./components/home/Home";
import Askme from "./additionals/askme/Askme.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

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

        {/* Define Routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/askme" element={<Askme />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
