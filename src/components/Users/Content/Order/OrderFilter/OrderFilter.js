import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const OrderFilter = () => {
  const [list, setList] = useState('全部');
  const item = ['全部', '待付款', '待出貨', '待收貨', '完成', '未完成'];

  return (
    <>
      <ul className="d-flex order-filter ">
        {item.map((v) => {
          return (
            <li
              key={uuidv4()}
              className={`col ${list === v ? 'active' : ''}`}
              onClick={() => {
                setList(v);
              }}
            >
              {v}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default OrderFilter;
