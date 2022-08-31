import React from 'react';

function ActivityStateFilter({ v }) {
  return (
    <>
      <button className="searchBtn" style={{ backgroundColor: v.style }}>
        {v.state}
      </button>
    </>
  );
}

export default ActivityStateFilter;
