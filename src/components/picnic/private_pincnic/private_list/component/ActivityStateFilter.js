import React from 'react';
import { useState } from 'react';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivityStateFilter.module.scss';
function ActivityStateFilter({ v, filterState, setFilterState }) {
  const [stateFilter, setstateFilter] = useState(0);

  return (
    <>
      <button
        className={classes.searchBtn}
        style={{ backgroundColor: v.style }}
        onClick={() => {
          setFilterState(v.state);
        }}
      >
        {v.state}
      </button>
    </>
  );
}

export default ActivityStateFilter;
