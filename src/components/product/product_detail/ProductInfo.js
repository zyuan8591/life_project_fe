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

const ProductInfo = ({ data, item, fav, setProductLikeId, productLikeId }) => {
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
  const pic = `/img/product/product_img/${img}`;

  const arr = [img, img2, img3];
  const newArr = arr.filter((v) => {
    return v !== '';
  });
  const [quantity, setQuantity] = useState(1);
  const [mainPhoto, setMainPic] = useState('');
  console.log();
  useEffect(() => {
    setMainPic(pic);
  }, [data]);
  return (
    <div className="infoContainer">
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
                    setMainPic(`/img/product/product_img/${v}`);
                  }}
                >
                  <img src={`/img/product/product_img/${v}`} alt="" />
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
                  }}
                >
                  <IoCartOutline />
                </button>
                <button
                  onClick={async () => {
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
                      <HiHeart />
                    </IconContext.Provider>
                  ) : (
                    <HiOutlineHeart />
                  )}
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
