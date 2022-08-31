import React from 'react';

const List = () => {
  return (
    <div className="list border">
      <div className="list-title">
        <div>
          <h3>近期紀錄</h3>
        </div>
        <div className="row border">
          <div className="col">
            <h3>獲得/使用</h3>
          </div>
          <div className="col">
            <h3>細節</h3>
          </div>
          <div className="col">
            <h3>日期</h3>
          </div>
        </div>
        <ul className="row">
          <li className="col">+ 50點</li>
          <li className="col">系統回收</li>
          <li className="col">2022-08-07</li>
        </ul>
      </div>
    </div>
  );
};

export default List;
