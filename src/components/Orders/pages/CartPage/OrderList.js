import React, { useState } from 'react';
import { useProductCart } from '../../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../../orderContetxt/useCampingCart';
import { IconContext } from 'react-icons';
import { TbTrash } from 'react-icons/tb';
import '../../../../styles/Order/orderList.scss';

const OrderList = ({
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
  const productCart = useProductCart();
  const picnicCart = usePicnicCart();
  const campingCart = useCampingCart();
  const [selectAll, setSelectAll] = useState(false);
  // console.log(productCount);

  // console.log(productCart.state);
  // const [count, setCount] = useState({});
  // useEffect(() => {
  //   let data = { ...count };
  //   productCart.state.items.map((d, i) => {
  //     data = { ...data, [d.id]: d.quantity };
  //   });
  //   console.log('data', data);
  //   setCount(data);
  // }, [productCart]);

  // useEffect(() => {
  //   // let
  // }, [count]);

  // useEffect(() => {
  //   const checkcount = productCart.state.items.filter((items) => {
  //     return items.ischecked === true;
  //   });
  //   if (checkcount.length !== productCart.state.items.length) {
  //     setSelectAll(false);
  //   }
  // }, [productCart]);

  return (
    <>
      {productItems.length > 0 && (
        <>
          <h2 className="h1 ps-3">商品</h2>

          <div className="orderList">
            <div className="row orderListTitle gap-md-3 gap-1">
              <div className="col">
                {/* TODO: checkall */}
                <input
                  type="checkbox"
                  onChange={() => {
                    const checkcount = productItems.filter((items) => {
                      return items.ischecked === true;
                    });
                    if (checkcount.length !== productItems.length) {
                      // console.log('888', checkcount, productItems.length);
                      setSelectAll(false);
                    }
                    productItems.map((v, i) => {
                      productCart.updateItem({
                        ...v,
                        ischecked: !selectAll,
                      });
                    });
                    setSelectAll(!selectAll);
                  }}
                />
              </div>
              <div className="col dnone">圖片</div>
              <div className="col-md-2 col-3">名稱</div>
              <div className="col-md col-2">單價</div>
              <div className="col">數量</div>
              <div className="col-md col-2">總價</div>
              <div className="col">移除</div>
            </div>

            <div className="orderItemList">
              {productItems.map((v, i) => {
                console.log(v);
                return (
                  <div
                    className="row orderItem gap-md-3 gap-1"
                    key={v.id}
                    style={{
                      background: v.ischecked ? 'rgba(185,189,197,.3)' : '#fff',
                    }}
                  >
                    <div className="col">
                      <input
                        type="checkbox"
                        checked={v.ischecked}
                        onChange={() => {
                          productCart.updateItem({
                            ...v,
                            ischecked: !v.ischecked,
                          });
                        }}
                      />
                    </div>
                    <div className="col dnone">
                      <img alt="" src={`/img/product/product_img/${v.img}`} />
                    </div>
                    <div className="col-md-2 col-3">{v.name}</div>
                    <div className="col-md col-2">$ {v.price}</div>
                    <div className="col">
                      <div className="counter">
                        <button
                          style={{
                            background: v.ischecked
                              ? 'rgba(185,189,197,.05)'
                              : '#fff',
                          }}
                          className="counterButton"
                          onClick={() => {
                            productCart.minusOne(v.id);
                          }}
                        >
                          -
                        </button>
                        <div className="counterContent">
                          <input
                            style={{
                              background: v.ischecked
                                ? 'rgba(185,189,197,.05)'
                                : '#fff',
                            }}
                            type="text"
                            className="counterInput"
                            value={v.quantity}
                            onChange={(e) => {
                              // productCart.updateItem(e.target.value);
                              // productCart.plusItemQuantityOnce(v.id, 87);
                              productCart.updateItem({
                                ...v,
                                quantity: parseInt(e.target.value) || 1,
                              });
                            }}
                          />
                        </div>

                        <button
                          style={{
                            background: v.ischecked
                              ? 'rgba(185,189,197,.05)'
                              : '#fff',
                          }}
                          className="counterButton"
                          onClick={() => {
                            productCart.plusOne(v.id);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md col-2">$ {v.price * v.quantity}</div>
                    <div className="col cursorPointer">
                      <IconContext.Provider
                        value={{ color: 'black', size: '1.5rem' }}
                      >
                        <TbTrash
                          onClick={() => {
                            productCart.removeItem(v.id);
                          }}
                        />
                      </IconContext.Provider>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="orderListInfo  ">
              已選擇 {productCount} 項商品
              <span className="subTotal">小計：$ {productTotal} 元</span>
            </div>
          </div>
        </>
      )}
      {(picnicItems.length > 0 || campingItems.length > 0) && (
        <>
          <h2 className="h1 ps-3">活動</h2>
          <div className="orderList">
            <div className="row orderListTitle gap-md-3 gap-1">
              <div className="col">
                {/* TODO: checkall */}
                <input
                  type="checkbox"
                  onChange={() => {
                    const picnicCheckCount = picnicItems.filter((items) => {
                      return items.ischecked === true;
                    });
                    const campingCheckCount = campingItems.filter((items) => {
                      return items.ischecked === true;
                    });
                    if (
                      picnicCheckCount.length + campingCheckCount !==
                      picnicCount + campingCount
                    ) {
                      setSelectAll(false);
                    }
                    picnicItems.map((v, i) => {
                      picnicCart.updateItem({
                        ...v,
                        ischecked: !selectAll,
                      });
                    });
                    campingItems.map((v, i) => {
                      campingCart.updateItem({ ...v, ischecked: !selectAll });
                    });
                    setSelectAll(!selectAll);
                  }}
                />
              </div>
              <div className="col dnone">圖片</div>
              <div className="col-md-2 col-3">名稱</div>
              <div className="col-md col-2">單價</div>
              <div className="col">數量</div>
              <div className="col-md col-2">總價</div>
              <div className="col">移除</div>
            </div>

            <div className="orderItemList">
              {picnicItems.map((v, i) => {
                return (
                  <div
                    className="row orderItem gap-md-3 gap-1"
                    key={v.id}
                    style={{
                      background: v.ischecked ? 'rgba(185,189,197,.3)' : '#fff',
                    }}
                  >
                    <div className="col">
                      <input
                        type="checkbox"
                        checked={v.ischecked}
                        onChange={() => {
                          picnicCart.updateItem({
                            ...v,
                            ischecked: !v.ischecked,
                          });
                        }}
                      />
                    </div>
                    <div className="col dnone">
                      <img
                        alt=""
                        src={`/img/picnic/activity_picnic_img/${v.img}`}
                      />
                    </div>
                    <div className="col-md-2 col-3">{v.name}</div>
                    <div className="col-md col-2">$ {v.price}</div>
                    <div className="col">{v.quantity}</div>
                    <div className="col-md col-2">$ {v.price * v.quantity}</div>
                    <div className="col cursorPointer">
                      <IconContext.Provider
                        value={{ color: 'black', size: '1.5rem' }}
                      >
                        <TbTrash
                          onClick={() => {
                            picnicCart.removeItem(v.id);
                          }}
                        />
                      </IconContext.Provider>
                    </div>
                  </div>
                );
              })}
              {campingItems.map((v, i) => {
                return (
                  <div
                    className="row orderItem gap-md-3 gap-1"
                    key={v.id}
                    style={{
                      background: v.ischecked ? 'rgba(185,189,197,.3)' : '#fff',
                    }}
                  >
                    <div className="col">
                      <input
                        type="checkbox"
                        checked={v.ischecked}
                        onChange={() => {
                          campingCart.updateItem({
                            ...v,
                            ischecked: !v.ischecked,
                          });
                        }}
                      />
                    </div>
                    <div className="col dnone">
                      <img
                        alt=""
                        src={`/img/camping/activity_camping_img/${v.img}`}
                      />
                    </div>
                    <div className="col-md-2 col-3">{v.name}</div>
                    <div className="col-md col-2">$ {v.price}</div>
                    <div className="col">{v.quantity}</div>
                    <div className="col-md col-2">$ {v.price * v.quantity}</div>
                    <div className="col cursorPointer">
                      <IconContext.Provider
                        value={{ color: 'black', size: '1.5rem' }}
                      >
                        <TbTrash
                          onClick={() => {
                            campingCart.removeItem(v.id);
                          }}
                        />
                      </IconContext.Provider>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="orderListInfo">
              已選擇 {picnicCount + campingCount} 項商品
              <span className="subTotal">
                小計： $ {picnicTotal + campingTotal} 元
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderList;
