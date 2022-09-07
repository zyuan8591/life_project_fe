import React from 'react';
import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';

function AsideMessageFix() {
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
        <aside className={scrollDown ? 'sticky-top top-0' : 'sticky'}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p>夏季野餐趣</p>
            <div className="stateBtn">開團中</div>
          </div>
          <div className="mb-2">
            <FaCalendarAlt className="calendarIcon" />
            2022/08/31
          </div>
          <div className="mb-2">
            <FaMapMarkerAlt className="mapMarkerIcon" />
            台北市信義區
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
      </div>
    </>
  );
}

export default AsideMessageFix;
