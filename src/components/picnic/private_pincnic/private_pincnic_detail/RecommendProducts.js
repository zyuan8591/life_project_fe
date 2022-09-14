import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

function RecommendProducts({ cardWidth, displayTotal, productsData }) {
  const productLength = productsData.length; //總共幾張
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
              {productsData.map((product) => {
                return (
                  <div className="productCard" key={uuidv4()}>
                    <div className="productImg">
                      <img
                        src={`/img/product/product_img/${product.image}`}
                        alt=""
                      />
                    </div>
                    <div className="hoverText">
                      <span>{product.name}</span>
                    </div>
                    <Link to={`/products/${product.product_id}`}></Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendProducts;
