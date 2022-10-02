import React from 'react';
import { useState } from 'react';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivityDateFilter.module.scss';

function ActivityDateFilter({
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
  maxDateValue,
  setMaxDateValue,
  minDateValue,
  setMinDateValue,
  setPageNow,
  setDateRemind,
  dateRemind,
}) {
  return (
    <>
      <div className={classes.activityDate}>
        <p className={`${classes.dateText}`}>活動日期</p>
        <div
          className={`${classes.dateInputGrop} d-flex ms-auto ms-sm-0 mt-sm-3`}
        >
          <input
            type="date"
            onChange={(e) => {
              setDateRemind('');
              let newDate = e.target.value;
              setMinDateValue(newDate);
              // console.log(newDate);
            }}
          />
          <div className="mx-2">-</div>
          <input
            type="date"
            onChange={(e) => {
              setDateRemind('');
              let newDate = e.target.value;
              setMaxDateValue(newDate);
              // console.log(newDate);
            }}
          />
        </div>
        <div className="dateBtn d-flex justify-content-between align-items-center">
          <div
            className="mt-auto ms-3"
            style={{ fontSize: '14px', color: '#e30202' }}
          >
            {dateRemind}
          </div>
          <button
            onClick={() => {
              if (minDateValue > maxDateValue) {
                setMinDate('');
                setMaxDate('');
                setDateRemind('開始日期不得大於結束日期');
              } else if (minDateValue !== '' || maxDateValue !== '') {
                setMinDate('');
                setMaxDate('');
                setPageNow(1);
                setDateRemind('請選擇正確時間格式');
              } else {
                setMinDate('');
                setMaxDate('');
                setPageNow(1);
                setDateRemind('');
              }
            }}
          >
            篩選
          </button>
        </div>
      </div>
    </>
  );
}

export default ActivityDateFilter;
