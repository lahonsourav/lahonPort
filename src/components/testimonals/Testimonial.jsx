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
      <h5 data-aos="fade-down">
        Till I get some testimonials to feature here, read tales
      </h5>
      <h2>of my Education Journey</h2>
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
          <h5 className="client__name">Primary School</h5>
          <small className="client__review">
            I love this stage of my life, innocent and pure
          </small>
          <small className="client__review__one">
            My primary education started in a govt primary school in my village,
            This was the time when ABC was ABC, not Aye BC
          </small>

          <small className="swipe">swipe for Middle school</small>
        </SwiperSlide>
        <SwiperSlide className="testimonial">
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className="client__name">
            Jatiya Vidayalaya Gogamukh, JNV Dhemaji
          </h5>
          <small className="client__review">
            It's interesting, I didn't study class V
          </small>
          <small className="client__review__one">
            It was hard for my Farmer Father to get me into a private school,
            yet he did, It was harder for me to pass Navadaya entrance exam in
            class IV, yet I did
          </small>

          <small className="swipe">swipe for High school</small>
        </SwiperSlide>
        <SwiperSlide className="testimonial">
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className="client__name">Kendriya Vidyalaya NHPC</h5>
          <small className="client__review">
            The only stage where I made a 10 CGPA
          </small>
          <small className="client__review__one">
            From Navadaya Vidayala to Kendriya Vidyalaya my puberty hit, how
            can't I miss those days when I ...
          </small>

          <small className="swipe">swipe for Junior College</small>
        </SwiperSlide>
        <SwiperSlide className="testimonial">
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className="client__name">Brilliant Academy, North Lakhimpur</h5>
          <small className="client__review">
            where I got the attitude from?
          </small>
          <small className="client__review__one">
            Smoking, consuming alcohol is injurious to health
          </small>

          <small className="swipe">go to last stage of education</small>
        </SwiperSlide>

        <SwiperSlide className="testimonial">
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className="client__name">NIT Silchar</h5>
          <small className="client__review">75% attendance</small>
          <small className="client__review__one">
            No mercy to them with below 75% attendance, Action will be taken.
          </small>

          <small className="swipe">swipe back, pain only</small>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Testimonial;
