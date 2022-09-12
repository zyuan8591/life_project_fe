import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPaw } from 'react-icons/fa';

function DetailTitle() {
  return (
    <>
      <div className="detailTitle" key={uuidv4()}>
        <div>
          <h2 className="title">浪花野餐</h2>
          <ul className="titleContent my-4">
            <li>
              <FaPaw className="faPawIcon" />
              活動日期：2022/02/02
            </li>
            <li>
              <FaPaw className="faPawIcon" />
              地點：地址地址地址地址
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
            src="/img/picnic/activity_picnic_img/picnic_01_02.jpg"
            alt="picnic"
          />
        </div>
      </div>
    </>
  )
}

export default DetailTitle;
