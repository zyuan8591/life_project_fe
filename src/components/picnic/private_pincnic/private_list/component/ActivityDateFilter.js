import React from 'react';
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
}) {
  return (
    <>
      <div className={classes.activityDate}>
        <p className={classes.dateText}>活動日期</p>
        <div className="d-flex ms-3">
          <input
            type="date"
            style={{ maxWidth: '115px' }}
            onChange={(e) => {
              let newDate = e.target.value;
              setMinDateValue(newDate);
              // console.log(newDate);
            }}
          />
          <div className="mx-2">-</div>
          <input
            type="date"
            style={{ maxWidth: '115px' }}
            onChange={(e) => {
              let newDate = e.target.value;
              setMaxDateValue(newDate);
              // console.log(newDate);
            }}
          />
        </div>
        <button
          onClick={() => {
            if (minDateValue !== '' && maxDateValue !== '') {
              setMinDate(minDateValue);
              setMaxDate(maxDateValue);
            } else {
              setMinDate('');
              setMaxDate('');
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
