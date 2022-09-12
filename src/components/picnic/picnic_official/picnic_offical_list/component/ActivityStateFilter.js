import React from 'react';
import { useState, useEffect } from 'react';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivityStateFilter.module.scss';
function ActivityStateFilter({ v, filterState, setFilterState }) {
  return (
    <>
      <button
        className={classes.searchBtn}
        style={{ backgroundColor: v.style }}
        onClick={() => {
          setFilterState(v.value);
          console.log(v.value);
        }}
      >
        {v.state}
      </button>
    </>
  );
}

export default ActivityStateFilter;
