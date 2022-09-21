import React from 'react';
import { useState } from 'react';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivityStateFilter.module.scss';

function ActivityStateFilter({ v, filterState, setFilterState, setPageNow }) {
  return (
    <>
      <button
        className={classes.searchBtn}
        style={{ backgroundColor: v.style }}
        onClick={() => {
          setFilterState(v.value);
          setPageNow(1);
          // console.log(v.value);
        }}
      >
        {v.state}
      </button>
    </>
  );
}

export default ActivityStateFilter;
