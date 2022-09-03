import React from 'react';

function ActivityDateFilter() {
  return (
    <>
      <div className="activityDate text-end">
        <p className="dateText">活動日期</p>
        <div className="d-flex ms-3">
          <input type="date" style={{ maxWidth: '115px' }} />
          <div className="mx-2">-</div>
          <input type="date" style={{ maxWidth: '115px' }} />
        </div>
        <button>篩選</button>
      </div>
    </>
  );
}

export default ActivityDateFilter;
