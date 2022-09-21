import React from 'react';
import classes from '../../../styles/moduleCss/index/slider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useState } from 'react';
import { useEffect } from 'react';

const SliderComponent = () => {
  const [slideTop, setSlideTop] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let scrollNow = -window.scrollY * 0.2;
      setSlideTop(scrollNow);
    });
  }, []);

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: `slick-dots ${classes.slickDotsAdjust}`,
  };

  return (
    <div className={classes.sliderContainer} style={{ top: `${slideTop}px` }}>
      <Slider {...settings}>
        <div>
          <figure className={classes.textSliderContainer}>
            <img
              src="/img/index/slide/slide1.jpg"
              alt="slide1"
              className="objectContain"
            />
          </figure>
        </div>
        <div>
          <figure className={classes.imgContainer}>
            <img
              src="/img/index/slide/slide2.jpg"
              alt="slide1"
              className="objectContain"
            />
          </figure>
        </div>
        <div>
          <figure className={classes.imgContainer}>
            <img
              src="/img/index/slide/slide3.jpg"
              alt="slide1"
              className="objectContain"
            />
          </figure>
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
