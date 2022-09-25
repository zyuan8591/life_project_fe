import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL_IMG } from '../../../../../utils/config';

const PicnicTable = ({ data, display }) => {
  const title = ['活動名稱', '活動時間', '活動地點', '活動狀態'];

  return (
    <div className="activity-table">
      <table className="table table-sm mt-5 table-hover">
        <thead>
          <tr>
            <th></th>
            {title.map((v, i) => {
              return <th key={i}>{v}</th>;
            })}
            {display === 1 ? <th>主辦人</th> : null}
            <th>查看</th>
            {display === 1 || display === 2 ? <th>聊天</th> : null}
            {display === 2 ? <th>編輯</th> : null}
            {display === 2 ? <th>審核</th> : null}
            {display === 2 ? <th>刪除</th> : null}
          </tr>
        </thead>

        <tbody>
          {data.map((v, i) => {
            return (
              <tr key={i}>
                <td className="campingImgfrme">
                  <img
                    src={`${API_URL_IMG}/picnic/${v.img1}`}
                    alt=""
                    className="campingImg"
                  />
                </td>
                <td>{v.picnic_title}</td>
                <td>{`${v.start_date}~${v.end_date}`}</td>
                <td>{v.place_name}</td>
                <td>{v.activity_state}</td>
                {display === 1 ? <td>{v.creater_id}</td> : null}

                <td>
                  {display === 0 || display === 3 ? (
                    <Link to={`/activity/picnic/official/${v.picnic_id}`}>
                      <button>活動詳情</button>
                    </Link>
                  ) : (
                    <Link to={`/activity/picnic/group/${v.picnic_id}`}>
                      <button>活動詳情</button>
                    </Link>
                  )}
                </td>
                {display === 1 || display === 2 ? (
                  <td>
                    <i className="fa-regular fa-comment-dots icon"></i>
                  </td>
                ) : null}
                {display === 2 ? (
                  <td>
                    <i className="fa-solid fa-pen-to-square icon"></i>
                  </td>
                ) : null}
                {display === 2 ? (
                  <td>
                    <i className="fa-solid fa-square-check icon"></i>
                  </td>
                ) : null}
                {display === 2 ? (
                  <td>
                    <i className="fa-solid fa-trash icon"></i>
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

export default PicnicTable;
