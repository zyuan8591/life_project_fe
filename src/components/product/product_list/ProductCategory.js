import React from 'react';
import '../../../styles/product/_productCategory.scss';
import { useState, useRef, useEffect } from 'react';
import { API_URL } from '../../../utils/config';
import axios from 'axios';

const ProductCategory = () => {
  const [productCate, setProductCate] = useState([]);
  useEffect(() => {
    (async () => {
      let productCateResult = await axios.get(`${API_URL}/products/category`);
      let productCateData = productCateResult.data;
      setProductCate(productCateData);
    })();
  }, []);
  return (
    <div className="categoryContainer">
      <div className="title">
        <p>CATEGORY</p>
      </div>
      {productCate.map((v, i) => {
        return (
          <div key={i} className="category">
            {v}
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;
