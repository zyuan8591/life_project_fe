/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  '/img/index/slide/slide1.jpg',
  '/img/index/slide/slide2.jpg',
  '/img/index/slide/slide3.jpg',
];

const Slider = () => {
  const [vw, setVw] = useState(window.innerWidth);
  const [slideToShow, setSlideToShow] = useState(1.75);

  const updateVw = () => setVw(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', updateVw);
    return function clean() {
      window.removeEventListener('resize', updateVw);
    };
  }, []);

  useEffect(() => {
    if (vw < 500) return setSlideToShow(1);
    if (vw < 765) return setSlideToShow(1.5);
    setSlideToShow(1.75);
  }, [vw]);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={slideToShow}
      centeredSlides={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Navigation, Pagination]}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={slide}>
          <img src={slide} alt={`slide${i}`} className="objectContain" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
