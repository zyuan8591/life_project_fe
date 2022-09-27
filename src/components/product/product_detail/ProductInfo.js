import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../styles/product/_productInfo.scss';
import { IconContext } from 'react-icons';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Magnifier from 'image-magnifier-react';
import 'image-magnifier-react/lib/index.css';
import { API_URL } from '../../../utils/config';
import axios from 'axios';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { API_URL_IMG } from '../../../utils/config';
import Notification from '../../activity/Notification';
import { useUserRights } from '../../../usecontext/UserRights';
import BreadCrumb from '../../public_component/BreadCrumb';
import { Col, Row, Statistic } from 'antd';
const { Countdown } = Statistic;
// let deadline = Date.now() + 1000 * 10;
// let startline = Date.now() + 1000 * 1;
const ProductInfo = ({ data, item, fav, setProductLikeId, productLikeId }) => {
  const productCart = useProductCart({});
  const {
    id,
    name,
    brand,
    price = '',
    img,
    img2,
    img3,
    inventory,
    intro = '',
    discount_name,
    discount,
    start_time,
    end_time,
  } = data;
  const deadline = new Date(end_time).getTime();
  const startline = new Date(start_time).getTime();

  let split = '';
  if (intro.includes(',')) {
    split = intro.split(',');
  } else if (intro.includes('，')) {
    split = intro.split('，');
  } else {
    split = intro.split(' ');
  }
  const pic = `${API_URL_IMG}/product/product_img/${img}`;

  const arr = [img, img2, img3];
  const newArr = arr.filter((v) => {
    return v !== '';
  });
  const [quantity, setQuantity] = useState(1);
  const [mainPhoto, setMainPic] = useState('');
  const [collectConfirm, setCollectConfirm] = useState(false);
  const [collectCancel, setCollectCancel] = useState(false);
  const [cartConfirm, setCartConfirm] = useState(false);
  const { user } = useUserRights();
  const [loginBtn, setLoginBtn] = useState(false);
  const [discountPrice, setDiscountPrice] = useState('');
  const [finish, setFinish] = useState(true);
  const [start, setStart] = useState(false);
  const [buyPrice, setBuyPrice] = useState(price);
  const cart = productCart.state.items.map((v) => {
    return v.id;
  });
  useEffect(() => {
    // deadline = Date.now() + 1000 * 20;
    // startline = Date.now() + 1000 * 5;
    setDiscountPrice(parseInt(price * (discount / 100)));
    setBuyPrice(discountPrice);
  }, [discountPrice]);

  useEffect(() => {
    setMainPic(pic);
    setDiscountPrice(parseInt(price * (discount / 100)));
    if (startline < new Date().getTime()) {
      setStart(true);
      setFinish(false);
      // setBuyPrice(discountPrice);
    }
    if (deadline < new Date().getTime()) {
      setFinish(true);
      setBuyPrice(price);
    }
  }, [data, start, finish]);
  const onFinish = () => {
    console.log('finished!');
    setFinish(true);
  };
  const onStart = () => {
    console.log('start!');
    setStart(true);
    setFinish(false);
  };
  return (
    <div className="infoContainer">
      {cartConfirm ? (
        <Notification contaninText={'已加入購物車'} setLoginBtn={setLoginBtn}>
          <HiHeart />
        </Notification>
      ) : (
        ''
      )}
      {collectConfirm ? (
        <Notification contaninText={'已加入收藏'} setLoginBtn={setLoginBtn}>
          <HiHeart />
        </Notification>
      ) : (
        ''
      )}
      {collectCancel ? (
        <Notification contaninText={'已取消收藏'} setLoginBtn={setLoginBtn}>
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
      <div className="breadCrumb">
        <BreadCrumb last={data.name} />
      </div>
      <div className="productInfo">
        <div className="picArea">
          <figure className="mainPic">
            <Magnifier
              image={mainPhoto}
              magnifierWidth={150}
              magnifierHeight={150}
              zoom={2}
              width={400}
              borderWidth={5}
              borderColor="rgba(255, 255, 255, 0.5)"
              boxShadow="none"
            />
          </figure>
          <div className="d-flex mt-3">
            {newArr.map((v, i) => {
              return (
                <figure
                  className="subPic"
                  key={i}
                  onMouseOver={() => {
                    setMainPic(`${API_URL_IMG}/product/product_img/${v}`);
                  }}
                >
                  <img src={`${API_URL_IMG}/product/product_img/${v}`} alt="" />
                </figure>
              );
            })}
          </div>
        </div>
        <div className="infoArea">
          <div className="brand">
            <p>{brand}</p>
            <div className="d-none">
              <Col span={12}>
                <Countdown
                  value={startline}
                  onFinish={onStart}
                  valueStyle={{ color: '#aaa', textAlign: 'end' }}
                />
              </Col>
            </div>
            {start && !finish && (
              <Col span={12}>
                <Countdown
                  value={deadline}
                  onFinish={onFinish}
                  valueStyle={{ color: '#aaa', textAlign: 'end' }}
                />
              </Col>
            )}
          </div>
          <div className="name">{name}</div>
          <div className="promotion" style={{ opacity: finish ? '0' : '1' }}>
            <p>{discount_name}</p>
          </div>
          <div>
            {finish ? (
              <div className="price" style={{ color: '#444' }}>
                NT${' '}
                {JSON.stringify(price).replace(
                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                  ','
                )}
                {/* {JSON.stringify(price)} */}
              </div>
            ) : (
              <>
                <div className="price">
                  <p className="deletePrice">
                    市售價: ${' '}
                    {JSON.stringify(price).replace(
                      /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                      ','
                    )}
                  </p>
                  NT${' '}
                  {JSON.stringify(discountPrice).replace(
                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    ','
                  )}
                </div>
              </>
            )}

            <div className="mt-5 mb-5 introContainer">
              {split.map((v, i) => {
                return (
                  <div className="intro" key={i}>
                    {v}
                  </div>
                );
              })}
            </div>
            <div className="quantity">
              <div className="d-flex ">
                <div>數量</div>
                <IconContext.Provider
                  value={{
                    color: '#444',
                    size: '1.8rem',
                  }}
                >
                  <button>
                    <AiFillMinusCircle
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                    />
                  </button>
                  <div className="number">{quantity}</div>
                  <button>
                    <AiFillPlusCircle
                      onClick={() => {
                        if (quantity < inventory) {
                          setQuantity(quantity + 1);
                        }
                      }}
                    />
                  </button>
                </IconContext.Provider>
              </div>
              <div className="inventory">剩餘數量 : {inventory}</div>
            </div>
            <div className="cartFav">
              <IconContext.Provider
                value={{
                  color: '#444',
                  size: '1.6rem',
                }}
              >
                {cart.includes(id) ? (
                  <IconContext.Provider
                    value={{
                      color: '#F2AC33 ',
                      size: '1.6rem',
                    }}
                  >
                    <button
                      onClick={() => {
                        // console.log('button buyPrice', buyPrice);
                        // console.log('button discount', discount);
                        if (
                          startline < new Date().getTime() &&
                          deadline > new Date().getTime()
                        ) {
                          setBuyPrice(discountPrice);
                        }
                        productCart.addItem({
                          id: id,
                          quantity: quantity,
                          name: name,
                          price: buyPrice,
                          ischecked: false,
                          img: img,
                        });
                        setCartConfirm(true);
                        setTimeout(() => {
                          setCartConfirm(false);
                        }, 1200);
                      }}
                    >
                      <IoCartSharp />
                    </button>
                  </IconContext.Provider>
                ) : (
                  <button
                    onClick={() => {
                      // console.log(quantity);
                      // console.log(discountPrice);
                      if (
                        startline < new Date().getTime() &&
                        deadline > new Date().getTime()
                      ) {
                        setBuyPrice(discountPrice);
                      }
                      console.log('button buyPrice', buyPrice);
                      console.log('button discountPrice', discountPrice);
                      productCart.addItem({
                        id: id,
                        quantity: quantity,
                        name: name,
                        price: buyPrice,
                        ischecked: false,
                        img: img,
                      });
                      setCartConfirm(true);
                      setTimeout(() => {
                        setCartConfirm(false);
                      }, 1200);
                    }}
                  >
                    <IoCartOutline />
                  </button>
                )}

                {user ? (
                  <button
                    onClick={async () => {
                      setCollectConfirm(true);
                      setTimeout(() => {
                        setCollectConfirm(false);
                      }, 1200);
                      if (fav.includes(id)) {
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
                    {fav.includes(id) ? (
                      <IconContext.Provider
                        value={{
                          color: 'red',
                          size: '1.6rem',
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
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setLoginBtn(true);
                    }}
                  >
                    <HiOutlineHeart />
                  </button>
                )}
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
