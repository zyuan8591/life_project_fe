import React from 'react';
import { Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaPaw } from 'react-icons/fa';
import { API_URL_IMG } from '../../../../utils/config';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function DetailTitle({ data, handleDelActivity, user, success, setEdit }) {
  // console.log(user);
  return (
    <>
      {data.map((item) => {
        function dataReplace(date) {
          return date.replace(/-/g, '/');
        }
        return (
          <div className="detailTitle" key={uuidv4()}>
            <div>
              <div className="titleGrop d-flex">
                <h2 className="title">{item.picnic_title}</h2>
                {user && user.id === item.create_user_id ? (
                  <div className="btnGrop">
                    <button
                      className="editBtn"
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      修改活動
                    </button>
                    <button
                      className="delBtn"
                      onClick={() => {
                        handleDelActivity(item.id);
                      }}
                    >
                      刪除活動
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <ul className="titleContent my-4">
                <li>
                  <FaPaw className="faPawIcon" />
                  活動日期：{dataReplace(item.activity_date)}
                </li>
                <li>
                  <FaPaw className="faPawIcon" />
                  地點：{item.address}
                </li>
                <li>
                  <FaPaw className="faPawIcon" />
                  報名人數上限：{item.join_limit}
                </li>
                <li>
                  <FaPaw className="faPawIcon" />
                  報名開始：{dataReplace(item.start_date)}
                </li>
                <li>
                  <FaPaw className="faPawIcon" />
                  報名結束：{dataReplace(item.end_date)}
                </li>
              </ul>
            </div>
            <div className="image mb-5">
              <img src={`${API_URL_IMG}/picnic/${item.img2}`} alt="picnic" />
            </div>
          </div>
        );
      })}
      {success && <Navigate to="/activity/picnic/group" />}
    </>
  );
}

export default DetailTitle;
