import React, { useState } from 'react';

const OrderFilter = ({ list, setList, setDisplay }) => {
  const item = ['全部', '待付款', '待出貨', '待收貨', '完成', '未完成'];

  return (
    <>
      <ul className="order-filter ">
        {item.map((v, i) => {
          return (
            <li
              key={i}
              className="list"
              onClick={() => {
                setList(v);
                setDisplay(i);
              }}
            >
              <button className={`${list === v ? 'active' : ''}`}> {v}</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default OrderFilter;
