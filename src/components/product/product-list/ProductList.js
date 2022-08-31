import React from 'react';
import ProductRank from './ProductRank';
import ProductCategory from './ProductCategory';
import ProductFilter from './ProductFilter';
// import productClass from '../../../styles/productList.module.scss';
import '../../../styles/_productList.scss';

const ProductList = () => {
  return (
    <div className="product">
      <ProductRank />
      <div className="d-flex mt-5 ">
        <ProductCategory />
        <ProductFilter />
      </div>
    </div>
  );
};

export default ProductList;
