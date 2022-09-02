import React from 'react';
import '../../../styles/product/_productList.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const slideimg = '/img/product/product_img/BRUNO_ BOE021_RD_01.jpeg';
const slideimg2 = '/img/product/product_img/BRUNO_ BOE021_WH_01.webp';
const slideimg3 = '/img/product/product_img/carbonator-3_white_001.png';
const slideimg4 = '/img/product/product_img/CHANCOO_CC5800_GRE_01.webp';
const slideimg5 = '/img/product/product_img/SMEG_SX679_GY_01.png';

const ProductRank = () => {
  const settings = {
    arrows: true,
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // className: classes.sliderContainer,
    // dotsClass: `slick-dots ${classes.slickDotsAdjust}`,
  };
  const arr = [slideimg, slideimg2, slideimg3, slideimg4, slideimg5];
  const arr2 = [1, 2, 3];
  return (
    <div className="reset">
      <div className="d-flex align-items-center justify-content-between title">
        <h4>商品一覽</h4>
        <p>
          LIFE {'>'} 商品 {'>'} 所有家電 {'>'} 所有分類
        </p>
      </div>
      <div className="rankTitle">
        <h5>商品排名</h5>
      </div>
      <Slider {...settings}>
        {arr2.map((i) => {
          return (
            <div className="d-flex justify-content-between" key={i}>
              {arr.map((v, i) => {
                return (
                  <div className="rank" key={i}>
                    <div className="number">
                      <p>{i + 1}</p>
                    </div>
                    <figure>
                      <img src={v} alt="" />
                    </figure>
                    <p>BOE021 多功能電烤盤-經典款（紅色）</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductRank;
