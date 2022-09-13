import React from 'react';
import classes from '../../../../styles/moduleCss/camping_main/ActivityDateFilter.module.scss';

function ActivityDateFilter({
  setMaxDate,
  setMinDate,
  setMaxDateValue,
  setMinDateValue,
  maxDateValue,
  minDateValue,
  setPage,
  setDateRemind,
  dateRemind,
}) {
  return (
    <>
      <div className={classes.activityDate}>
        <p className={classes.dateText}>活動日期</p>
        <div className="d-flex ms-3 align-items-center">
          <input
            type="date"
            style={{ maxWidth: '115px' }}
            onChange={(e) => {
              let newDate = e.target.value;
              setMinDateValue(newDate);
            }}
          />
          <div className="mx-2">-</div>
          <input
            type="date"
            style={{ maxWidth: '115px' }}
            onChange={(e) => {
              let newDate = e.target.value;
              setMaxDateValue(newDate);
            }}
          />
        </div>
        <div className={classes.dateRemind}>{dateRemind}</div>
        <button
          onClick={() => {
            if (minDateValue > maxDateValue) {
              setDateRemind('開始日期不得大於結束日期');
            } else if (minDateValue !== '' && maxDateValue !== '') {
              setMinDate(minDateValue);
              setMaxDate(maxDateValue);
              setPage(1);
              setDateRemind('');
            } else if (minDateValue !== '' || maxDateValue !== '') {
              setDateRemind('請選擇開始及結束的日期');
            } else {
              setDateRemind('');
              setMinDate('');
              setMaxDate('');
              setPage(1);
            }
          }}
        >
          篩選
        </button>
      </div>
    </>
  );
}

export default ActivityDateFilter;
