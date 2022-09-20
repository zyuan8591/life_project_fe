import React, { useState, useEffect } from 'react';
import '../../../../styles/Order/orderList.scss';
import { IconContext } from 'react-icons';
import { TbTrash } from 'react-icons/tb';
import { useProductCart } from '../../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../../orderContetxt/useCampingCart';

const OrderList = (props) => {
  const productCart = useProductCart();
  const picnicCart = usePicnicCart();
  const campingCart = useCampingCart();
  const [selectAll, setSelectAll] = useState(false);
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
      {productCart.state.items.length < 1 &&
        picnicCart.state.items.length < 1 &&
        campingCart.state.items.length < 1 && <>滾</>}

      {productCart.state.items.length > 0 && (
        <>
          <h2 className="h1 ps-3 pb-2">商品</h2>

          <div className="orderList">
            <div className="row orderListTitle gap-3">
              <div className="col">
                {/* TODO: checkall */}
                <input
                  type="checkbox"
                  onChange={() => {
                    const checkcount = productCart.state.items.filter(
                      (items) => {
                        return items.ischecked === true;
                      }
                    );
                    if (checkcount.length !== productCart.state.items.length) {
                      console.log(
                        '888',
                        checkcount,
                        productCart.state.items.length
                      );
                      setSelectAll(false);
                    }
                    productCart.state.items.map((v, i) => {
                      productCart.updateItem({
                        ...v,
                        ischecked: !selectAll,
                      });
                    });
                    setSelectAll(!selectAll);
                  }}
                />
              </div>
              <div className="col">圖片</div>
              <div className="col">名稱</div>
              <div className="col">單價</div>
              <div className="col">數量</div>
              <div className="col">總價</div>
              <div className="col">移除</div>
            </div>

            <div className="orderItemList">
              {productCart.state.items.map((v, i) => {
                return (
                  <div
                    className="row orderItem gap-3"
                    key={v.id}
                    // TODO: background color
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
                    <div className="col">
                      <img alt="" src={`/img/product/product_img/${v.img}`} />
                    </div>
                    <div className="col">{v.name}</div>
                    <div className="col">{v.price}</div>
                    <div className="col">
                      <div className="counter">
                        <button
                          className="counterButton"
                          onClick={() => {
                            productCart.minusOne(v.id);
                          }}
                        >
                          -
                        </button>
                        <div className="counterContent">
                          <input
                            type="text"
                            className="counterInput"
                            // value={v.quantity}
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
                          className="counterButton"
                          onClick={() => {
                            productCart.plusOne(v.id);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col">{v.price * v.quantity}</div>
                    <div className="col cursorPointer">
                      <IconContext.Provider
                        value={{ color: 'black', size: '2rem' }}
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

            <div className="row orderListInfo">
              <div className="col position-relative">
                已選擇 {productCart.state.totalItems} 項商品
                <div className="col subTotal">
                  小計：$ {productCart.state.cartTotal} 元
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* {test} */}
      <div className="btn-group-vertical">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            console.log(productCart.state);
          }}
        >
          log cart
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            productCart.addItem({
              id: '111',
              quantity: 5,
              name: 'Moomin 多功能電烤盤1111111',
              price: 15000,
              ischecked: false,
            });
          }}
        >
          add item (id=111, x5)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            productCart.addItem({
              id: '222',
              quantity: 1,
              name: 'ipad',
              price: 19000,
              ischecked: false,
            });
          }}
        >
          add item (id=222, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            productCart.removeItem('222');
          }}
        >
          remove item(id=222)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            productCart.updateItem({
              id: '222',
              quantity: 7,
            });
          }}
        >
          update id=222 item quantity to 7
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            productCart.updateItem({
              id: '111',
              quantity: 99,
            });
          }}
        >
          update id=111 item quantity to 99
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            productCart.clearCart();
          }}
        >
          clear cart
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            if (productCart.isInCart('222')) alert('id=222 item is in cart');
            else alert('no id=222  ');
          }}
        >
          check id=222 if in cart
        </button>
      </div>
      {(picnicCart.state.items.length > 0 ||
        campingCart.state.items.length > 0) && (
        <>
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
              {picnicCart.state.items.map((v, i) => {
                return (
                  <div
                    className="row orderItem gap-3"
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
                    <div className="col">
                      <img
                        alt=""
                        src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
                      />
                    </div>
                    <div className="col">{v.name}</div>
                    <div className="col">{v.price}</div>
                    <div className="col">{v.quantity}</div>
                    <div className="col">{v.price * v.quantity}</div>
                    <div className="col cursorPointer">
                      <IconContext.Provider
                        value={{ color: 'black', size: '2rem' }}
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
              {campingCart.state.items.map((v, i) => {
                return (
                  <div
                    className="row orderItem gap-3"
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
                    <div className="col">
                      <img
                        alt=""
                        src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
                      />
                    </div>
                    <div className="col">{v.name}</div>
                    <div className="col">{v.price}</div>
                    <div className="col">{v.quantity}</div>
                    <div className="col">{v.price * v.quantity}</div>
                    <div className="col cursorPointer">
                      <IconContext.Provider
                        value={{ color: 'black', size: '2rem' }}
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

            <div className="row orderListInfo">
              <div className="col position-relative">
                已選擇{' '}
                {picnicCart.state.totalItems + campingCart.state.totalItems}{' '}
                項商品
                <div className="col subTotal">
                  小計： ${' '}
                  {picnicCart.state.cartTotal + campingCart.state.cartTotal} 元
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* {test} */}
      <div className="btn-group-vertical">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            picnicCart.addItem({
              id: '333',
              quantity: 1,
              name: 'Moomin 多功能電烤盤1111111',
              price: 15000,
              ischecked: false,
            });
          }}
        >
          add pic item (id=333, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            picnicCart.addItem({
              id: '888',
              quantity: 1,
              name: 'Moomin 多功能電烤盤1111111',
              price: 15000,
              ischecked: false,
            });
          }}
        >
          add pic item (id=888, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            campingCart.addItem({
              id: '444',
              quantity: 1,
              name: 'ipad',
              price: 19000,
              ischecked: false,
            });
          }}
        >
          add camp item (id=444, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            campingCart.addItem({
              id: '666',
              quantity: 1,
              name: 'ipad',
              price: 19000,
              ischecked: false,
            });
          }}
        >
          add camp item (id=666, x1)
        </button>
      </div>
    </>
  );
};

export default OrderList;
