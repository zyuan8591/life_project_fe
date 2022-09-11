import React from 'react';
import { IconContext } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import classes from '../../../../styles/moduleCss/camping_main/ActivityHorizontalCard.module.scss';

function ActivityHorizontalCard({ v, stateClassName }) {
  const dataReplace = (date) => {
    return date.replace(/-/g, '/');
  };
  const progressBarWidth = () => {
    if (v.pepcount === 0) return 0;
    let width = (v.pepcount / v.join_limit) * 350 - 4;
    return width + 'px';
  };

  return (
    <>
      <div className={classes.activityHorizontalStyle}>
        <div className={classes.activityImg}>
          <img
            src={`/img/camping/activity_camping_img/${v.img1}`}
            alt="camping"
          />
        </div>
        <div className={classes.activityInfo}>
          <div className={`${classes.activityTitle} mb-2`}>
            <div className={classes.title}>{v.title}</div>
            <IconContext.Provider value={{ className: classes.collectBtn }}>
              <FaHeart className={classes.collect} />
            </IconContext.Provider>
          </div>
          <div className="d-flex">
            <div className={classes.label}>{v.location}</div>
            <div
              className={classes.stateLabel}
              style={{ backgroundColor: `${stateClassName(v.state)}` }}
            >
              {v.state}
            </div>
          </div>
          <div className={`${classes.content} my-2`}>
            <div>
              {dataReplace(v.activity_start_date)} ~
              {dataReplace(v.activity_end_date)}
            </div>
            <div>{`$ ${v.price}`}</div>
          </div>
          <div className={classes.activityText}>
            <div className={classes.activityInt}>活動簡介：</div>
            <div className={classes.intContent}>{v.activity_about}</div>
          </div>
          <div className={`${classes.intMore} mt-3`}>
            <div>
              <div className={classes.progressBar}>
                <div
                  className={classes.bar}
                  style={{ width: progressBarWidth() }}
                ></div>
              </div>
              <div className={classes.progressBarText}>
                <div className={classes.limit}>目前人數：{v.pepcount}</div>
                <div className={classes.limit}>活動名額：{v.join_limit}</div>
              </div>
            </div>
            <Link to={`/activity/camping/${v.id}`} className={classes.more}>
              更多資訊
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityHorizontalCard;
