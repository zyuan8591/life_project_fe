import React from 'react';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivityCard.module.scss';
import { IconContext } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ActivityCard({ data }) {
  // console.log(data);
  //TODO: 進度條樣式沒反應
  const progressBar = () => {
    if (data.officialJoin === 0) {
      return 0;
    } else {
      let width = (data.officialJoin / data.join_limit) * 220 - 2;
      return `${width} + px`;
    }
  };
  console.log(data);
  console.log('progressBar', progressBar());
  return (
    <>
      {data.length === 0 ? (
        <div style={{ fontSize: '16px', color: '#817161' }}>沒有相關資料</div>
      ) : (
        data.map((item) => {
          return (
            <div className={classes.activityCardStyle} key={uuidv4()}>
              <div className={classes.activityImg}>
                <img
                  src={`/img/picnic/activity_picnic_img/${item.img1}`}
                  alt="/"
                />
              </div>
              <div className={classes.activityInfo}>
                <div className={`${classes.activityTitle} my-2`}>
                  <div className={classes.title}>{item.picnic_title}</div>
                  <IconContext.Provider
                    value={{ className: classes.collectBtn }}
                  >
                    <FaHeart className={classes.collect} />
                  </IconContext.Provider>
                </div>

                <div className={`d-flex ${classes.labelContent}`}>
                  <div className="d-flex">
                    <div className={classes.label}>{item.location}</div>
                    <div
                      className={`${classes.label} ${
                        item.activity_state === '即將開團'
                          ? `${classes.coming}`
                          : item.activity_state === '開團中'
                          ? `${classes.ing}`
                          : item.activity_state === '已成團'
                          ? `${classes.found}`
                          : item.activity_state === '開團已截止'
                          ? `${classes.end}`
                          : ''
                      }`}
                    >
                      {item.activity_state}
                    </div>
                  </div>
                  <div className={classes.price}>${item.price}</div>
                </div>

                <div className={`${classes.activityDate} my-2`}>
                  <div>
                    {item.start_date} ~ {item.end_date}
                  </div>
                </div>
                <div className={classes.progressBar}>
                  <div
                    className={classes.bar}
                    style={{ width: 10 }} //TODO: 進度條樣式沒反應
                  ></div>
                </div>
                <div className={classes.content}>
                  <div className={classes.limit}>
                    目前人數：{item.officialJoin}
                  </div>
                  <div className={classes.limit}>
                    活動名額：{item.join_limit}
                  </div>
                </div>
                <div className={`${classes.activityText} mt-1`}>
                  <div className={classes.activityInt}>活動簡介：</div>
                  <div className={classes.intContent}>{item.intr}</div>
                </div>
                <div className={`${classes.intMore} my-1`}>
                  <IconContext.Provider value={{ className: classes.moreIcon }}>
                    <Link
                      to={`/activity/picnic/official/${item.id}`}
                      className={classes.more}
                    >
                      more
                      <HiChevronDoubleRight />
                    </Link>
                  </IconContext.Provider>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default ActivityCard;