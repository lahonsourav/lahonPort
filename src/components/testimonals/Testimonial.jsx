import React, { useEffect } from "react";
import "./testimonial.css";
import AVTR1 from "../../assets/mejpg.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import Aos from "aos";
import "aos/dist/aos.css";

const Testimonial = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section id="testimonials">
      <h5 data-aos="fade-down">For</h5>
      <h2>Clients and Learners</h2>
      <Swiper
        className="container testimonials__container"
        pagination={true}
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
      >
        <SwiperSlide className="testimonial">
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className="client__name">For Clients</h5>
          <small className="client__review">
            Have a product idea or need a website built?
          </small>
          <small className="client__review__one">
            I turn concepts into clean, fast, production-ready web apps. Browse
            the Projects section to see what I ship.
          </small>

          <small className="swipe">swipe</small>
        </SwiperSlide>

        <SwiperSlide className="testimonial">
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className="client__name">For Learners</h5>
          <small className="client__review">
            Want to learn from someone actually in the field?
          </small>
          <small className="client__review__one">
            I mentor across web, mobile, ML, music production, and more —
            hands-on, project-first, at your pace. Drop a message below.
          </small>

          <small className="swipe">swipe</small>
        </SwiperSlide>

        <SwiperSlide className="testimonial">
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className="client__name">For Collaborators</h5>
          <small className="client__review">
            Building something and need a dev who ships?
          </small>
          <small className="client__review__one">
            I work with early-stage teams on MVPs, product ideas, and quick
            iterations — from concept to live. Let's build something real.
          </small>

          <small className="swipe">scroll</small>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Testimonial;
