import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../../utils/config';

const CampingTable = ({ data, display, getUser, pageNow }) => {
  const title = ['活動名稱', '活動時間', '活動地點', '活動狀態', '查看'];
  const handleDelCollect = async (campingId) => {
    // console.log(campingId);
    await axios.delete(`${API_URL}/camping/campingCollect/${campingId}`, {
      withCredentials: true,
    });
    getUser(`${API_URL}/camping/userCollect?page=${pageNow}`);
  };

  return (
    <div className="activity-table">
      <table className="table table-sm mt-5 table-hover">
        <thead>
          <tr>
            <th></th>
            {title.map((v, i) => {
              return <th key={i}>{v}</th>;
            })}
            {display === 2 ? <th></th> : null}
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
                <td>{`${v.activity_start_date} ~ ${v.activity_end_date}`}</td>
                <td>{v.place}</td>
                <td>{v.state}</td>
                <td className="p-0">
                  <Link to={`/activity/camping/${v.id}`}>
                    <button>活動詳情</button>
                  </Link>
                </td>
                {display === 2 ? (
                  <td className="sm-768none">
                    <i
                      className="fa-solid fa-trash icon"
                      onClick={() => {
                        handleDelCollect(v.id);
                      }}
                    ></i>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CampingTable;
