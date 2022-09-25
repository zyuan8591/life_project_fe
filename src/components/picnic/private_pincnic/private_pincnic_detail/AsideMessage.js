import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import MapAside from '../../../map/component/MapAside';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

function AsideMessage({
  data,
  userJoin,
  user,
  handleAddJoin,
  handleDeleteJoin,
  setIsgo,
  setLoginBtn,
}) {
  const [scrollDown, setScrollDown] = useState(false);

  const stateColor = (state) => {
    switch (state) {
      case '即將開團':
        return '#817161';
      case '開團中':
        return '#F2AC33';
      case '已成團':
        return '#1F9998';
      case '開團已截止':
        return '#B9BDC5';
      default:
        return '#817161';
    }
  };

  let scrollY = window.scrollY; // 一開始當下位置
  window.addEventListener('scroll', () => {
    // 偵測到scroll事件
    let scrollNow = window.scrollY; // 最新當下的位置
    setScrollDown(scrollNow > scrollY); // 新的位置 > 上一次位置＝true 就往下, false往上
    scrollY = scrollNow;
  });

  function dataReplace(date) {
    return date.replace(/-/g, '/');
  }

  // 上可報名人數 = 限制上限 - 加入
  function lastCount(limit, currentJoin) {
    let result = limit - currentJoin;
    if (result !== 0) {
      return result;
    } else {
      return 0;
    }
  }

  return (
    <>
      {data.length !== 0 && (
        <>
          <div
            className="asideMessage transition"
            style={{ top: scrollDown ? '3px' : '75px' }}
          >
            {data.map((item) => {
              return (
                <div key={uuidv4()}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p>{item.picnic_title}</p>
                    <div
                      className="stateBtn"
                      style={{
                        backgroundColor: `${stateColor(item.activity_state)}`,
                      }}
                    >
                      {item.activity_state}
                    </div>
                  </div>
                  <div className="mb-2">
                    <FaCalendarAlt className="calendarIcon" />
                    {dataReplace(item.activity_date)}
                  </div>
                  <div className="mb-2">
                    <FaMapMarkerAlt className="mapMarkerIcon" />
                    台北市{item.location}
                  </div>
                  <div className="mb-3">
                    <BsPersonFill className="personIcon" />
                    距離結團上限, 尚可報名：
                    {lastCount(item.join_limit, item.currentJoin)}人
                  </div>
                  <div className="map mb-3">{/* <MapAside /> */}</div>
                  <div className="d-flex justify-content-between align-items-center">
                    {item.activity_state === '開團已截止' ? (
                      <button
                        className="joinInBtn"
                        style={{
                          background: '#B9BDC5',
                          color: '#444',
                        }}
                        disabled
                      >
                        開團已截止
                      </button>
                    ) : item.activity_state === '即將開團' ? (
                      <button
                        className="joinInBtn"
                        style={{
                          background: '#B9BDC5',
                          color: '#444',
                        }}
                        disabled
                      >
                        即將開團
                      </button>
                    ) : user ? (
                      userJoin.includes(item.id) ? (
                        <button
                          className="joinInBtn"
                          style={{
                            background: '#B9BDC5',
                            color: '#444',
                          }}
                          onClick={() => {
                            handleDeleteJoin(item.id);
                            setIsgo(true);
                          }}
                        >
                          取消活動
                        </button>
                      ) : (
                        <button
                          className="joinInBtn"
                          onClick={() => {
                            handleAddJoin(data[0].id);
                            setIsgo(true); //加入時無法及時顯示狀態 取消可以
                          }}
                        >
                          加入活動
                        </button>
                      )
                    ) : (
                      <button
                        className="joinInBtn"
                        onClick={() => {
                          setLoginBtn(true);
                        }}
                      >
                        加入活動
                      </button>
                    )}
                    {}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default AsideMessage;
