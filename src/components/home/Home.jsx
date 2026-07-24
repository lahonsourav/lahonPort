import React from 'react'

import Header from "../header/Header"
import Nav from "../Nav/Nav";
import Experience from "../experience/Experience";
import Services from "../services/Services";
import Portfolio from "../portfolio/Portfolio";
import FeaturedBlogs from "../blog/FeaturedBlogs";
import Contacts from "../contact/Contact";
import Footer from "../footer/Footer";

import HeaderSocials from "../contact/HeaderSocials";
import Education from "../education/Education";
import CTA from '../../homePage/CTA';
import ScrollProgress from "../ScrollProgress/ScrollProgress";
import Cursor from "../cursor/Cursor";
import FlowerVine from "../FlowerVine/FlowerVine";
import useReveal from "../reveal/useReveal";
import FloodBanner from "../campaign/FloodBanner";

const Home = () => {
  useReveal();

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <FloodBanner />
      <Nav />

      <div className="vine-flow">
        <Header />
        <CTA />

        <Education />

        <FeaturedBlogs />

        <Portfolio />

        <Experience />

        <Services />

        <Contacts />

        <FlowerVine />
      </div>

      <HeaderSocials />

      <Footer />
    </>
  )
}

export default Home