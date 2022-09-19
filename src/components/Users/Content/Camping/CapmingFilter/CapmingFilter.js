import React from 'react';

const CapmingFilter = ({ list, setList }) => {
  const item = ['官方活動', '歷史紀錄', '活動收藏'];
  return (
    <ul className="activity-filter ">
      {item.map((v, i) => {
        return (
          <li
            key={i}
            className="list"
            onClick={() => {
              setList(v);
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
