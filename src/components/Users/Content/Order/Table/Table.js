import React from 'react';
import { BiPencil } from 'react-icons/bi';
import { TiClipboard } from 'react-icons/ti';
import { IconContext } from 'react-icons';

const Table = () => {
  const title = [
    '訂單編號',
    '訂單金額',
    '訂單狀態',
    '訂單日期',
    '付款方式',
    '運送方式',
    '訂單詳情',
  ];
  const data = [
    {
      orderNumber: 123456,
      total: 800,
      orderState: '運送中',
      date: '2022-04-18',
      payment: '信用卡',
      method: '貨到付款',
    },
    {
      orderNumber: 1615616,
      total: 1600,
      orderState: '備貨中',
      date: '2022-05-18',
      payment: '綠界',
      method: '超商取貨',
    },
  ];

  return (
    <div className="order-table">
      <table className="table table-bordered mt-5">
        <thead>
          {title.map((v) => {
            return <th>{v}</th>;
          })}
        </thead>
        {data.map((v, i) => {
          return (
            <tbody>
              <td>{v.orderNumber}</td>
              <td>${v.total}</td>
              <td>{v.orderState}</td>
              <td>{v.date}</td>
              <td>{v.payment}</td>
              <td>{v.method}</td>
              <td>
                <button>訂單詳情</button>
              </td>
            </tbody>
          );
        })}
      </table>
      {/* <div className="icons">
        <p>目前沒有訂單</p>
        <IconContext.Provider value={{ className: 'order-icon' }}>
          <TiClipboard />
        </IconContext.Provider>
      </div> */}
    </div>
  );
};

export default Table;
