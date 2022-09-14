import React from 'react';
import '../../../../styles/Order/orderList.scss';
import { IconContext } from 'react-icons';
import { TbTrash } from 'react-icons/tb';
import { useState } from 'react';

const OrderList = (props) => {
  const [count, setCount] = useState(1);
  return (
    <>
      <h2 className="h1 ps-3 pb-2">商品</h2>

      <div className="orderList">
        <div className="row orderListTitle gap-3">
          <div className="col">
            <input type="checkbox" />
          </div>
          <div className="col">圖片</div>
          <div className="col">名稱</div>
          <div className="col">單價</div>
          <div className="col">數量</div>
          <div className="col">總價</div>
          <div className="col">移除</div>
        </div>

        <div className="orderItemList">
          <div className="row orderItem gap-3">
            <div className="col">
              <input type="checkbox" />
            </div>
            <div className="col">
              <img
                alt=""
                src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
              />
            </div>
            <div className="col">Moomin 多功能電烤盤1111111</div>
            <div className="col">$ 666</div>
            <div className="col">
              <div className="counter">
                <button className="counterButton">-</button>
                <div className="counterContent">
                  <input type="text" className="counterInput" value={count} />
                </div>

                <button
                  className="counterButton"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col">$ 666</div>
            <div className="col">
              <IconContext.Provider value={{ color: 'black', size: '2rem' }}>
                <TbTrash />
              </IconContext.Provider>
            </div>
          </div>
          <div className="row orderItem gap-3">
            <div className="col">
              <input type="checkbox" />
            </div>
            <div className="col">
              <img
                alt=""
                src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
              />
            </div>
            <div className="col">Moomin 多功能電烤盤1111111</div>
            <div className="col">$ 666</div>
            <div className="col">
              <div className="counter">
                <button className="counterButton">-</button>
                <div className="counterContent">
                  <input type="text" className="counterInput" value={1} />
                </div>

                <button className="counterButton">+</button>
              </div>
            </div>
            <div className="col">$ 666</div>
            <div className="col">
              <IconContext.Provider value={{ color: 'black', size: '2rem' }}>
                <TbTrash />
              </IconContext.Provider>
            </div>
          </div>
        </div>

        <div className="row orderListInfo">
          <div className="col position-relative">
            共 1 項商品
            <div className="col subTotal">小計： $ 666元</div>
          </div>
        </div>
      </div>

      <h2 className="h1 ps-3 pb-2">活動</h2>
      <div className="row orderList">
        <div className="row orderListTitle gap-3">
          <div className="col">
            <input type="checkbox" />
          </div>
          <div className="col">圖片</div>
          <div className="col">名稱</div>
          <div className="col">單價</div>
          <div className="col">數量</div>
          <div className="col">總價</div>
          <div className="col">移除</div>
        </div>

        <div className="orderItemList">
          <div className="row orderItem gap-3">
            <div className="col">
              <input type="checkbox" />
            </div>
            <div className="col">
              <img
                alt=""
                src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
              />
            </div>
            <div className="col">Moomin 多功能電烤盤1111111</div>
            <div className="col">$ 666</div>
            <div className="col">1</div>
            <div className="col">$ 666</div>
            <div className="col">
              <IconContext.Provider value={{ color: 'black', size: '2rem' }}>
                <TbTrash />
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="row orderListInfo">
          <div className="col position-relative">
            共 1 項商品
            <div className="col subTotal">小計： $ 666元</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
