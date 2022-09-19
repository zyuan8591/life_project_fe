import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/product/_product.scss';
import { IconContext } from 'react-icons';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';
import { API_URL } from '../../../utils/config';
import axios from 'axios';

const Product = ({
  productList,
  fav,
  setProductLikeId,
  productLikeId
}) => {
  return (
    <div className="productContainer">
      {productList.map((v, i) => {
        const { id, name, price, brand, img, color, img2 } = v;
        return (
          <div
            className="products"
            key={i}
            onMouseOver={(e) => {
              e.target.src = `/img/product/product_img/${img2}`;
            }}
            onMouseOut={(e) => {
              e.target.src = `/img/product/product_img/${img}`;
            }}
          >
            {' '}
            <div className="productHoverContainer">
              <div className="productHover">
                <IconContext.Provider
                  value={{
                    color: 'white',
                    size: '2rem',
                    margin: '5px',
                  }}
                >
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={async () => {
                      console.log(id);
                      if (fav.includes(v.id)) {
                        await axios.delete(
                          `${API_URL}/products/${id}/removeLike`,
                          { withCredentials: true }
                        );
                        setProductLikeId(!productLikeId);
                        // console.log(id);
                      } else {
                        await axios.post(
                          `${API_URL}/products/addLike`,
                          { id },
                          { withCredentials: true }
                        );
                        // console.log(id);
                        setProductLikeId(!productLikeId);
                      }
                    }}
                  >
                    {fav.includes(v.id) ? (
                      <IconContext.Provider
                        value={{
                          color: 'red',
                          size: '2rem',
                          margin: '5px',
                        }}
                      >
                        <HiHeart />
                      </IconContext.Provider>
                    ) : (
                      <HiOutlineHeart />
                    )}
                  </div>
                  <div style={{ cursor: 'pointer' }}>
                    <IoCartOutline
                      onClick={(e) => {
                        console.log('c');
                      }}
                    />
                  </div>
                </IconContext.Provider>
              </div>
            </div>
            <Link to={`/products/${id}`} className="link">
              <div
                className="hoverArea "
                onClick={(e) => {
                  console.log('h');
                }}
              >
                <div className="productImg">
                  <img src={`/img/product/product_img/${img}`} alt="" />
                </div>
              </div>
            </Link>
            <div className="nameArea">
              <p className="name">{name}</p>
              <p className="color">{color}</p>
            </div>
            <div className="brandArea">
              <p className="brand">{brand}</p>
              <p className="price">
                NT${' '}
                {price
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
