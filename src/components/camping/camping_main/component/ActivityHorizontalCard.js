import React from 'react';
import { IconContext } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import classes from '../../../../styles/moduleCss/camping_main/ActivityHorizontalCard.module.scss';

function ActivityHorizontalCard() {
  return (
    <>
      <div className={classes.activityHorizontalStyle}>
        <div className={classes.activityImg}>
          <img
            src="/img/camping/activity_camping_img/camping_01_01.jpeg"
            alt="/"
          />
        </div>
        <div className={classes.activityInfo}>
          <div className={`${classes.activityTitle} mb-2`}>
            <div className={classes.title}>浪花野餐計畫</div>
            <IconContext.Provider value={{ className: classes.collectBtn }}>
              <FaHeart className={classes.collect} />
            </IconContext.Provider>
          </div>
          <div className="d-flex">
            <div className={classes.label}>新北市</div>
            <div className={classes.label}>開團已截止</div>
          </div>
          <div className={`${classes.content} my-2`}>
            <div>2022/08/31 ~ 2022/09/01</div>
            <div>$2000</div>
          </div>
          <div className={classes.activityText}>
            <div className={classes.activityInt}>活動簡介：</div>
            <div className={classes.intContent}>
              身為島國人，「環島」是一個浪漫的體驗。「 野餐
              」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。「
              野餐」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。
            </div>
          </div>
          <div className={`${classes.intMore} mt-3`}>
            <div>
              <div className={classes.progressBar}>
                <div className={classes.bar}></div>
              </div>
              <div className={classes.progressBarText}>
                <div className={classes.limit}>目前人數：22</div>
                <div className={classes.limit}>活動名額：25</div>
              </div>
            </div>
            <Link to="/activity/camping/1" className={classes.more}>
              更多資訊
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityHorizontalCard;
