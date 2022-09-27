import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/product/_product.scss';
import { IconContext } from 'react-icons';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';
import { TbDiscount2 } from 'react-icons/tb';
import { API_URL } from '../../../utils/config';
import axios from 'axios';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { API_URL_IMG } from '../../../utils/config';
import { useUserRights } from '../../../usecontext/UserRights';
import PaginationBar from '../../public_component/PaginationBar';

const Product = ({
  productList,
  fav,
  setProductLikeId,
  productLikeId,
  setCollectConfirm,
  setCollectCancel,
  setCartConfirm,
  setLoginBtn,
  lastPage,
  pageNow,
  setPageNow,
  perPage,
  setPerPage,
}) => {
  const productCart = useProductCart({});
  const cart = productCart.state.items.map((v) => {
    return v.id;
  });
  const [changePic, setChangePic] = useState(false);
  const [changePicNumber, setChangePicNumber] = useState('');
  const { user } = useUserRights();

  return (
    <>
      <div className="productContainer">
        {productList.map((v, i) => {
          const { id, name, price, brand, img, color, inventory, discount } = v;
          return (
            <div
              className="products"
              key={i}
              onMouseOver={() => {
                setChangePic(true);
                setChangePicNumber(id);
              }}
              onMouseOut={(e) => {
                setChangePic(false);
              }}
            >
              <div
                className="productHoverContainer"
                onMouseOver={() => {
                  setChangePic(true);
                  setChangePicNumber(id);
                }}
                onMouseOut={(e) => {
                  setChangePic(false);
                }}
              >
                <div className="productHover">
                  <IconContext.Provider
                    value={{
                      color: '#444',
                      size: '1.8rem',
                      margin: '5px',
                    }}
                  >
                    {user ? (
                      <div
                        className="heart"
                        style={{ cursor: 'pointer' }}
                        onClick={async () => {
                          setCollectConfirm(true);
                          setTimeout(() => {
                            setCollectConfirm(false);
                          }, 1200);
                          if (fav.includes(v.id)) {
                            await axios.delete(
                              `${API_URL}/products/${id}/removeLike`,
                              { withCredentials: true }
                            );
                            setProductLikeId(!productLikeId);
                          } else {
                            await axios.post(
                              `${API_URL}/products/addLike`,
                              { id },
                              { withCredentials: true }
                            );
                            setProductLikeId(!productLikeId);
                          }
                        }}
                      >
                        {fav.includes(v.id) ? (
                          <IconContext.Provider
                            value={{
                              color: '#444',
                              size: '1.8rem',
                              margin: '5px',
                            }}
                          >
                            <HiHeart
                              onClick={() => {
                                setCollectCancel(true);
                                setTimeout(() => {
                                  setCollectCancel(false);
                                }, 1200);
                              }}
                            />
                          </IconContext.Provider>
                        ) : (
                          <HiOutlineHeart />
                        )}
                      </div>
                    ) : (
                      <div className="heart">
                        <HiOutlineHeart
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setLoginBtn(true);
                          }}
                        />
                      </div>
                    )}

                    <div style={{ cursor: 'pointer' }} className="me-1 heart">
                      {cart.includes(id) ? (
                        <IconContext.Provider
                          value={{
                            color: '#444 ',
                            size: '1.8rem',
                            margin: '5px',
                          }}
                        >
                          <IoCartSharp
                            onClick={(e) => {
                              // console.log(id, name)
                              productCart.addItem({
                                id: id,
                                quantity: 1,
                                name: name,
                                price: price,
                                ischecked: false,
                                img: img,
                                inventory: inventory,
                              });
                              setCartConfirm(true);
                              setTimeout(() => {
                                setCartConfirm(false);
                              }, 1200);
                            }}
                          />
                        </IconContext.Provider>
                      ) : (
                        <div className="heart">
                          <IoCartOutline
                            onClick={(e) => {
                              // console.log(id, name)
                              productCart.addItem({
                                id: id,
                                quantity: 1,
                                name: name,
                                price: price,
                                ischecked: false,
                                img: img,
                                inventory: inventory,
                              });
                              setCartConfirm(true);
                              setTimeout(() => {
                                setCartConfirm(false);
                              }, 1200);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
              <Link to={`/products/${id}`} className="link">
                <div
                  className="hoverArea "
                  onClick={(e) => {
                    // console.log('h');
                  }}
                >
                  <div className="discount">
                    {/* <IconContext.Provider
                      value={{
                        color: '#1F9998 ',
                        size: '2.4rem',
                      }}
                    >
                      <TbDiscount2 />
                    </IconContext.Provider> */}
                    {/* 88折 */}
                    {/* sale */}
                    {/* discount */}
                    <img
                      src={`${API_URL_IMG}/product/product_icon/sale-tag (1).png`}
                      alt=""
                    />
                  </div>
                  <div className="productImg">
                    <img
                      style={
                        {
                          // opacity: changePic && changePicNumber === id ? 0 : 1,
                        }
                      }
                      src={`${API_URL_IMG}/product/product_key_effect/${img}`}
                      alt=""
                    />
                    {/* <img
                    className="pic2"
                    style={{
                      // opacity: changePic && changePicNumber === id ? 1 : 0,
                    }}
                    src={`${API_URL_IMG}/product/product_img/${img2}`}
                    alt=""
                  /> */}
                  </div>
                </div>
              </Link>
              <div className="nameArea">
                <p className="name">{name}</p>
                <p className="color">{color}</p>
              </div>
              <div className="brandArea">
                <p className="brand">{brand}</p>
                <p className="price">
                  NT${' '}
                  {price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </p>
              </div>
            </div>
          );
        })}
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
    </>
  );
};

export default Product;
