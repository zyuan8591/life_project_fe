import React from 'react';
import { useState } from 'react';
import classes from '../../../styles/moduleCss/picnic_offical_detail/picnicOfficalDetail.module.scss';
import { v4 as uuidv4 } from 'uuid';
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
      <div className={classes.recommendProducts}>
        <h4>推薦野餐好幫手...</h4>
        <div className={classes.arrowIconSlider}>
          <IoIosArrowBack
            className={classes.arrowIconLeft}
            onClick={() => {
              slideLeft(cardWidth);
            }}
          />
          <IoIosArrowForward
            className={classes.arrowIconRight}
            onClick={() => {
              slideRight(cardWidth, displayTotal);
            }}
          />
          <div className={`${classes.slider} d-flex`}>
            <div
              className={`d-flex ${classes.slidewrap}`}
              style={{ transform: `translateX(${productSlider}px)` }}
            >
              {productsData.map((product) => {
                return (
                  <div className={classes.productCard} key={uuidv4()}>
                    <div className={classes.productImg}>
                      <img
                        src={`/img/product/product_img/${product.image}`}
                        alt="join us picnic"
                      />
                    </div>
                    <div className={classes.hoverText}>
                      <Link to={`/products/${product.product_id}`}>
                        <span>{product.name}</span>
                      </Link>
                    </div>
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
