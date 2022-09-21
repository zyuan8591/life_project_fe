import React from 'react';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivityCard.module.scss';
import { IconContext } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { API_URL_IMG } from '../../../../../utils/config';
import { Button, message, Space } from 'antd';
import Notification from '../../../../activity/Notification';

function ActivityCard({
  data,
  handleAddFav,
  handleDelFav,
  user,
  userCollect,
  setLoginBtn,
}) {
  // console.log(data);

  const progressBar = (item) => {
    if (data.currentJoin === 0) {
      return 0;
    } else {
      let width = (item.currentJoin / item.join_limit) * 100 + '%';
      // console.log('progressBar', width);
      return `${width}`;
    }
  };

  // console.log(data);
  return (
    <>
      {data.length === 0 ? (
        <div style={{ fontSize: '16px', color: '#817161' }}>沒有相關資料</div>
      ) : (
        data.map((item) => {
          return (
            <div className={classes.activityCardStyle} key={uuidv4()}>
              <div className={classes.activityImg}>
                <img src={`${API_URL_IMG}/picnic/${item.img1}`} alt="/" />
              </div>
              <div className={classes.activityInfo}>
                <div className={`${classes.activityTitle} my-2`}>
                  <div className={classes.title}>{item.picnic_title}</div>
                  {user ? (
                    userCollect.includes(item.id) ? (
                      <IconContext.Provider
                        value={{ className: classes.hasCollectBtn }}
                      >
                        <FaHeart
                          onClick={() => {
                            handleDelFav(item.id); //取消
                          }}
                        />
                      </IconContext.Provider>
                    ) : (
                      <IconContext.Provider
                        value={{ className: classes.collectBtn }}
                      >
                        <FaHeart
                          onClick={() => {
                            handleAddFav(item.id);
                          }}
                        />
                      </IconContext.Provider>
                    )
                  ) : (
                    <IconContext.Provider
                      value={{ className: classes.collectBtn }}
                    >
                      <FaHeart
                        className={classes.collect}
                        onClick={() => {
                          setLoginBtn(true);
                        }}
                      />
                    </IconContext.Provider>
                  )}
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
                  <div className={`${classes.price} pc-view`}>
                    ${item.price}
                  </div>
                </div>

                <div className={`${classes.activityDate} my-2`}>
                  <div className={classes.dateText}>
                    <span>{item.start_date}</span> ~{' '}
                    <span>{item.end_date}</span>
                  </div>
                </div>
                <div className={`${classes.progressBar} pc-view`}>
                  <div
                    className={classes.bar}
                    style={{ width: progressBar(item) }}
                  ></div>
                </div>
                <div className={`${classes.content1} pc-view`}>
                  <div className={classes.limit}>
                    目前人數：{item.currentJoin}
                  </div>
                  <div className={`${classes.limit}`}>
                    活動名額：{item.join_limit}
                  </div>
                </div>
                <div className={`${classes.activityText} mt-1`}>
                  <div className={classes.activityInt}>活動簡介：</div>
                  <div className={classes.intContent}>{item.intr}</div>
                </div>
                <div className={`${classes.intMore} my-1 `}>
                  {/* RWD */}
                  <div className={`${classes.content2} mb-view`}>
                    <div className={classes.limit}>
                      活動名額：{item.join_limit}
                    </div>
                    <div className={classes.price}>${item.price}</div>
                  </div>
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
