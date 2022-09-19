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
  const [total, setTotal] = useState(0);
  const [productCateNow, setProductCateNow] = useState(0);
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState([]);
  const [biggerThan, setBiggerThan] = useState('');
  const [smallThan, setSmallThan] = useState('');
  const [sort, setSort] = useState(0);
  const [count, setCount] = useState(0);
  const [countNow, setCountNow] = useState(0);
  // like data
  const [item, setItem] = useState([]);

  const [fav, setFav] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/products?perPage=12&page=${pageNow}&productCate=${productCateNow}&productName=${search}&smallThan=${smallThan}&biggerThan=${biggerThan}&sort=${sort}&brand=${checked}`
      );
      // console.log(result.data.data);
      // let test = pageNow * result.data.pagination.perPage;
      // console.log(pageNow, lastPage);
      if (
        result.data.pagination.total % 12 !== 0 ||
        result.data.pagination.total > 12
      ) {
        pageNow === lastPage
          ? setCountNow(result.data.pagination.total)
          : setCountNow(pageNow * result.data.pagination.perPage);
      } else if (result.data.pagination.total % 12 !== 0) {
        pageNow === lastPage
          ? setCountNow(result.data.pagination.total)
          : setCountNow(pageNow * result.data.pagination.perPage);
      } else {
        setCountNow(pageNow * result.data.pagination.perPage);
      }
      // console.log(result.data.pagination.total % 12);
      setLastPage(result.data.pagination.lastPage);
      setTotal(result.data.pagination.total);
      setProductList(result.data.data);
      setCount(result.data.pagination.offset);
      // (async () => {
      //   let result = await axios.get(`${API_URL}/products/like`, {
      //     withCredentials: true,
      //   });
      //   setItem(result.data);
      //   let favNumber = result.data.map((v) => v.product_id);
      //   setFav(favNumber);
      // })();
    })();
  }, [
    pageNow,
    productCateNow,
    search,
    checked,
    smallThan,
    biggerThan,
    sort,
    lastPage,
    // fav,
  ]);
  useEffect(() => {
    setPageNow(1);
  }, [productCateNow, search, checked]);

  // like data
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/like`, {
        withCredentials: true,
      });
      setItem(result.data);
      let favNumber = result.data.map((v) => v.product_id);
      setFav(favNumber);
    })();
  }, []);
  return (
    <>
      <Header />
      <div className="product">
        <ProductRank />
        <div className="d-flex mt-5 ">
          <ProductCategory setProductCateNow={setProductCateNow} />
          <div>
            <ProductFilter
              total={total}
              search={search}
              setSearch={setSearch}
              checked={checked}
              setChecked={setChecked}
              setBiggerThan={setBiggerThan}
              setSmallThan={setSmallThan}
              setSort={setSort}
              count={count}
              countNow={countNow}
            />
            <Product productList={productList} item={item} fav={fav} />
          </div>
        </div>
        <PaginationBar
          lastPage={lastPage}
          pageNow={pageNow}
          setPageNow={setPageNow}
        />
        <Tools item={item} setItem={setItem} />
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
