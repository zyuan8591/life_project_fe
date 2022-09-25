import React from 'react';

const List = ({ data }) => {
  return (
    <div className="list ">
      <div className="list-title">
        <table className="table table-striped">
          <thead>
            <tr className="h4 row">
              <th className="col">獲得/使用</th>
              <th className="col">細節</th>
              <th className="col"> 日期</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v, i) => {
              return (
                <tr className="row" key={i}>
                  <td className="col">
                    {v.point > 0 ? `+${v.point}點` : v.point + '點'}
                  </td>
                  <td className="col">{v.event}</td>
                  <td className="col">{v.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
