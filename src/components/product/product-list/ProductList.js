import React from 'react';
import ProductRank from './ProductRank';
import ProductCategory from './ProductCategory';
// import productClass from '../../../styles/productList.module.scss';
import '../../../styles/_productList.scss';

const ProductList = () => {
  return (
    <div className="product">
      <ProductRank />
      <ProductCategory />
    </div>
  );
};

export default ProductList;
