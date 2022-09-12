import React from 'react';
// import { v4 as uuidv4 } from 'uuid';

const img = '/img/product/product_img/BRUNO_BOE059_BGR_CE_01.png';

const ProductListSlider = ({ now, total }) => {
  // console.log(now);
  return (
    <>
      {[...Array(total)].map((v, i) => {
        return (
          <>
            <figure
              style={{
                transform: `translateX(${now}px)`,
                transition: '0.4s',
              }}
              key={i}
            >
              <img src={img} alt="" />
              <p>
                <span className="me-2">BRUNO</span>多功能電烤盤-經典款
                <span className="ms-2">(白色)</span>
              </p>
              <p>NT$ 3,290</p>
            </figure>
          </>
        );
      })}
    </>
  );
};

export default ProductListSlider;
