import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

function AsideMessageFix({
  data,
  handleAddJoin,
  handleDeleteJoin,
  userJoin,
  user,
}) {
  const [scrollDown, setScrollDown] = useState(false);

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });

  function dataReplace(date) {
    return date.replace(/-/g, '/');
  }

  function lastCount(limit, currentJoin) {
    let result = limit - currentJoin;
    return result;
  }
  return (
    <>
      <div className="asideMessage">
        {data.map((item) => {
          return (
            <div
              className={scrollDown ? 'sticky-top top-0' : 'sticky'}
              key={uuidv4()}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p>{item.picnic_title}</p>
                <div className="stateBtn">{item.activity_state}</div>
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
                尚可參加人數：{lastCount(item.join_limit, item.currentJoin)}
              </div>
              <div className="map mb-3">map</div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="price">NT${item.price}</div>
                {user ? (
                  <button
                    className="joinInBtn"
                    style={{ background: '#B9BDC5', color: '#444' }}
                    onClick={() => {
                      handleDeleteJoin(data[0].id);
                    }}
                  >
                    取消活動
                  </button>
                ) : (
                  <button
                    className="joinInBtn"
                    onClick={() => {
                      handleAddJoin(data[0].id);
                    }}
                  >
                    加入活動
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AsideMessageFix;
