import React from 'react';

const Table = ({ data }) => {
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
          {data.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.orderNumber}</td>
                <td>${v.total}</td>
                <td>{v.orderState}</td>
                <td>{v.date}</td>
                <td>{v.payment}</td>
                <td>{v.method}</td>
                <td>
                  <button>訂單詳情</button>
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
