import React from 'react';

const PicnicFilter = ({ list, setList }) => {
  const item = ['官方活動', '私人活動', '我開的團', '歷史紀錄', '活動蒐藏'];
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

export default PicnicFilter;
