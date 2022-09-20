import React from 'react';
import '../../../styles/product/_productCategory.scss';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API_URL } from '../../../utils/config';
import axios from 'axios';

const ProductCategory = ({ setProductCateNow }) => {
  const [productCate, setProductCate] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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
      {productCate.map((v, i) => {
        const { id, name } = v;
        return (
          <div
            key={id}
            className="category cursorPointer"
            onClick={() => {
              // const params = Object.fromEntries([...searchParams]);
              // params['productCate'] = v.id;
              // setSearchParams(params);
              setProductCateNow(v.id);
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
