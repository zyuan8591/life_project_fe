import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const products = [
  { name: '熱壓三明治鬆餅機機機機機', img: 'BRUNO_BOE029_R_02.jpeg' },
  { name: '熱壓三明治鬆餅', img: 'BRUNO_BOE043_PP_02.webp' },
  { name: '熱壓三明治鬆餅機機機機機', img: 'BRUNO_BOE059_BGR_CE_02.jpeg' },
  { name: '熱壓三明治鬆餅機機', img: 'CHANCOO_CC5800_WH_03.jpeg' },
  { name: '熱壓三明治鬆餅機機機機機', img: 'OSTER_BLSTMM_AA2_02.png' },
  { name: '熱壓三明治鬆餅機機機機機', img: 'OSTER_BLSTMM_AA2_02.png' },
  { name: '熱壓三明治鬆餅機機機機機', img: 'OSTER_BLSTMM_AA2_02.png' },
  { name: '熱壓三明治鬆餅機機機機機', img: 'OSTER_BLSTMM_AA2_02.png' },
];
function RecommendProducts({ cardWidth, displayTotal }) {
  const [product, setProduct] = useState(products);
  const productLength = product.length; //總共幾張
  const [productSlider, setProductSlider] = useState(0); //移動值

  const slideRight = (cardWidth, displayTotal) => {
    // 卡片寬 cardWidth, 呈現幾張 displayTotal
    // console.log(displayTotal)
    let nowLeft = 0;
    const leftMove = productSlider - cardWidth; //往左移動多少寬度
    let limitLeftMove = -cardWidth * (productLength - displayTotal);
    if (leftMove < limitLeftMove) return nowLeft;
    setProductSlider(leftMove);
    nowLeft = leftMove;
  };
  const slideLeft = (cardWidth) => {
    let nowLeft = 0;
    const rightMove = productSlider + cardWidth;
    if (rightMove > 0) return nowLeft;
    setProductSlider(rightMove);
    nowLeft = rightMove;
  };
  return (
    <>
      {/* 推薦商品 */}
      <div className="recommendProducts">
        <h4>推薦商品</h4>
        <div className="arrowIconSlider">
          <IoIosArrowBack
            className="arrowIconLeft"
            onClick={() => {
              slideLeft(cardWidth);
            }}
          />
          <IoIosArrowForward
            className="arrowIconRight"
            onClick={() => {
              slideRight(cardWidth, displayTotal);
            }}
          />
          <div className="slider d-flex ">
            <div
              className="d-flex slidewrap"
              style={{ transform: `translateX(${productSlider}px)` }}
            >
              {products.map((v) => {
                return (
                  <div className="productCard" key={uuidv4()}>
                    <div className="productImg">
                      <img src={`/img/product/product_img/${v.img}`} alt="" />
                    </div>
                    <div className="hoverText">
                      <span>{v.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Link to="/activity/picnic/official"></Link>
      </div>
    </>
  );
}

export default RecommendProducts;
