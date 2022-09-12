import React from 'react';
import { useState } from 'react';
import classess from '../../styles/product/tools.module.scss';
import { IconContext } from 'react-icons';
import { HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosArrowUp } from 'react-icons/io';
import { GoGift } from 'react-icons/go';

const Tools = () => {
  const [cart, setCart] = useState(false);
  const Exit = (e) => {
    console.log(e.keyCode);
  };
  return (
    <>
      <div className={classess.tool}>
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
          //   setCart(false);
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
          //   if (e.keyCode === 27) {
          //     setCart(false);
          //   }
          Exit();
        }}
      ></div>
    </>
  );
};

export default Tools;
