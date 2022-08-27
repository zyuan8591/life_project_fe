import React, { useRef } from 'react';
import classes from '../../../styles/moduleCss/slider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import slideImg1 from '../../../img/index/slide/slide1.jpg';
import slideImg1Text from '../../../img/index/slide/slide1-1.png';
import slideImg2 from '../../../img/index/slide/slide2.jpg';
import slideImg3 from '../../../img/index/slide/slide3.jpg';

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
          <img src={slideImg1} alt="slide1" className="objectContain" />
          <img
            src={slideImg1Text}
            alt="slide1Text"
            className={` ${classes.slideText}`}
          />
        </figure>
      </div>
      <div>
        <img src={slideImg2} alt="slide1" className="objectContain" />
      </div>
      <div>
        <img src={slideImg3} alt="slide1" className="objectContain" />
      </div>
    </Slider>
  );
};

export default SliderComponent;
