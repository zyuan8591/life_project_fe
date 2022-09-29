import React from 'react';
import '../../../../styles/Order/orderList.scss';
import { API_URL_IMG } from '../../../../utils/config';

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
      <h2 className="h1 ps-2 pb-3 orderDetail-title">訂單明細</h2>
      {productCount > 0 && (
        <>
          <h3 className="h2 ps-3 title">商品</h3>
          <div className="orderList">
            <div className="row orderListTitle gap-sm-2 gap-1">
              <div className="col-md col-3">圖片</div>
              <div className="col-md-4 col-3">名稱</div>
              <div className="col">單價</div>
              <div className="col-1 text-nowrap">數量</div>
              <div className="col">總價</div>
            </div>
            <div className="orderItemList">
              {productItems.map((v, i) => {
                if (v.ischecked === true) {
                  return (
                    <div className="row orderItem gap-sm-2 gap-1" key={v.id}>
                      <div className="col-md col-3">
                        <img
                          alt=""
                          src={`${API_URL_IMG}/product/product_img/${v.img}`}
                        />
                      </div>
                      <div className="col-md-4 col-3 text-nowrap hide">
                        {v.name}
                      </div>
                      <div className="col text-nowrap">
                        ${' '}
                        {JSON.stringify(v.price).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ','
                        )}
                      </div>
                      <div className="col-1 ">{v.quantity}</div>
                      <div className="col text-nowrap">
                        ${' '}
                        {JSON.stringify(v.itemTotal).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ','
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="orderListInfo">
              共 {productCount} 項商品
              <span className="subTotal">
                小計： ${' '}
                {JSON.stringify(productTotal).replace(
                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                  ','
                )}{' '}
                元
              </span>
            </div>
          </div>
        </>
      )}

      {(picnicCount > 0 || campingCount > 0) && (
        <>
          <h3 className="h2 ps-3 title">活動</h3>
          <div className="orderList">
            <div className="row orderListTitle gap-sm-2 gap-1">
              <div className="col-md col-3">圖片</div>
              <div className="col-md-4 col-3">名稱</div>
              <div className="col">單價</div>
              <div className="col-1 text-nowrap">數量</div>
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
                      <div className="col-md-4 col-3 text-nowrap hide">
                        {v.name}
                      </div>
                      <div className="col">
                        ${' '}
                        {JSON.stringify(v.price).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ','
                        )}
                      </div>
                      <div className="col-1">{v.quantity}</div>
                      <div className="col">
                        ${' '}
                        {JSON.stringify(v.itemTotal).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ','
                        )}
                      </div>
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
                      <div className="col-md-4 col-3 text-nowrap hide">
                        {v.name}
                      </div>
                      <div className="col">
                        ${' '}
                        {JSON.stringify(v.price).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ','
                        )}
                      </div>
                      <div className="col-1">{v.quantity}</div>
                      <div className="col">
                        ${' '}
                        {JSON.stringify(v.itemTotal).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ','
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="orderListInfo">
              共 {picnicCount + campingCount} 項商品
              <span className=" subTotal">
                小計： ${' '}
                {JSON.stringify(picnicTotal + campingTotal).replace(
                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                  ','
                )}{' '}
                元
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartDetail;
