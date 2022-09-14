import React from 'react';
import { useState, useEffect } from 'react';
import ProductRank from './ProductRank';
import ProductCategory from './ProductCategory';
import ProductFilter from './ProductFilter';
// import productClass from '../../../styles/productList.module.scss';
import '../../../styles/product/_productList.scss';
import Header from '../../public_component/Header';
import Footer from '../../public_component/Footer';
import Product from './Product';
import PaginationBar from '../../public_component/PaginationBar';
import Tools from '../Tools';
import { API_URL } from '../../../utils/config';
import axios from 'axios';
const ProductList = () => {
  const [pageNow, setPageNow] = useState(1);
  // const [productList, setProductList] = useState([]);
  // const [productCate, setProductCate] = useState([]);

  // const getProductData = async (url = '') => {
  //   let result = await axios.get(`${API_URL}/products${url}`);
  //   let data = result.data;
  //   return data;
  // };
  // useEffect(() => {
  //   (async () => {
  //     let productCateResult = await axios.get(`${API_URL}/products/category`);
  //     let productCateData = productCateResult.data;
  //     setProductCate(productCateData);
  //     let productListData = await getProductData();
  //     // let productListResult = await axios.get(`${API_URL}/products`);
  //     // let productListData = productListResult.data;
  //     console.log(productListData);
  //     setProductList(productListData);
  //   })();
  // }, []);
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
        <Tools />
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
