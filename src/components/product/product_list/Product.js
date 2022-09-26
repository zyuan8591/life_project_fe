import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/product/_product.scss';
import { IconContext } from 'react-icons';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';
import { API_URL } from '../../../utils/config';
import axios from 'axios';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { API_URL_IMG } from '../../../utils/config';
import Notification from '../../activity/Notification';
import { useUserRights } from '../../../usecontext/UserRights';

const Product = ({
  item,
  productList,
  fav,
  setProductLikeId,
  productLikeId,
  setCollectConfirm,
  setCollectCancel,
  collectCancel,
  collectConfirm,
  cartConfirm,
  setCartConfirm,
}) => {
  const productCart = useProductCart({});
  const cart = productCart.state.items.map((v) => {
    return v.id;
  });
  const [changePic, setChangePic] = useState(false);
  const [changePicNumber, setChangePicNumber] = useState('');
  const [loginBtn, setLoginBtn] = useState(false);
  const { user } = useUserRights();

  return (
    <div className="productContainer">
      {productList.map((v, i) => {
        const { id, name, price, brand, img, color, img2, inventory } = v;
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
            {cartConfirm ? (
              <Notification
                contaninText={'已加入購物車'}
                setLoginBtn={setLoginBtn}
              >
                <HiHeart />
              </Notification>
            ) : (
              ''
            )}
            {collectConfirm ? (
              <Notification
                contaninText={'已加入收藏'}
                setLoginBtn={setLoginBtn}
              >
                <HiHeart />
              </Notification>
            ) : (
              ''
            )}
            {collectCancel ? (
              <Notification
                contaninText={'已取消收藏'}
                setLoginBtn={setLoginBtn}
              >
                <HiOutlineHeart />
              </Notification>
            ) : (
              ''
            )}
            {loginBtn ? (
              <Notification
                contaninText={'請先登入會員'}
                linkTo={'/signin/login'}
                setLoginBtn={setLoginBtn}
              />
            ) : (
              ''
            )}

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
                    color: 'white',
                    size: '2rem',
                    margin: '5px',
                  }}
                >
                  {user ? (
                    <div
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
                            color: 'red',
                            size: '2rem',
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
                    <HiOutlineHeart
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setLoginBtn(true);
                      }}
                    />
                  )}

                  <div style={{ cursor: 'pointer' }}>
                    {cart.includes(id) ? (
                      <IconContext.Provider
                        value={{
                          color: '#F2AC33 ',
                          size: '2rem',
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
                    )}
                  </div>
                </IconContext.Provider>
              </div>
            </div>
            <Link to={`/products/${id}`} className="link">
              <div
                className="hoverArea "
                onClick={(e) => {
                  console.log('h');
                }}
              >
                <div className="productImg">
                  <img
                    style={{
                      opacity: changePic && changePicNumber === id ? 0 : 1,
                    }}
                    src={`${API_URL_IMG}/product/product_img/${img}`}
                    alt=""
                  />
                  <img
                    className="pic2"
                    style={{
                      opacity: changePic && changePicNumber === id ? 1 : 0,
                    }}
                    src={`${API_URL_IMG}/product/product_img/${img2}`}
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
  );
};

export default Product;
