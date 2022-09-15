import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/product/_product.scss';
import { IconContext } from 'react-icons';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';
import { API_URL } from '../../../utils/config';
import axios from 'axios';

const Product = () => {
  const [productList, setProductList] = useState([]);

  const getProductData = async (url = '') => {
    let result = await axios.get(`${API_URL}/products${url}`);
    let data = result.data;
    return data;
  };
  useEffect(() => {
    (async () => {
      let productListData = await getProductData();
      setProductList(productListData);
    })();
  }, []);
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
            <Link to={`/products/${id}`} className="hoverArea ">
              <div className="productImg">
                <div className="productHover">
                  <IconContext.Provider
                    value={{
                      color: 'white',
                      size: '2rem',
                      margin: '5px',
                    }}
                  >
                    <HiOutlineHeart
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        e.defaultPrevented();
                        console.log('h');
                      }}
                    />
                    <IoCartOutline
                      onClick={(e) => {
                        console.log('c');
                      }}
                    />
                  </IconContext.Provider>
                </div>
                <img src={`/img/product/product_img/${img}`} alt="" />
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
