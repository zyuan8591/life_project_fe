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
          <h3 className="h2 ps-3">商品</h3>
          <div className="orderList">
            <div className="row orderListTitle gap-md-3 gap-1">
              <div className="col-md col-3">圖片</div>
              <div className="col-md col-3">名稱</div>
              <div className="col">單價</div>
              <div className="col">數量</div>
              <div className="col">總價</div>
            </div>
            <div className="orderItemList">
              {productItems.map((v, i) => {
                if (v.ischecked === true) {
                  return (
                    <div className="row orderItem gap-md-3 gap-1" key={v.id}>
                      <div className="col-md col-3">
                        <img alt="" src={`/img/product/product_img/${v.img}`} />
                      </div>
                      <div className="col-md col-3">{v.name}</div>
                      <div className="col">$ {v.price}</div>
                      <div className="col">{v.quantity}</div>
                      <div className="col">$ {v.itemTotal}</div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="orderListInfo">
              共 {productCount} 項商品
              <span className="subTotal">小計： $ {productTotal} 元</span>
            </div>
          </div>
        </>
      )}

      {(picnicCount > 0 || campingCount > 0) && (
        <>
          <h3 className="h2 ps-3">活動</h3>
          <div className="orderList">
            <div className="row orderListTitle gap-md-3 gap-1">
              <div className="col-md col-3">圖片</div>
              <div className="col-md col-3">名稱</div>
              <div className="col">單價</div>
              <div className="col">數量</div>
              <div className="col">總價</div>
            </div>

            <div className="orderItemList">
              {picnicItems.map((v, i) => {
                if (v.ischecked === true) {
                  return (
                    <div className="row orderItem gap-md-3 gap-1" key={v.id}>
                      <div className="col-md col-3">
                        <img
                          alt=""
                          src={`/img/picnic/activity_picnic_img/${v.img}`}
                        />
                      </div>
                      <div className="col-md col-3">{v.name}</div>
                      <div className="col">$ {v.price}</div>
                      <div className="col">{v.quantity}</div>
                      <div className="col">$ {v.itemTotal}</div>
                    </div>
                  );
                }
              })}
              {campingItems.map((v, i) => {
                if (v.ischecked === true) {
                  return (
                    <div className="row orderItem gap-md-3 gap-1" key={v.id}>
                      <div className="col-md col-3">
                        <img
                          alt=""
                          src={`/img/camping/activity_camping_img/${v.img}`}
                        />
                      </div>
                      <div className="col-md col-3">{v.name}</div>
                      <div className="col">$ {v.price}</div>
                      <div className="col">{v.quantity}</div>
                      <div className="col">$ {v.itemTotal}</div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="orderListInfo">
              共 {picnicCount + campingCount} 項商品
              <span className=" subTotal">
                小計： $ {picnicTotal + campingTotal} 元
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartDetail;
