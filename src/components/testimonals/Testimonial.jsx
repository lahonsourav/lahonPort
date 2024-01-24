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
            If you are looking for someone to make your Website
          </small>
          <small className="client__review__one">
            I can make one for you efficiently. My work examples are featured in
            the Projects Section.
          </small>

          <small className="swipe">swipe</small>
        </SwiperSlide>

        <SwiperSlide className="testimonial">
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className="client__name">For Learners</h5>
          <small className="client__review">
            If you are Interested in learning Frontend Web development
          </small>
          <small className="client__review__one">
            I can teach you in the coolest way possible., just drop a message
            from the contact section below.
          </small>

          <small className="swipe">scroll</small>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Testimonial;
