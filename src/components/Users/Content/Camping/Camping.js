import React, { useState } from 'react';
import CampingTable from './CampingTable/CampingTable';

const Camping = () => {
  const [list, setList] = useState('官方活動');
  const item = ['官方活動', '私人活動', '我開的團', '活動蒐藏'];
  return (
    <>
      <h3>露營活動</h3>
      <div className="user_capming">
        <ul className="capming-filter ">
          {item.map((v) => {
            return (
              <li
                className={`col ${list === v ? 'active' : ''}`}
                onClick={() => {
                  setList(v);
                }}
              >
                <button>{v}</button>
              </li>
            );
          })}
        </ul>
        <CampingTable />
      </div>
    </>
  );
};

export default Camping;
