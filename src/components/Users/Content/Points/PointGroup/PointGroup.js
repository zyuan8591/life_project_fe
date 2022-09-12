import React from 'react';

const PointGroup = () => {
  return (
    <div className="points-group">
      <div className="user-point row">
        <div className="col mx-5 box ">
          <p className="box-title">獲得的點數</p>
          <p>LIFE點數 : 50 點</p>
        </div>
        <div className="col mx-5 box">
          <p className="box-title">已使用點數</p>
          <p>LIFE點數 : 50 點</p>
        </div>
        <div className="col mx-5 box">
          <p className="box-title">可用點數</p>
          <p>LIFE點數 : 50 點</p>
        </div>
      </div>
    </div>
  );
};

export default PointGroup;
