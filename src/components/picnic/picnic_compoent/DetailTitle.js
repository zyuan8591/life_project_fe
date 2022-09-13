import React from 'react';
import { FaPaw } from 'react-icons/fa';

function DetailTitle() {
  return (
    <>
      <div className="detailTitle">
        <div>
          <h2 className="title">夏季野餐趣</h2>
          <ul className="titleContent my-4">
            <li>
              <FaPaw className="faPawIcon" />
              日期：2022/08/31
            </li>
            <li>
              <FaPaw className="faPawIcon" />
              地點：台北市信義區仁愛路四段505號
            </li>
            <li>
              <FaPaw className="faPawIcon" />
              報名人數上限：25
            </li>
            <li>
              <FaPaw className="faPawIcon" />
              報名開始：2022/08/17
            </li>
            <li>
              <FaPaw className="faPawIcon" />
              報名結束：2022/08/24
            </li>
          </ul>
        </div>
        <div className="image mb-5">
          <img
            src="/img/picnic/activity_picnic_img/picnic_4_01.jpeg"
            alt="picnic"
          />
        </div>
      </div>
    </>
  );
}

export default DetailTitle;
