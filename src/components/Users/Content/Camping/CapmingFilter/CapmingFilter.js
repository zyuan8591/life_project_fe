import React from 'react';

const CapmingFilter = ({ list, setList, setDisplay }) => {
  const item = ['官方活動', '歷史紀錄', '收藏活動'];
  return (
    <ul className="activity-filter ">
      {item.map((v, i) => {
        return (
          <li
            key={i}
            className="list"
            onClick={() => {
              setList(v);
              setDisplay(i);
            }}
          >
            <button className={` ${list === v ? 'active' : ''}`}>{v}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default CapmingFilter;
