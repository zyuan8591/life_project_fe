import React from 'react';

const CampingTable = () => {
  const title = ['活動名稱', '活動時間', '活動地點', '活動狀態', '主辦人'];
  const data = [
    {
      titele: '露營Fun輕鬆',
      activity_date: '2022-04-18',
      place: '勤美學',
      activity_state: '報名中',
      create_user: '巴大蝴',
    },
  ];

  return (
    <div className="order-table">
      <table className="table table-sm mt-5">
        <thead>
          <tr>
            {title.map((v, i) => {
              return <th key={i}>{v}</th>;
            })}
            <th>查看</th>
            <th>聊天</th>
            <th>編輯</th>
            <th>審核</th>
            <th>刪除</th>
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
                <td>{v.create_user}</td>
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
