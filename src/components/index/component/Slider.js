/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import 'swiper/css';

const slide = [{ src: '/img/index/slide/slide1.jpg' }];

const Slider = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={2.5}
      centeredSlides={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
    >
      <SwiperSlide>
        <img
          src="/img/index/slide/slide1.jpg"
          alt="slide1"
          className="objectContain"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/img/index/slide/slide2.jpg"
          alt="slide2"
          className="objectContain"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/img/index/slide/slide3.jpg"
          alt="slide3"
          className="objectContain"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
