import React, { useRef } from 'react';
import classes from '../../../styles/moduleCss/slider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const SliderComponent = () => {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: classes.sliderContainer,
    dotsClass: `slick-dots ${classes.slickDotsAdjust}`,
  };

  return (
    <Slider {...settings}>
      <div>
        <figure className={classes.textSliderContainer}>
          {/* <img src={slideImg1} alt="slide1" className="objectContain" /> */}
          <img
            src="/img/index/slide/slide1.jpg"
            alt="slide1"
            className="objectContain"
          />
          <img
            src="/img/index/slide/slide1-1.png"
            alt="slide1Text"
            className={` ${classes.slideText}`}
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
  );
};

export default SliderComponent;
