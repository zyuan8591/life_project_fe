import React from 'react';
import '../../../../styles/Order/orderList.scss';

const OrderDetail = (props) => {
  return (
    <>
      <h2 className="h1 ps-2 pb-3">訂單明細</h2>

      <h3 className="ps-5 pb-2">商品</h3>
      <div className="orderList">
        <div className="row orderListTitle gap-3">
          <div className="col">圖片</div>
          <div className="col">名稱</div>
          <div className="col">單價</div>
          <div className="col">數量</div>
          <div className="col">總價</div>
        </div>

        <div className="orderItemList">
          <div className="row orderItem gap-3">
            <div className="col">
              <img
                alt=""
                src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
              />
            </div>
            <div className="col">Moomin 多功能電烤盤1111111</div>
            <div className="col">$ 666</div>
            <div className="col">3</div>
            <div className="col">$ 666</div>
          </div>
        </div>

        <div className="row orderListInfo">
          <div className="col position-relative">
            共 1 項商品
            <div className="col subTotal">小計： $ 666元</div>
          </div>
        </div>
      </div>

      <h3 className="ps-5 pb-2">活動</h3>
      <div className="orderList">
        <div className="row orderListTitle gap-3">
          <div className="col">圖片</div>
          <div className="col">名稱</div>
          <div className="col">單價</div>
          <div className="col">數量</div>
          <div className="col">總價</div>
        </div>

        <div className="orderItemList">
          <div className="row orderItem gap-3">
            <div className="col">
              <img
                alt=""
                src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
              />
            </div>
            <div className="col">Moomin 多功能電烤盤1111111</div>
            <div className="col">$ 666</div>
            <div className="col">3</div>
            <div className="col">$ 666</div>
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

export default OrderDetail;
