import React, { useState } from 'react';

const CampingTable = ({ data }) => {
  const title = ['活動名稱', '活動時間', '活動地點', '活動狀態', '查看'];

  return (
    <div className="activity-table">
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
                <td>{v.titele}</td>
                <td>{v.activity_date}</td>
                <td>{v.place}</td>
                <td>{v.activity_state}</td>
                <td>
                  <button>活動詳情</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CampingTable;
