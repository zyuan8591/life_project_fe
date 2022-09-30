import React, { useState, useRef } from 'react';
import { useProductCart } from '../../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../../orderContetxt/useCampingCart';
import { IconContext } from 'react-icons';
import { TbTrash } from 'react-icons/tb';
import '../../../../styles/Order/orderList.scss';
import { API_URL_IMG } from '../../../../utils/config';

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
  const productQuantity = useRef(null);
  const [selectAll, setSelectAll] = useState(false);
  // console.log(productCount);
  // console.log(productItems);
  console.log(selectAll);

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
          <h2 className="h1 ps-3 title">商品</h2>

          <div className="orderList">
            <div className="row orderListTitle gap-sm-2 dnone">
              <div className="col-1">
                {/* TODO: checkall */}
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    e.target.checked === true
                      ? productItems.map((v, i) => {
                          productCart.updateItem({
                            ...v,
                            ischecked: true,
                          });
                        })
                      : productItems.map((v, i) => {
                          productCart.updateItem({
                            ...v,
                            ischecked: false,
                          });
                        });
                    const checkcount = productItems.filter((items) => {
                      return items.ischecked === true;
                    });
                    // console.log(checkcount, productItems);
                    if (checkcount.length !== productItems.length) {
                      console.log('888', checkcount, productItems);
                      setSelectAll(false);
                    }
                    return setSelectAll(!selectAll);
                    //   const checkcount = productItems.filter((items) => {
                    //     return items.ischecked === true;
                    //   });
                    //   if (checkcount.length !== productItems.length) {
                    //     // console.log('888', checkcount, productItems.length);
                    //     setSelectAll(false);
                    //   }
                    //   productItems.map((v, i) => {
                    //     productCart.updateItem({
                    //       ...v,
                    //       ischecked: !selectAll,
                    //     });
                    //   });
                    //   setSelectAll(!selectAll);
                    // }}
                  }}
                />
              </div>
              <div className="col">圖片</div>
              <div className="col-4">名稱</div>
              <div className="col">單價</div>
              <div className="col">數量</div>
              <div className="col">總價</div>
              <div className="col-1">移除</div>
            </div>

            <div className="orderItemList">
              {productItems.map((v, i) => {
                return (
                  <div
                    className="row orderItem gap-sm-2"
                    key={v.id}
                    style={{
                      background: v.ischecked ? 'rgba(185,189,197,.3)' : '#fff',
                    }}
                  >
                    <div className="col-1">
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
                      <img
                        alt=""
                        src={`${API_URL_IMG}/product/product_img/${v.img}`}
                      />
                    </div>
                    <div className="col-4 text-nowrap hide dnone ">
                      {v.name}
                    </div>
                    <div className="col text-nowrap dnone">
                      ${' '}
                      {JSON.stringify(v.price).replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ','
                      )}
                    </div>
                    <div className="col dnone">
                      <div className="counter">
                        <button
                          style={{
                            background: v.ischecked
                              ? 'rgba(185,189,197,.05)'
                              : '#fff',
                          }}
                          className="counterButton"
                          onClick={(e) => {
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
                            ref={productQuantity}
                            type="text"
                            className="counterInput"
                            value={v.quantity}
                            onChange={(e) => {
                              // productCart.updateItem(e.target.value);
                              // productCart.plusItemQuantityOnce(v.id, 87);

                              let value = e.target.value.replace(/[^\d]/, '');
                              if (e.target.value > v.inventory) return;
                              productCart.updateItem({
                                ...v,
                                quantity: parseInt(value) || 1,
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
                          onClick={(e) => {
                            if (productQuantity.current.value >= v.inventory)
                              return;
                            productCart.plusOne(v.id);
                            console.log(productQuantity.current.value);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col text-nowrap dnone">
                      ${' '}
                      {JSON.stringify(v.price * v.quantity).replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ','
                      )}
                    </div>
                    <div className="col-1 cursorPointer dnone">
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

                    {/* RWD */}
                    <div className="col-8 d-none dblock">
                      <div className="row">
                        <div className="col">
                          <div className="d-flex justify-content-between">
                            <div className="text-nowrap hide">{v.name}</div>
                            <div className="col-3 cursorPointer d-none dblock">
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
                          <div className="d-flex align-items-center  justify-content-between">
                            <div className="text-nowrap">
                              ${' '}
                              {JSON.stringify(v.price * v.quantity).replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ','
                              )}
                            </div>
                            <div className="col-3">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="orderListInfo  ">
              已選擇 {productCount} 項商品
              <span className="subTotal">
                小計：${' '}
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
      {(picnicItems.length > 0 || campingItems.length > 0) && (
        <>
          <h2 className="h1 ps-3 title">活動</h2>
          <div className="orderList">
            <div className="row orderListTitle gap-sm-2 dnone">
              <div className="col-1">
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
              <div className="col">圖片</div>
              <div className="col-4">名稱</div>
              <div className="col">單價</div>
              <div className="col">數量</div>
              <div className="col">總價</div>
              <div className="col-1">移除</div>
            </div>

            <div className="orderItemList">
              {picnicItems.map((v, i) => {
                return (
                  <div
                    className="row orderItem gap-sm-2 gap-1"
                    key={v.id}
                    style={{
                      background: v.ischecked ? 'rgba(185,189,197,.3)' : '#fff',
                    }}
                  >
                    <div className="col-1">
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
                        src={`/img/picnic/activity_picnic_img/${v.img}`}
                      />
                    </div>
                    <div className="col-4 text-nowrap hide dnone">{v.name}</div>
                    <div className="col text-nowrap dnone">
                      ${' '}
                      {JSON.stringify(v.price).replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ','
                      )}
                    </div>
                    <div className="col dnone">{v.quantity}</div>
                    <div className="col dnone">
                      ${' '}
                      {JSON.stringify(v.price * v.quantity).replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ','
                      )}
                    </div>
                    <div className="col-1 cursorPointer dnone">
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
                    {/* RWD */}
                    <div className="col-8 d-none dblock">
                      <div className="row">
                        <div className="col">
                          <div className="d-flex justify-content-between">
                            <div className="text-nowrap hide">{v.name}</div>
                            <div className="col-3 cursorPointer d-none dblock">
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
                          <div className="d-flex align-items-center  justify-content-between">
                            <div className="text-nowrap">
                              ${' '}
                              {JSON.stringify(v.price * v.quantity).replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ','
                              )}
                            </div>
                            <div className="col-3">
                              <div className="counter">
                                <div className="counterContent">
                                  {v.quantity}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {campingItems.map((v, i) => {
                return (
                  <div
                    className="row orderItem gap-sm-2 gap-1"
                    key={v.id}
                    style={{
                      background: v.ischecked ? 'rgba(185,189,197,.3)' : '#fff',
                    }}
                  >
                    <div className="col-1">
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
                        src={`/img/camping/activity_camping_img/${v.img}`}
                      />
                    </div>
                    <div className="col-4 text-nowrap dnone hide">{v.name}</div>
                    <div className="col text-nowrap dnone">
                      ${' '}
                      {JSON.stringify(v.price).replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ','
                      )}
                    </div>
                    <div className="col dnone">{v.quantity}</div>
                    <div className="col dnone">
                      ${' '}
                      {JSON.stringify(v.price * v.quantity).replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ','
                      )}
                    </div>
                    <div className="col-1 cursorPointer dnone">
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

                    {/* RWD */}
                    <div className="col-8 d-none dblock">
                      <div className="row">
                        <div className="col">
                          <div className="d-flex justify-content-between">
                            <div className="text-nowrap hide">{v.name}</div>
                            <div className="col-3 cursorPointer d-none dblock">
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
                          <div className="d-flex align-items-center  justify-content-between">
                            <div className="coltext-nowrap">
                              ${' '}
                              {JSON.stringify(v.price * v.quantity).replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ','
                              )}
                            </div>
                            <div className="col-3">
                              <div className="counter">
                                <div className="counterContent">
                                  {v.quantity}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="orderListInfo">
              已選擇 {picnicCount + campingCount} 項商品
              <span className="subTotal">
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

export default OrderList;
