import "./App.css";
import Header from "./components/header/Header";
import Nav from "./components/Nav/Nav";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonials from "./components/testimonals/Testimonial";
import Contacts from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import AnimatedCursor from "react-animated-cursor";
import HeaderSocials from "./components/contact/HeaderSocials";
import Education from "./components/education/Education";

function App() {
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
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

      <Header />

      <Nav />
      <About />
      <Education />

      <Experience />

      <Portfolio />

      <Services />

      <Testimonials />

      <Contacts />
      <HeaderSocials />

      <Footer />
    </>
  );
}

export default App;
