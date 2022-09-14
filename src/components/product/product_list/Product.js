import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/product/_product.scss';
import { IconContext } from 'react-icons';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';
// import { API_URL } from '../../../utils/config';
// import axios from 'axios';

const Product = (props) => {
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
  console.log('ppppppppppp', props);
  //     setProductList(productListData);
  //   })();
  // }, []);
  return (
    // <div className="productContainer">
    //   {productList.map((v, i) => {
    //     return (
    //       <div className="products" key={i}>
    //         <Link
    //           to="/products/:id"
    //           className="hoverArea "
    //           onMouseOver={(e) => {
    //             e.target.src = `/img/product/product_img/${v.img2}`;
    //           }}
    //           onMouseOut={(e) => {
    //             e.target.src = `/img/product/product_img/${v.img}`;
    //           }}
    //         >
    //           <div className="productImg">
    //             <div className="productHover">
    //               <IconContext.Provider
    //                 value={{
    //                   color: 'white',
    //                   size: '2rem',
    //                   margin: '5px',
    //                 }}
    //               >
    //                 <HiOutlineHeart
    //                   onClick={() => {
    //                     console.log('h');
    //                   }}
    //                 />
    //                 <IoCartOutline
    //                   onClick={() => {
    //                     console.log('c');
    //                   }}
    //                 />
    //               </IconContext.Provider>
    //             </div>
    //             <img src={`/img/product/product_img/${v.img}`} alt="" />
    //           </div>
    //         </Link>
    //         <div className="nameArea">
    //           <p className="name">{v.name}</p>
    //           <p className="color">{v.color}</p>
    //         </div>
    //         <div className="brandArea">
    //           <p className="brand">{v.brand}</p>
    //           <p className="price">NT$ {v.price}</p>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    <></>
  );
};

export default Product;
