import React from 'react';
import '../../../styles/product/_productCategory.scss';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API_URL } from '../../../utils/config';
import axios from 'axios';

const ProductCategory = ({ setProductCateNow }) => {
  const [productCate, setProductCate] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const height = 60;
  const [move, setMove] = useState(height);
  const [activeId, setActiveId] = useState(0);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    (async () => {
      let productCateResult = await axios.get(`${API_URL}/products/category`);
      let productCateData = productCateResult.data;
      setProductCate([{ id: 0, name: '所有分類' }, ...productCateData]);
    })();
  }, []);
  return (
    <div className="categoryContainer">
      <div className="title">
        <p>CATEGORY</p>
      </div>
      {hover ? (
        <div
          className="active"
          style={{ transform: `translateY(${move}px)` }}
        ></div>
      ) : (
        ''
      )}

      {productCate.map((v, i) => {
        const { id, name } = v;
        return (
          <div
            key={id}
            className="category cursorPointer"
            style={{
              background: activeId === id && active ? '#817161' : '',
              color: activeId === id && active ? 'white' : '',
              borderRadius: activeId === id && active ? '5px' : '',
            }}
            onClick={() => {
              // const params = Object.fromEntries([...searchParams]);
              // params['productCate'] = v.id;
              // setSearchParams(params);
              setProductCateNow(v.id);
              setMove((i + 1) * height);
              setActiveId(id);
            }}
            onMouseOver={() => {
              setMove((i + 1) * height);
              setHover(true);
              setActive(false);
            }}
            onMouseOut={() => {
              setMove((i + 1) * height);
              setHover(false);
              setActive(true);
            }}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;
