import React from 'react'

import Header from "../header/Header"
import Nav from "../Nav/Nav";
import About from "../about/About";
import Experience from "../experience/Experience";
import Services from "../services/Services";
import Portfolio from "../portfolio/Portfolio";
import Contacts from "../contact/Contact";
import Footer from "../footer/Footer";

import HeaderSocials from "../contact/HeaderSocials";
import Education from "../education/Education";
import CTA from '../../homePage/CTA';
import ScrollProgress from "../ScrollProgress/ScrollProgress";
import Cursor from "../cursor/Cursor";
import FlowerVine from "../FlowerVine/FlowerVine";
import useReveal from "../reveal/useReveal";

const Home = () => {
  useReveal();

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />

      <div className="vine-flow">
        <Header />
        <CTA />
        <About />

        <Education />

        <Experience />

        <Portfolio />

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