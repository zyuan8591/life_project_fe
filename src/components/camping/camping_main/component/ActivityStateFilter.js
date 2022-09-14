import React from 'react';
import classes from '../../../../styles/moduleCss/camping_main/ActivityStateFilter.module.scss';
function ActivityStateFilter({ v, setState, setPage }) {
  return (
    <>
      <button
        className={classes.searchBtn}
        style={{ backgroundColor: v.style }}
        onClick={() => {
          setPage(1);
          setState(v.id);
        }}
      >
        {v.state}
      </button>
    </>
  );
}

export default ActivityStateFilter;
