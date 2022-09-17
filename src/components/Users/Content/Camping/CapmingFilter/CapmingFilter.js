import React from 'react';

const CapmingFilter = ({ list, setList }) => {
  const item = ['官方活動', '歷史紀錄', '活動蒐藏'];
  return (
    <ul className="activity-filter ">
      {item.map((v) => {
        return (
          <li
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
