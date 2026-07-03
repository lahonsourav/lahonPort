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
import Admin from "./admin/Admin.jsx";

const Home = lazy(() => import("./components/home/Home"));
const ContactOut = lazy(() => import("./components/contact/Contact"));
const Blog = lazy(() => import("./components/blog/Blog"));
const BlogPost = lazy(() => import("./components/blog/BlogPost"));
const Mood = lazy(() => import("./components/portfolio/Mood"));
const LazyKit = lazy(() => import("./components/portfolio/LazyKit"));
const Lazyperm = lazy(() => import("./components/portfolio/Lazyperm"));

function App() {
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <div className="App">
        <AnimatedCursor
          innerSize={8}
          outerSize={30}
          color="126, 231, 135"
          outerAlpha={0.15}
          innerScale={1}
          outerScale={2}
          outerStyle={{
            border: "2px solid var(--color-cursor)",
            mixBlendMode: "exclusion",
            zIndex: 9999,
          }}
          innerStyle={{
            backgroundColor: "#7ee787",
            mixBlendMode: "exclusion",
            zIndex: 9999,
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
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contactout" element={<ContactOut />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/lazykit" element={<LazyKit />} />
            <Route path="/lazyperm" element={<Lazyperm />} />
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