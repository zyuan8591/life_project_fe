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
import ToolsRwd from '../ToolsRwd';
import NoDataDisplay from '../../public_component/NoDataDisplay';
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
  const [perPage, setPerPage] = useState(12);
  // like data
  const [item, setItem] = useState([]);
  const [fav, setFav] = useState([]);
  const [productLikeId, setProductLikeId] = useState(false);

  // toast
  const [collectConfirm, setCollectConfirm] = useState(false);
  const [collectCancel, setCollectCancel] = useState(false);
  const [cartConfirm, setCartConfirm] = useState(false);

  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/products?perPage=${perPage}&page=${pageNow}&productCate=${productCateNow}&productName=${search}&smallThan=${smallThan}&biggerThan=${biggerThan}&sort=${sort}&brand=${checked}`
      );

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
      setLastPage(result.data.pagination.lastPage);
      setTotal(result.data.pagination.total);
      setProductList(result.data.data);
      setCount(result.data.pagination.offset);
      (async () => {
        let result = await axios.get(`${API_URL}/products/like`, {
          withCredentials: true,
        });
        setItem(result.data);
        let favNumber = result.data.map((v) => v.product_id);
        setFav(favNumber);
      })();
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
    productLikeId,
    perPage,
  ]);
  useEffect(() => {
    setPageNow(1);
    setPerPage(12);
  }, [productCateNow, search, checked]);

  return (
    <>
      <Header />
      <div className="product">
        <ProductRank />
        <div className="d-flex mt-sm-5 mt-3 ">
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
            {total !== 0 ? (
              <Product
                productList={productList}
                item={item}
                fav={fav}
                setProductLikeId={setProductLikeId}
                productLikeId={productLikeId}
                setCollectConfirm={setCollectConfirm}
                collectConfirm={collectConfirm}
                setCollectCancel={setCollectCancel}
                collectCancel={collectCancel}
                setCartConfirm={setCartConfirm}
                cartConfirm={cartConfirm}
              />
            ) : (
              <NoDataDisplay />
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <PaginationBar
            lastPage={lastPage}
            pageNow={pageNow}
            setPageNow={setPageNow}
            perPage={perPage}
            setPerPage={setPerPage}
            moreText={'商品'}
          />
        </div>
        <Tools
          item={item}
          setItem={setItem}
          setProductLikeId={setProductLikeId}
          productLikeId={productLikeId}
        />
        <ToolsRwd
          setProductCateNow={setProductCateNow}
          checked={checked}
          setChecked={setChecked}
          setBiggerThan={setBiggerThan}
          setSmallThan={setSmallThan}
          total={total}
        />
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
