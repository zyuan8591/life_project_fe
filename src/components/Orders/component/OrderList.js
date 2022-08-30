import React from 'react';

const OrderList = (props) => {
  return (
    <>
      <div className="box">
        <table className="table table-border">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>圖片</th>
              <th>名稱</th>
              <th>單價</th>
              <th>數量</th>
              <th>總價</th>
              <th>移除</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tr">
              <td>
                <input type="checkbox" />
              </td>
              <td className="">
                <img
                  alt=""
                  src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
                  className="objectContain"
                />
              </td>
              <td>Moomin 多功能電烤盤</td>
              <td>666</td>
              <td>1</td>
              <td>666</td>
              <td>移除</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="box">
        <table className="table table-border">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>圖片</th>
              <th>名稱</th>
              <th>單價</th>
              <th>數量</th>
              <th>移除</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tr">
              <td>
                <input type="checkbox" />
              </td>
              <td className="">
                <img
                  alt=""
                  src="/img/product/product_img/BRUNO_BOE059_BGR_CE_01.webp"
                  className="objectContain"
                />
              </td>
              <td>野營</td>
              <td>666</td>
              <td>1</td>
              <td>666</td>
              <td>移除</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
