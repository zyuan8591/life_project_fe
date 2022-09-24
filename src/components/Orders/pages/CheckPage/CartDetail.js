import React from 'react';
import '../../../../styles/Order/orderList.scss';

const CartDetail = ({
  productItems,
  productTotal,
  productCount,
  picnicItems,
  picnicTotal,
  picnicCount,
  campingItems,
  campingTotal,
  campingCount,
}) => {
  // console.log('cart',productItems);
  return (
    <>
      <h2 className="h1 ps-2 pb-3">訂單明細</h2>
      {productCount > 0 && (
        <>
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
              {productItems.map((v, i) => {
                if (v.ischecked === true) {
                  return (
                    <div className="row orderItem gap-3" key={v.id}>
                      <div className="col">
                        <img alt="" src={`/img/product/product_img/${v.img}`} />
                      </div>
                      <div className="col">{v.name}</div>
                      <div className="col">{v.price}</div>
                      <div className="col">{v.quantity}</div>
                      <div className="col">{v.itemTotal}</div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="row orderListInfo">
              <div className="col position-relative">
                共 {productCount} 項商品
                <div className="col subTotal">小計： $ {productTotal}元</div>
              </div>
            </div>
          </div>
        </>
      )}

      {(picnicCount > 0 || campingCount > 0) && (
        <>
          <h3 className="ps-5 pb-2">活動</h3>
          <div className="row orderList">
            <div className="row orderListTitle gap-3">
              <div className="col">圖片</div>
              <div className="col">名稱</div>
              <div className="col">單價</div>
              <div className="col">數量</div>
              <div className="col">總價</div>
            </div>

            <div className="orderItemList">
              {picnicItems.map((v, i) => {
                if (v.ischecked === true) {
                  return (
                    <div className="row orderItem gap-3" key={v.id}>
                      <div className="col">
                        <img
                          alt=""
                          src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
                        />
                      </div>
                      <div className="col">{v.name}</div>
                      <div className="col">{v.price}</div>
                      <div className="col">{v.quantity}</div>
                      <div className="col">{v.itemTotal}</div>
                    </div>
                  );
                }
              })}
              {campingItems.map((v, i) => {
                if (v.ischecked === true) {
                  return (
                    <div className="row orderItem gap-3" key={v.id}>
                      <div className="col">
                        <img
                          alt=""
                          src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
                        />
                      </div>
                      <div className="col">{v.name}</div>
                      <div className="col">{v.price}</div>
                      <div className="col">{v.quantity}</div>
                      <div className="col">{v.itemTotal}</div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="row orderListInfo">
              <div className="col position-relative">
                共 {picnicCount + campingCount} 項商品
                <div className="col subTotal">
                  小計： $ {picnicTotal + campingTotal}元
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartDetail;
