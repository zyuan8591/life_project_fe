import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPaw } from 'react-icons/fa';

function DetailTitle({ data }) {
  console.log(data);
  return (
    <>
      {data.map((item) => {
        return (
          <div className="detailTitle" key={uuidv4()}>
            <div>
              <h2 className="title">{item.picnic_title}</h2>
              <ul className="titleContent my-4">
                <li>
                  <FaPaw className="faPawIcon" />
                  活動日期：{item.activity_date}
                </li>
                <li>
                  <FaPaw className="faPawIcon" />
                  地點：{item.location}
                </li>
                <li>
                  <FaPaw className="faPawIcon" />
                  報名人數上限：{item.join_limit}
                </li>
                <li>
                  <FaPaw className="faPawIcon" />
                  報名開始：{item.start_date}
                </li>
                <li>
                  <FaPaw className="faPawIcon" />
                  報名結束：{item.end_date}
                </li>
              </ul>
            </div>
            <div className="image mb-5">
              <img
                src={`/img/picnic/activity_picnic_img/${item.img2}`}
                alt="picnic"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DetailTitle;
