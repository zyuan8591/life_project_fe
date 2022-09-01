import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/product/_product.scss';
import { IconContext } from 'react-icons';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';

const Product = () => {
  const [count, setCount] = useState(12);
  return (
    <div className="productContainer">
      {Array(count)
        .fill(1)
        .map((v, i) => {
          return (
            <div className="products" key={i}>
              <Link
                to="/"
                className="hoverArea "
                onMouseOver={(e) => {
                  e.target.src =
                    '/img/product/product_img/BRUNO_ BOE021_WH_01.webp';
                  console.log(e.target.src);
                }}
                onMouseOut={(e) => {
                  e.target.src =
                    '/img/product/product_img/BRUNO_ BOE021_RD_01.jpeg';
                  console.log(e.target.src);
                }}
              >
                <div className="productImg">
                  <div className="productHover">
                    <IconContext.Provider
                      value={{
                        color: 'white',
                        size: '2rem',
                        margin: '5px',
                      }}
                    >
                      <HiOutlineHeart />
                      <IoCartOutline />
                    </IconContext.Provider>
                  </div>
                  <img
                    src="/img/product/product_img/BRUNO_ BOE021_RD_01.jpeg"
                    alt=""
                  />
                </div>
              </Link>
              <div className="nameArea">
                <p className="name">BOE021 多功能電烤盤-經典款</p>
                <p className="color">紅色</p>
              </div>
              <div className="brandArea">
                <p className="brand">BRUNO</p>
                <p className="price">NT$ 3,290</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Product;
