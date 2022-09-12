import React from 'react';
import { useState } from 'react';
import classess from '../../styles/product/tools.module.scss';
import { IconContext } from 'react-icons';
import { HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosArrowUp } from 'react-icons/io';
import { GoGift } from 'react-icons/go';
import { FaTrashAlt } from 'react-icons/fa';
const img = '/img/product/product_img/BRUNO_BOE021_BGY_01.jpeg';

const Tools = () => {
  const [cart, setCart] = useState(true);
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
          <HiOutlineHeart />
          <IoCartOutline
            onClick={() => {
              setCart(true);
            }}
          />
          <GoGift />
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
        {[...Array(3)].map((v, i) => {
          return (
            <div className={classess.cartItem} key={i}>
              <figure>
                <img src={img} alt="" />
              </figure>
              <div className={classess.cartInfo}>
                <p>BOE021 多功能電烤盤-經典款</p>
                <p>粉綠色</p>
                <p>1 x NT$4960</p>
              </div>
              <div className={classess.trash} onClick={() => {}}>
                <IconContext.Provider value={{ color: '#777', size: '1.2rem' }}>
                  <FaTrashAlt />
                </IconContext.Provider>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tools;
