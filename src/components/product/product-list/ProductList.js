import React from 'react';
import ProductRank from './ProductRank';
// import productClass from '../../../styles/productList.module.scss';
import '../../../styles/_productList.scss';

const ProductList = () => {
  return (
    <div className="product">
      <ProductRank />
    </div>
  );
};

export default ProductList;
