import React from 'react';
import '../styles/orderList.scss';
import { IconContext } from 'react-icons';
import { TbTrash } from 'react-icons/tb';
const OrderList = (props) => {
  return (
    <>
      <h2 className="h1 ps-3 pb-2">商品</h2>
      <div className="row orderList">
        <div className="row listTitle">
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

        <div className="row orderItem">
          <div className="col">
            <input type="checkbox" />
          </div>
          <div className="col">
            <img
              alt=""
              src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
              className="objectContain"
            />
          </div>
          <div className="col">Moomin 多功能電烤盤1111111</div>
          <div className="col">$ 666</div>
          <div className="col">
            <div class="counter">
              <button class="counterButton">-</button>

              <div class="counterContent">
                <input type="text" class="counterInput" value={1} />
              </div>

              <button class="counterButton">+</button>
            </div>
          </div>
          <div className="col">$ 666</div>
          <div className="col">
            <IconContext.Provider value={{ color: 'black', size: '2rem' }}>
              <TbTrash />
            </IconContext.Provider>
          </div>
        </div>
        <div className="row orderItem">
          <div className="col">
            <input type="checkbox" />
          </div>
          <div className="col">
            <img
              alt=""
              src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
              className="objectContain"
            />
          </div>
          <div className="col">Moomin 多功能電烤盤1111111</div>
          <div className="col">$ 666</div>
          <div className="col">
            <div class="counter">
              <button class="counterButton">-</button>

              <div class="counterContent">
                <input type="text" class="counterInput" value={1} />
              </div>

              <button class="counterButton">+</button>
            </div>
          </div>
          <div className="col">$ 666</div>
          <div className="col">
            <IconContext.Provider value={{ color: 'black', size: '2rem' }}>
              <TbTrash />
            </IconContext.Provider>
          </div>
        </div>
        <div className="row listInfo">
          <div className="col position-relative">
            共 1 項商品
            <div className="col fix">小計： $ 666元</div>
          </div>
        </div>
      </div>

      <h2 className="h1 ps-3 pb-2">活動</h2>
      <div className="row orderList">
        <div className="row listTitle">
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

        <div className="row orderItem">
          <div className="col">
            <input type="checkbox" />
          </div>
          <div className="col">
            <img
              alt=""
              src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
              className="objectContain"
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
        <div className="row listInfo">
          <div className="col position-relative">
            共 1 項商品
            <div className="col fix">小計： $ 666元</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
