import React from 'react';
import classes from '../../../../../styles/moduleCss/camping_main/ActivityCard.module.scss';
import { IconContext } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function ActivityCard() {
  return (
    <>
      <div className={classes.activityCardStyle}>
        <div className={classes.activityImg}>
          <img
            src="/img/camping/activity_camping_img/camping_01_01.jpeg"
            alt="/"
          />
        </div>
        <div className={classes.activityInfo}>
          <div className={`${classes.activityTitle} my-2`}>
            <div className={classes.title}>浪花露營計畫</div>
            <IconContext.Provider value={{ className: classes.collectBtn }}>
              <FaHeart className={classes.collect} />
            </IconContext.Provider>
          </div>
          <div className={`d-flex ${classes.labelContent}`}>
            <div className="d-flex">
              <div className={classes.label}>新北市</div>
              <div className={classes.label}>開團已截止</div>
            </div>
            <div className={classes.price}>$2000</div>
          </div>

          <div className={`${classes.activityDate} my-2`}>
            <div>2022/08/31 ~ 2022/09/01</div>
          </div>
          <div className={classes.progressBar}>
            <div className={classes.bar}></div>
          </div>
          <div className={classes.content}>
            <div className={classes.limit}>目前人數：22</div>
            <div className={classes.limit}>活動名額：25</div>
          </div>
          <div className={`${classes.activityText} mt-1`}>
            <div className={classes.activityInt}>活動簡介：</div>
            <div className={classes.intContent}>
              身為島國人，「環島」是一個浪漫的體驗。「 野餐
              」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。，透過土地產生情感上的凝聚與連結。
            </div>
          </div>
          <div className={`${classes.intMore} my-1`}>
            <IconContext.Provider value={{ className: classes.moreIcon }}>
              <Link to="/activity/picnic/official/:id" className={classes.more}>
                more
                <HiChevronDoubleRight />
              </Link>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityCard;
