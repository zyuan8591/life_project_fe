import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../utils/config';

const img = '/img/product/product_img/BRUNO_BOE059_BGR_CE_01.png';

const ProductListSlider = ({ now, total, data }) => {
  // const []
  const { category } = data;
  console.log(category);
  useEffect(() => {
    (async () => {
      let recommend = await axios.get(
        `${API_URL}/products/${category}/recommend`
      );
      console.log(recommend);
    })();
  }, [category]);
  return (
    <>
      {[...Array(total)].map((v, i) => {
        return (
          <>
            <figure
              style={{
                transform: `translateX(${now}px)`,
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
