import React from 'react';
import { useState } from 'react';
import '../../../styles/product/_productInfo.scss';
import { IconContext } from 'react-icons';
import { HiOutlineHeart } from 'react-icons/hi';
import { IoCartOutline } from 'react-icons/io5';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Magnifier from 'image-magnifier-react';
import 'image-magnifier-react/lib/index.css';

const pic = '/img/product/product_img/BRUNO_BOE059_BGR_CE_01.png';
const pic1 = '/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp';
const pic2 = '/img/product/product_img/BRUNO_BOE059_BGR_CE_02.jpeg';
const pic3 = '/img/product/product_img/BRUNO_BOE059_BGR_CE_03.jpeg';
const string =
  '耐高溫不沾塗層烤盤 導熱快、清洗方便 兩用木匙，取出烤盤不燙手 分離式電源，方便使用好收納 牛排或章魚燒皆適合';
let split = string.split(' ');
const ProductInfo = () => {
  const Arr = [pic1, pic2, pic3];
  const [quantity, setQuantity] = useState(1);
  const [mainPhoto, setMainPic] = useState(pic);
  return (
    <div className="infoContainer">
      <div className="productInfo">
        <div className="picArea">
          {/* <Magnifier
            image={mainPhoto}
            magnifierWidth={150}
            magnifierHeight={150}
            zoom={2}
            width={400}
          /> */}
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
            {Arr.map((v, i) => {
              return (
                <figure
                  className="subPic"
                  key={i}
                  onMouseOver={() => {
                    setMainPic(v);
                  }}
                >
                  <img src={v} alt="" />
                </figure>
              );
            })}
          </div>
        </div>
        <div className="infoArea">
          <div className="brand">Bruno</div>
          <div className="name">多功能電烤盤-嚕嚕咪限量版</div>
          <div className="promotion">宅配滿NT$888免運</div>
          <div className="test">
            <div className="price">NT$ 4,580</div>
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
                  }}
                >
                  <IoCartOutline />
                </button>
                <button>
                  <HiOutlineHeart />
                </button>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
