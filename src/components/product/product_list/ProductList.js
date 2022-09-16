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
  const [lastPage, setLastPage] = useState(0);
  const [count, setCount] = useState(0);
  const [productCateNow, setProductCateNow] = useState(0);
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/products?perPage=12&page=${pageNow}&productCate=${productCateNow}&productName=${search}&brand=${checked}`
      );
      // console.log(result.data.data);
      console.log(checked);
      setLastPage(result.data.pagination.lastPage);
      setCount(result.data.pagination.total);
      setProductList(result.data.data);
    })();
  }, [pageNow, productCateNow, search, checked]);
  return (
    <>
      <Header />
      <div className="product">
        <ProductRank />
        <div className="d-flex mt-5 ">
          <ProductCategory setProductCateNow={setProductCateNow} />
          <div>
            <ProductFilter
              count={count}
              search={search}
              setSearch={setSearch}
              checked={checked}
              setChecked={setChecked}
            />
            <Product productList={productList} />
          </div>
        </div>
        <PaginationBar
          lastPage={lastPage}
          pageNow={pageNow}
          setPageNow={setPageNow}
        />
        <Tools />
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
