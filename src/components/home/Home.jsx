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

const Home = () => {
  return (
    <>
      <Nav />

      <Header />
      <CTA />
      <About />

      <Portfolio />

      <Experience />

      <Education />

      <Services />

      <Contacts />
      <HeaderSocials />

      <Footer />
    </>
  )
}

export default Home