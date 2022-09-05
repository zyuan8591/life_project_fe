import React from 'react';
import classes from '../../../../styles/moduleCss/camping_main/ActivityStateFilter.module.scss';
function ActivityStateFilter({ v }) {
  return (
    <>
      <button
        className={classes.searchBtn}
        style={{ backgroundColor: v.style }}
      >
        {v.state}
      </button>
    </>
  );
}

export default ActivityStateFilter;
