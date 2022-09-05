import React from 'react';

const List = () => {
  return (
    <div className="list ">
      <div className="list-title">
        <table className="table ">
          <thead className="h4 row">
            <th className="col">獲得/使用</th>
            <th className="col">細節</th>
            <th className="col"> 日期</th>
          </thead>
          <tbody className="row">
            <td className="col">+ 50點</td>
            <td className="col">系統回收</td>
            <td className="col">2022-08-07</td>
          </tbody>
          <tbody className="row">
            <td className="col">+ 50點</td>
            <td className="col">系統回收</td>
            <td className="col">2022-08-07</td>
          </tbody>
          <tbody className="row">
            <td className="col">+ 50點</td>
            <td className="col">系統回收</td>
            <td className="col">2022-08-07</td>
          </tbody>
          <tbody className="row">
            <td className="col">+ 50點</td>
            <td className="col">系統回收</td>
            <td className="col">2022-08-07</td>
          </tbody>
          <tbody className="row">
            <td className="col">+ 50點</td>
            <td className="col">系統回收</td>
            <td className="col">2022-08-07</td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
