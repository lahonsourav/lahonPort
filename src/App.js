import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";

import Loading from "./additionals/loading/Loading.jsx";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle.jsx";
import AccentPicker from "./components/ThemeToggle/AccentPicker.jsx";
import SoundToggle from "./components/SoundToggle/SoundToggle.jsx";
import StickyModeToggle from "./components/StickyModeToggle/StickyModeToggle.jsx";
import AchievementsTray from "./components/Achievements/AchievementsTray.jsx";
import Guide from "./components/Guide/Guide.jsx";
import RouteTracker from "./components/RouteTracker/RouteTracker.jsx";
import ClickSoundListener from "./components/ClickSound/ClickSoundListener.jsx";
import ScrollManager from "./components/shared/ScrollManager.jsx";

const Home = lazy(() => import("./components/home/Home"));
const ContactOut = lazy(() => import("./components/contact/Contact"));
const Blog = lazy(() => import("./components/blog/Blog"));
const BlogPost = lazy(() => import("./components/blog/BlogPost"));
const Mood = lazy(() => import("./components/portfolio/Mood"));
const LazyKit = lazy(() => import("./components/portfolio/LazyKit"));
const Lazyperm = lazy(() => import("./components/portfolio/Lazyperm"));
const Wormhole = lazy(() => import("./components/portfolio/Wormhole"));
const HereIAm = lazy(() => import("./components/portfolio/HereIAm"));
const AssamFlood = lazy(() => import("./components/campaign/AssamFlood"));
const Work = lazy(() => import("./components/portfolio/Work"));
const Moksha = lazy(() => import("./components/moksha/Moksha"));
const Ail = lazy(() => import("./components/ail/Ail"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

function App() {
  useEffect(() => {
    const block = (e) => e.preventDefault();
    window.addEventListener("contextmenu", block);
    return () => window.removeEventListener("contextmenu", block);
  }, []);

  return (
    <Router>
      <div className="App">
        <ThemeToggle />
        <AccentPicker />
        <SoundToggle />
        <StickyModeToggle />
        <AchievementsTray />
        <Guide />
        <ScrollManager />
        <RouteTracker />
        <ClickSoundListener />
        <Suspense fallback={<Loading />}>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contactout" element={<ContactOut />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/lazykit" element={<LazyKit />} />
              <Route path="/lazyperm" element={<Lazyperm />} />
              <Route path="/wormhole" element={<Wormhole />} />
              <Route path="/hereiam" element={<HereIAm />} />
              <Route path="/assamflood2026" element={<AssamFlood />} />
              <Route path="/work" element={<Work />} />
              <Route path="/moksha" element={<Moksha />} />
              <Route path="/ail" element={<Ail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;