import React from 'react';
import { useState } from 'react';
import ProductRank from './ProductRank';
import ProductCategory from './ProductCategory';
import ProductFilter from './ProductFilter';
// import productClass from '../../../styles/productList.module.scss';
import '../../../styles/product/_productList.scss';
import Header from '../../public_component/Header';
import Footer from '../../public_component/Footer';
import Product from './Product';
import PaginationBar from '../../public_component/PaginationBar';
const ProductList = () => {
  const [pageNow, setPageNow] = useState(1);
  return (
    <>
      <Header />
      <div className="product">
        <ProductRank />
        <div className="d-flex mt-5 ">
          <ProductCategory />
          <div>
            <ProductFilter />
            <Product />
          </div>
        </div>
        <PaginationBar lastPage={8} pageNow={pageNow} setPageNow={setPageNow} />
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
