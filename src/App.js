import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";

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
const Wormhole = lazy(() => import("./components/portfolio/Wormhole"));

function App() {
  useEffect(() => {
    const block = (e) => e.preventDefault();
    window.addEventListener("contextmenu", block);
    return () => window.removeEventListener("contextmenu", block);
  }, []);

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contactout" element={<ContactOut />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/lazykit" element={<LazyKit />} />
            <Route path="/lazyperm" element={<Lazyperm />} />
            <Route path="/wormhole" element={<Wormhole />} />
            <Route path="/alien" element={<HomePage />} />
            <Route path="/adminsecret" element={<Admin />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;