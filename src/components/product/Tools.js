import React from 'react';
import { useState } from 'react';
import classess from '../../styles/product/tools.module.scss';
import { IconContext } from 'react-icons';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosArrowUp } from 'react-icons/io';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
const img = '/img/product/product_img/BRUNO_BOE021_BGY_01.jpeg';
const img1 = '/img/product/product_img/BRUNO_BOE021_01.jpeg';
const img2 = '/img/product/product_img/BRUNO_BOE021_WH_01.webp';

const Tools = () => {
  const [cart, setCart] = useState(false);
  const arr = [
    {
      id: 0,
      name: 'BOE021 多功能電烤盤-經典款',
      color: '粉綠色',
      count: 2,
      price: 4690,
      img: img,
    },
    {
      id: 1,
      name: 'BOE021 多功能電烤盤-經典款',
      color: '粉色',
      count: 1,
      price: 4690,
      img: img1,
    },
    {
      id: 2,
      name: 'BOE021 多功能電烤盤-經典款',
      color: '白色',
      count: 7,
      price: 4690,
      img: img2,
    },
    {
      id: 3,
      name: 'BOE021 多功能電烤盤-經典款',
      color: '白色',
      count: 7,
      price: 4690,
      img: img2,
    },
    {
      id: 4,
      name: 'BOE021 多功能電烤盤-經典款',
      color: '白色',
      count: 7,
      price: 4690,
      img: img2,
    },
  ];
  const [item, setItem] = useState(arr);
  const [point, setPoint] = useState(false);
  const [heart, setHeart] = useState(false);
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
        {item.map((v, i) => {
          const { id, name, color, count, price, img } = v;
          return (
            <div className={classess.cartItem} key={i}>
              <figure>
                <img src={img} alt="" />
              </figure>
              <div className={classess.cartInfo}>
                <p>{name}</p>
                <p>{color}</p>
                <p>
                  {count} x NT${price}
                </p>
              </div>
              <div
                className={classess.trash}
                onClick={(e) => {
                  let newArr = item.filter((v2, i2) => {
                    return id !== v2.id;
                  });
                  setItem(newArr);
                }}
              >
                <IconContext.Provider value={{ color: '#777', size: '1.2rem' }}>
                  <FaTrashAlt />
                </IconContext.Provider>
              </div>
            </div>
          );
        })}
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
              const { id, name, color, img } = v;
              {
                /* console.log(item); */
              }
              return (
                <div
                  className={classess.item}
                  onClick={(e) => {
                    let newArr = item.filter((v2, i2) => {
                      return id !== v2.id;
                    });
                    setItem(newArr);
                  }}
                >
                  <>
                    <figure>
                      <img src={img} alt="" />
                      <div className={classess.heart}>
                        <IconContext.Provider
                          value={{ color: 'white', size: '2.4rem' }}
                        >
                          <HiHeart />
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
