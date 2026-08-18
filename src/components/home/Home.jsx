import React from 'react'

import Header from "../header/Header"
import Nav from "../Nav/Nav";
import Experience from "../experience/Experience";
import Portfolio from "../portfolio/Portfolio";
import MokshaPreview from "../moksha/MokshaPreview";
import FeaturedBlogs from "../blog/FeaturedBlogs";
import Contacts from "../contact/Contact";
import Footer from "../footer/Footer";

import HeaderSocials from "../contact/HeaderSocials";
import Education from "../education/Education";
import CTA from './CTA';
import AilPreview from '../ail/AilPreview';
import ScrollProgress from "../ScrollProgress/ScrollProgress";
import Cursor from "../cursor/Cursor";
import FlowerVine from "../FlowerVine/FlowerVine";
import useReveal from "../reveal/useReveal";
import { unlock } from "../../lib/achievements";

const Home = () => {
  useReveal();

  React.useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          unlock("deep-diver");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />

      <div className="vine-flow">
        <Header />
        <CTA />
        <AilPreview />

        <Education />

        <FeaturedBlogs />

        <Portfolio />

        <Experience />

        <MokshaPreview />

        <Contacts />

        <FlowerVine />
      </div>

      <HeaderSocials />

      <Footer />
    </>
  )
}

export default Home