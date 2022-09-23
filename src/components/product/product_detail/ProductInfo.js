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
  } = data;
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

  console.log();
  useEffect(() => {
    setMainPic(pic);
  }, [data]);

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
      <div className='breadCrumb'>
        <BreadCrumb />
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
          <div className="brand">{brand}</div>
          <div className="name">{name}</div>
          <div className="promotion">宅配滿NT$888免運</div>
          <div>
            <div className="price">
              NT${' '}
              {JSON.stringify(price).replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ','
              )}
              {/* {JSON.stringify(price)} */}
            </div>
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
                        if (quantity < 99) {
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
                <button
                  onClick={() => {
                    console.log(quantity);
                    productCart.addItem({
                      id: id,
                      quantity: quantity,
                      name: name,
                      price: price,
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
