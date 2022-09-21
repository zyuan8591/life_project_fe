import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaRegEye } from 'react-icons/fa';

const CampingTable = ({ data }) => {
  const title = ['活動名稱', '活動時間', '活動地點', '活動狀態', '查看'];

  return (
    <div className="activity-table">
      <table className="table table-sm mt-5 table-hover">
        <thead>
          <tr>
            <th></th>
            {title.map((v, i) => {
              return <th key={i}>{v}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((v, i) => {
            return (
              <tr key={i}>
                <td className="campingImgfrme">
                  <img
                    src={`/img/camping/activity_camping_img/${v.img1}`}
                    alt=""
                    className="campingImg"
                  />
                </td>
                <td>{v.title}</td>
                <td>{`${v.activity_start_date}~${v.activity_end_date}`}</td>
                <td>{v.place}</td>
                <td>{v.state}</td>
                <td>
                  <Link to={`/activity/camping/${v.id}`}>
                    <IconContext.Provider value={{ size: '1rem' }}>
                      <FaRegEye />
                    </IconContext.Provider>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CampingTable;
