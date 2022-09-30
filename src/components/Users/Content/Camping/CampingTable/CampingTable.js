import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../../utils/config';
import WarnWindow from '../../Account/component/WarnWindow';
import Notification from '../../../../activity/Notification';
import { SiFoodpanda } from 'react-icons/si';
import { IconContext } from 'react-icons';
import { FaArrowDown, FaRegEye } from 'react-icons/fa';

const CampingTable = ({ data, display, getUser, pageNow }) => {
  const title = ['活動名稱', '活動時間', '活動地點', '活動狀態', '查看'];
  const [warn, setWarn] = useState(false);
  const [delID, setDelID] = useState();
  const [hint, setHint] = useState(false);
  function pop(id) {
    setDelID(id);
    setWarn(true);
  }
  const showHint = () => {
    setHint(true);
    setTimeout(() => {
      setHint(false);
    }, 2000);
  };
  const handleDelCollect = async () => {
    await axios.delete(`${API_URL}/camping/campingCollect/${delID}`, {
      withCredentials: true,
    });
    getUser(`${API_URL}/camping/userCollect?page=${pageNow}`);
    setWarn(false);
    showHint();
  };

  return (
    <div className="activity-table">
      {hint && (
        <Notification contaninText="已取消收藏" iconSize={2} bottom={30}>
          <SiFoodpanda />
        </Notification>
      )}
      <WarnWindow
        warn={warn}
        setWarn={setWarn}
        clickFunction={handleDelCollect}
        text1="確定要移除此項活動嗎？"
      />
      <table className="table table-sm mt-5 table-hover">
        <thead>
          <tr>
            <th></th>
            {title.map((v, i) => {
              return <th key={i}>{v}</th>;
            })}
            {display === 2 ? <th>刪除</th> : null}
          </tr>
        </thead>

        <tbody>
          {data.map((v, i) => {
            return (
              <tr key={i} className="RWDcard">
                {display === 2 ? (
                  <i
                    class="fa-regular fa-circle-xmark xmark"
                    onClick={() => {
                      pop(v.id);
                    }}
                  ></i>
                ) : null}
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
                <td className="p-0 text-center">
                  <Link to={`/activity/camping/${v.id}`}>
                    <button>活動詳情</button>
                  </Link>
                </td>
                {display === 2 ? (
                  <td className="sm-768none">
                    <i
                      className="fa-solid fa-trash icon"
                      onClick={() => {
                        pop(v.id);
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
