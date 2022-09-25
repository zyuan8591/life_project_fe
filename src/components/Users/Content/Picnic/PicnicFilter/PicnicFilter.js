import React from 'react';

const PicnicFilter = ({ list, setList, setDisplay }) => {
  const item = ['官方活動', '私人活動', '我開的團', '活動收藏'];
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

export default PicnicFilter;
