import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function RecommendProducts() {
  return (
    <>
      <div className="recommendProducts">
        <h4>推薦商品</h4>
        <div className="d-flex justify-content-between">
          <IoIosArrowBack className="arrowIcon " />
          <div className="productCard">
            <div className="productImg">
              <img
                src="/img/product/product_img/BRUNO_BOE029_R_02.jpeg"
                alt=""
              />
            </div>
            <div className="hoverText">
              <span>熱壓三明治鬆餅機機機機機 BOE043</span>
            </div>
          </div>
          <div className="productCard">
            <div className="productImg">
              <img
                src="/img/product/product_img/BRUNO_BOE043_PP_02.webp"
                alt=""
              />
            </div>
            <div className="hoverText">
              <span>熱壓三明治鬆餅機機機機機 BOE043</span>
            </div>
          </div>
          <div className="productCard">
            <div className="productImg">
              <img
                src="/img/product/product_img/BRUNO_BOE059_BGR_CE_02.jpeg"
                alt=""
              />
            </div>
            <div className="hoverText">
              <span>熱壓三明治鬆餅機 BOE043</span>
            </div>
          </div>
          <div className="productCard">
            <div className="productImg">
              <img
                src="/img/product/product_img/CHANCOO_CC5800_WH_03.jpeg"
                alt=""
              />
            </div>
            <div className="hoverText">
              <span>熱壓三明治鬆餅機機機機機 BOE043</span>
            </div>
          </div>
          <IoIosArrowForward className="arrowIcon ms-auto" />
        </div>
      </div>
    </>
  );
}

export default RecommendProducts;
