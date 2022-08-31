import React from 'react';

function ActivityDateFilter() {
  return (
    <>
      <div className="activityDate">
        <p className="dateText">活動日期</p>
        <div className="d-flex ms-3">
          <input type="date" />
          <div className="mx-2">-</div>
          <input type="date" />
        </div>
      </div>
    </>
  );
}

export default ActivityDateFilter;
