import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const products = [
  { name: '熱壓三明治鬆餅機機機機機', img: 'BRUNO_BOE029_R_02.jpeg' },
  { name: '熱壓三明治鬆餅', img: 'BRUNO_BOE043_PP_02.webp' },
  { name: '熱壓三明治鬆餅機機機機機', img: 'BRUNO_BOE059_BGR_CE_02.jpeg' },
  { name: '熱壓三明治鬆餅機機', img: 'CHANCOO_CC5800_WH_03.jpeg' },
  { name: '熱壓三明治鬆餅機機機機機', img: 'OSTER_BLSTMM_AA2_02.png' },
];
function RecommendProducts() {
  const [product, setProduct] = useState(products);
  const productLength = product.length;
  const [productSlider, setProductSlider] = useState(0);



  return (
    <>
      {/* 推薦商品 */}
      <div className="recommendProducts">
        <h4>推薦商品</h4>
        <div className="slide d-flex">
            <IoIosArrowBack
              className="arrowIcon mt-auto flex-shrink-0"
            />
          <div className="slideImg d-flex">
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
            <IoIosArrowForward
              className="arrowIcon ms-auto flex-shrink-0"
              // onClick={() => {}}
            />
        </div>
      </div>
    </>
  );
}

export default RecommendProducts;

{
  /* <div className="productCard">
            <div className="productImg">
              <img
                src="/img/product/product_img/BRUNO_BOE043_PP_02.webp"
                alt=""
              />
            </div>
            <div className="hoverText">
              <span>熱壓三明治鬆餅機機機機機 BOE043</span>
            </div>
          </div> */
}
