import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ orders }) => {
  // console.log(orders);
  const title = [
    '訂單編號',
    '訂單金額',
    '訂單狀態',
    '訂單日期',
    '付款方式',
    '運送方式',
    '訂單詳情',
  ];

  return (
    <div className="order-table">
      <table className="table table-sm mt-5">
        <thead>
          <tr>
            {title.map((v, i) => {
              return <th key={i}>{v}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {orders.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.id}</td>
                <td>{v.order_total}</td>
                <td>{v.order_status}</td>
                <td>{v.create_time}</td>
                <td>{v.order_payment}</td>
                <td>{v.order_delivery}</td>
                <td>
                  <Link to={`/orders/${v.id}`}>訂單詳情</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
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
