import React from 'react';
import ProductRank from './ProductRank';
import productClass from '../../../styles/productList.module.scss';

const ProductList = () => {
  return (
    <div className={productClass.product}>
      <ProductRank />
    </div>
  );
};

export default ProductList;
