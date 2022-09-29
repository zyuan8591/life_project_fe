import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/product/_product.scss';
import { IconContext } from 'react-icons';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';
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
  const [discount, setDiscount] = useState();
  const [discountPriceArr, setDiscountPriceArr] = useState([]);
  const [discountPrice, setDiscountPrice] = useState('');

  useEffect(() => {
    let priceMap = productList.map((v, i) => {
      setDiscount(v.discount);
      if (!discount) {
        return v.price;
      }
      if (discount < 10 && discount > 0) {
        return parseInt(v.price * (discount / 10));
      }
      if (discount > 10 && discount < 100) {
        return parseInt(v.price * (discount / 100));
      }
    });
    setDiscountPriceArr(priceMap);
    console.log('discountPrice', discountPrice);
  }, [productList, discount]);
  return (
    <>
      <div className="productContainer">
        {productList.map((v, i) => {
          const {
            id,
            name,
            price,
            brand,
            img,
            color,
            inventory,
            discount,
            start_time,
            end_time,
          } = v;
          const deadline = new Date(end_time).getTime();
          const startline = new Date(start_time).getTime();
          let discountedPrice;
          if (!discount) discountedPrice = price;
          if (discount < 10 && discount > 0) {
            discountedPrice = parseInt(price * (discount / 10));
          }
          if (discount > 10 && discount < 100) {
            discountedPrice = parseInt(price * (discount / 100));
          }
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
                              if (
                                discount &&
                                startline < new Date().getTime() &&
                                deadline > new Date().getTime()
                              ) {
                                productCart.addItem({
                                  id: id,
                                  quantity: 1,
                                  name: name,
                                  price: discountedPrice,
                                  ischecked: false,
                                  img: img,
                                  inventory: inventory,
                                });
                              } else {
                                productCart.addItem({
                                  id: id,
                                  quantity: 1,
                                  name: name,
                                  price: price,
                                  ischecked: false,
                                  img: img,
                                  inventory: inventory,
                                });
                              }

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
                              if (
                                discount &&
                                startline < new Date().getTime() &&
                                deadline > new Date().getTime()
                              ) {
                                productCart.addItem({
                                  id: id,
                                  quantity: 1,
                                  name: name,
                                  price: discountedPrice,
                                  ischecked: false,
                                  img: img,
                                  inventory: inventory,
                                });
                              } else {
                                productCart.addItem({
                                  id: id,
                                  quantity: 1,
                                  name: name,
                                  price: price,
                                  ischecked: false,
                                  img: img,
                                  inventory: inventory,
                                });
                              }
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
                <div className="hoverArea ">
                  {startline < new Date().getTime() &&
                  deadline > new Date().getTime() ? (
                    <div className="discount">
                      <p>sales</p>
                    </div>
                  ) : (
                    ''
                  )}

                  <div className="productImg">
                    <img
                      src={`${API_URL_IMG}/product/product_img/${img}`}
                      alt=""
                    />
                  </div>
                </div>
              </Link>
              <div className="nameArea">
                <p className="name">{name}</p>
                <p className="color">{color}</p>
              </div>
              <div className="brandArea">
                <div className="d-flex align-items-center">
                  <p className="brand">{brand}</p>
                  <p className="discountRwd">{discount}折</p>
                </div>
                {discount &&
                startline < new Date().getTime() &&
                deadline > new Date().getTime() ? (
                  <>
                    <p>
                      NT${' '}
                      {discountedPrice
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                  </>
                ) : (
                  <p className="price">
                    NT${' '}
                    {price
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                )}
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
