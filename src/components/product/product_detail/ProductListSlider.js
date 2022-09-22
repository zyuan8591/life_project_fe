import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { API_URL, API_URL_IMG } from '../../../utils/config';
import { Link } from 'react-router-dom';

const ProductListSlider = ({ now, data }) => {
  const [recommendArr, setRecommendArr] = useState([]);
  const { category } = data;
  console.log(category);
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/products/recommend?category=${category}`
      );
      console.log(result.data);
      setRecommendArr(result.data);
    })();
  }, [category]);

  return (
    <>
      {recommendArr.map((v, i) => {
        const { id, name, img, color, price, brand } = v;
        return (
          <>
            <Link to={`/products/${id}`} style={{ color: '#444' }}>
              <figure
                style={{
                  transform: `translateX(${now}px)`,
                }}
                key={i}
              >
                <div
                  style={{
                    minHeight: '345px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`${API_URL_IMG}/product/product_img/${img}`}
                    alt=""
                  />
                </div>
                <p>
                  <span className="me-2">{brand}</span>
                  {name}
                  <span className="ms-2">({color})</span>
                </p>
                <p>
                  NT${' '}
                  {JSON.stringify(price).replace(
                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    ','
                  )}
                </p>
              </figure>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default ProductListSlider;
