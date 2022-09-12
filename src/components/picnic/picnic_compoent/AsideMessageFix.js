import React from 'react';
import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

function AsideMessageFix({ data }) {
  const [scrollDown, setScrollDown] = useState(false);
  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });
  return (
    <>
      <div className="asideMessageFix">
        {data.map((item) => {
          return (
            <aside
              className={scrollDown ? 'sticky-top top-0' : 'sticky'}
              key={uuidv4()}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p>{item.picnic_title}</p>
                <div className="stateBtn">{item.activity_state}</div>
              </div>
              <div className="mb-2">
                <FaCalendarAlt className="calendarIcon" />
                {item.activity_date}
              </div>
              <div className="mb-2">
                <FaMapMarkerAlt className="mapMarkerIcon" />
                台北市{item.location}
              </div>
              <div className="mb-3">
                <BsPersonFill className="personIcon" />
                尚可參加人數：20
              </div>
              <div className="map mb-3">map</div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="price">NT$999</div>
                <button className="btn joinInBtn">加入活動</button>
              </div>
            </aside>
          );
        })}
      </div>
    </>
  );
}

export default AsideMessageFix;
