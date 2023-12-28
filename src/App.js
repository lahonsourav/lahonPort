import "./App.css";
import Header from "./components/header/Header";
import Nav from "./components/Nav/Nav";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
// import Testimonials from "./components/testimonals/Testimonial";
import Contacts from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
// import Featured from "./components/featured/Featured";
import AnimatedCursor from "react-animated-cursor";
import HeaderSocials from "./components/contact/HeaderSocials";
import Songs from "./components/portfolio/Songs";

function App() {
  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        color="255, 0, 0"
        outerAlpha={0.1}
        innerScale={1}
        outerScale={3}
        outerStyle={{
          border: "2px solid var(--color-cursor)",
          mixBlendMode: "exclusion",
        }}
        innerStyle={{
          backgroundColor: "#ff0000",
          mixBlendMode: "exclusion",
        }}
        trailingSpeed={5}
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
      <Experience />

      <Portfolio />

      <Services />

      {/* <Featured /> */}

      <Songs />

      {/* <Testimonials /> */}

      <Contacts />
      <HeaderSocials />

      <Footer />
    </>
  );
}

export default App;
