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

  const toOrderId = (time, id) => {
    let timeString = time.replaceAll('-', '');
    let orderTime = timeString.replace('20', '');
    let orderId = id.toString().padStart(3, '0');
    return orderTime + orderId;
  };

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
              <tr key={v.id}>
                <td>
                  {/* {`${Math.random()
                    .toString(32)
                    .replace('0.', '')
                    .slice(0, 6)}${v.id}`} */}
                  {toOrderId(v.create_time, v.id)}
                </td>
                <td>
                  $
                  {JSON.stringify(v.order_total).replace(
                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    ','
                  )}
                </td>
                <td>{v.order_status}</td>
                <td>{v.create_time}</td>
                <td>{v.order_payment}</td>
                <td>{v.order_delivery}</td>
                <td>
                  <Link to={`/users/order/${v.id}`}>
                    <button>訂單詳情</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
