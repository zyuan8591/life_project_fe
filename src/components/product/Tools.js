import React, { useEffect } from 'react';
import { useState } from 'react';
import classess from '../../styles/product/tools.module.scss';
import { IconContext } from 'react-icons';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosArrowUp } from 'react-icons/io';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { FaTrashAlt, FaHeartBroken } from 'react-icons/fa';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../utils/config';
import { useProductCart } from '../../orderContetxt/useProductCart';
import { Link } from 'react-router-dom';

const Tools = ({ item, setItem, setProductLikeId, productLikeId }) => {
  const [cart, setCart] = useState(false);
  const [point, setPoint] = useState(false);
  const [heart, setHeart] = useState(false);
  const productCart = useProductCart({});
  return (
    <>
      <div
        className={classess.tool}
        style={{
          transform: cart ? 'translateX(-300px)' : 'translateX(0px)',
          opacity: cart ? '1' : '',
        }}
      >
        <IconContext.Provider value={{ size: '2rem' }}>
          <HiOutlineHeart
            onClick={() => {
              setHeart(!heart);
            }}
          />
          <IoCartOutline
            onClick={() => {
              setCart(true);
            }}
          />
          <AiOutlineCreditCard
            onMouseOver={() => {
              setPoint(true);
            }}
            onMouseOut={() => {
              setPoint(false);
            }}
          />
          <IoIosArrowUp onClick={() => window.scrollTo({ top: 0 })} />
        </IconContext.Provider>
      </div>
      <div
        style={{ display: cart ? 'block' : '' }}
        className={classess.cartContainer}
        onClick={() => {
          setCart(false);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            setCart(false);
          }
          console.log(e);
        }}
      ></div>
      <div
        style={{ transform: cart ? 'translateX(0px)' : 'translateX(300px)' }}
        className={classess.cart}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            setCart(false);
          }
        }}
      >
        <div className={classess.cartTitle}>購物車</div>
        {productCart.state.items.map((v, i) => {
          const { id, name, quantity, price, img } = v;

          return (
            <div className={classess.cartItem} key={i}>
              <figure>
                <img src={`${API_URL_IMG}/product/product_img/${img}`} alt="" />
              </figure>
              <div className={classess.cartInfo}>
                <p>{name}</p>
                <p></p>
                <p>
                  {quantity} x NT${price}
                </p>
              </div>
              <div
                className={classess.trash}
                onClick={(e) => {
                  productCart.removeItem(id);
                }}
              >
                <IconContext.Provider value={{ color: '#777', size: '1.2rem' }}>
                  <FaTrashAlt />
                </IconContext.Provider>
              </div>
            </div>
          );
        })}
        {productCart.state.items.length > 0 ? (
          <Link to={`/orderstep/cart`} className={classess.checkout}>
            前往結帳
          </Link>
        ) : (
          <div className={classess.nothingInCart}>沒有商品在購物車</div>
        )}
      </div>
      {point && (
        <div
          className={classess.point}
          style={{
            transform: cart ? 'translateX(-300px)' : 'translateX(0px)',
          }}
        >
          <p>點數 : 27 </p>
          {/* <p> 一點折一元</p>
          <p>每200元能獲得一點</p> */}
          <div className={classess.triangle}></div>
        </div>
      )}
      {heart && (
        <div className={classess.favContainer}>
          <div
            className={classess.fav}
            style={{
              transform: cart ? 'translateX(-300px)' : 'translateX(0px)',
            }}
          >
            {item.map((v, i) => {
              const { name, color, img, product_id } = v;
              return (
                <div
                  className={classess.item}
                  onClick={async () => {
                    await axios.delete(
                      `${API_URL}/products/${product_id}/removeLike`,
                      {
                        withCredentials: true,
                      }
                    );
                    setProductLikeId(!productLikeId);
                  }}
                >
                  <>
                    <figure>
                      <img
                        src={`${API_URL_IMG}/product/product_img/${img}`}
                        alt=""
                      />
                      <div className={classess.heart}>
                        <IconContext.Provider
                          value={{ color: '#444', size: '2.4rem' }}
                        >
                          <FaHeartBroken />
                        </IconContext.Provider>
                      </div>
                    </figure>
                    <p>
                      {name}　({color})
                    </p>
                  </>
                </div>
              );
            })}
            {item.length === 0 && (
              <div className={classess.nothingInFav}>沒有商品在我的最愛</div>
            )}
          </div>
          <div
            className={classess.triangle}
            style={{
              transform: cart
                ? 'translateX(-300px) rotate(45deg)'
                : 'translateX(0px) rotate(45deg)',
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Tools;
