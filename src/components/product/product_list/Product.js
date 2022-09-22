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
import Notification from '../../activity/Notification';
import { API_URL_IMG } from '../../../utils/config';


const Product = ({ productList, fav, setProductLikeId, productLikeId }) => {
  const productCart = useProductCart({});
  const cart = productCart.state.items.map((v) => {
    return v.id;
  });
  const [changePic, setChangePic] = useState(false);
  const [changePicNumber, setChangePicNumber] = useState('');
  return (
    <div className="productContainer">
      {/* <Notification contaninText="收藏成功">
        <HiHeart />
      </Notification> */}
      {productList.map((v, i) => {
        const { id, name, price, brand, img, color, img2 } = v;
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
            {' '}
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
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={async () => {
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
                        <HiHeart />
                      </IconContext.Provider>
                    ) : (
                      <HiOutlineHeart />
                    )}
                  </div>
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
                            });
                            console.log(productCart.state.items);
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
                          });
                          console.log(productCart.state.items);
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
