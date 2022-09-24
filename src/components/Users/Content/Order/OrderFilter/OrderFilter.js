import axios from 'axios';
import React, { useState } from 'react';

const OrderFilter = ({
  status,
  setStatus,
  currentStatus,
  setCurrentStatus,
}) => {
  console.log(status);

  return (
    <>
      <ul className="order-filter ">
        <li
          className="list"
          onClick={() => {
            setCurrentStatus(0);
          }}
        >
          <button className={`${currentStatus === 0 ? 'active' : ''}`}>
            全部
          </button>
        </li>
        {status.map((v, i) => {
          console.log(v);
          return (
            <>
              <li
                key={v.id}
                className="list"
                onClick={() => {
                  setCurrentStatus(v.id);
                  console.log(v.id);
                }}
              >
                <button className={`${currentStatus === v.id ? 'active' : ''}`}>
                  {v.order_status}
                </button>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default OrderFilter;
