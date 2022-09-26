import React from 'react';
import classes from '../../../styles/moduleCss/picnic_offical_detail/picnicOfficalDetail.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { FaPaw } from 'react-icons/fa';
import { API_URL_IMG } from '../../../utils/config';

function DetailTitle({ data }) {
  // console.log(data);
  return (
    <>
      {data.map((item) => {
        function dataReplace(date) {
          return date.replace(/-/g, '/');
        }
        return (
          <div className={classes.detailTitle} key={item.id}>
            <div>
              <h2 className={classes.title}>{item.picnic_title}</h2>
              <ul className={`${classes.titleContent} my-4`}>
                <li>
                  <FaPaw className={classes.faPawIcon} />
                  活動日期：{dataReplace(item.activity_date)}
                </li>
                <li>
                  <FaPaw className={classes.faPawIcon} />
                  地址：台北市{item.location}
                  {item.address}
                </li>
                <li>
                  <FaPaw className={classes.faPawIcon} />
                  報名人數上限：{item.join_limit}
                </li>
                <li>
                  <FaPaw className={classes.faPawIcon} />
                  報名開始：{dataReplace(item.start_date)}
                </li>
                <li>
                  <FaPaw className={classes.faPawIcon} />
                  報名結束：{dataReplace(item.end_date)}
                </li>
              </ul>
            </div>
            <div className={`${classes.image} mb-5`}>
              <img src={`${API_URL_IMG}/picnic/${item.img2}`} alt="picnic" />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DetailTitle;
