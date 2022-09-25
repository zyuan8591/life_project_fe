import React, { useState, useEffect } from 'react';

const PointGroup = ({ data }) => {
  const [getPoints, setgetPoints] = useState(0);
  const [spendPoints, setSpendPoints] = useState(0);
  const [usablePoints, setUsablePoints] = useState(0);
  useEffect(() => {
    let allPoints = data.map((v) => v.point);
    let get = allPoints.filter((v) => {
      return v >= 0;
    });
    let getPoints = get.reduce(function (a, b) {
      return a + b;
    }, 0);
    setgetPoints(getPoints);

    let spend = allPoints.filter((v) => {
      return v < 0;
    });
    let spendPoint = spend.reduce(function (a, b) {
      return a + b;
    }, 0);
    setSpendPoints(spendPoint);
    let total = getPoints + spendPoint;
    setUsablePoints(total);
  }, [data]);

  return (
    <div className="points-group">
      <div className="user-point row">
        <div className="col mx-5 box ">
          <p className="box-title">獲得的點數</p>
          <p>LIFE點數 : {getPoints} 點</p>
        </div>
        <div className="col mx-5 box">
          <p className="box-title">已使用點數</p>
          <p>LIFE點數 : {spendPoints} 點</p>
        </div>
        <div className="col mx-5 box">
          <p className="box-title">可用點數</p>
          <p>LIFE點數 : {usablePoints} 點</p>
        </div>
      </div>
    </div>
  );
};

export default PointGroup;
