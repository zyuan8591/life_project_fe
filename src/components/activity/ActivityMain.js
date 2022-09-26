import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../styles/moduleCss/activity_main/ActivityMain.module.scss';
import MapMainPage from '../map/component/MapMainPage';
import { IconContext } from 'react-icons';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

function ActivityMain() {
  return (
    <>
      <main className={classes.activityMainPage}>
        {/* camping */}
        <div className={classes.activityCamping}>
          <figure className={classes.activityCampingImg}>
            <img
              src="/img/camping/activity_camping_img/camping_07_01.webp"
              alt="#/"
            />
          </figure>
          <div className={classes.campingTitle}>Do you like camping？</div>
          <div className={classes.campingContainer}>
            <div className={classes.campingText}>LET's GO CAMPING！</div>
            <div className={classes.campingDetail}>
              一個人也想露營？ <br />
              一起加入露營活動認識更多的朋友，
              <br />
              主打懶人露營，讓您如同入住酒店般舒適，
              <br />
              再也不用一身狼狽同樣能享受野趣的全新體驗！
            </div>
            <div className={`${classes.linkTo} p-view`}>
              <IconContext.Provider
                value={{
                  color: '#1F9998',
                  size: '2rem',
                }}
              >
                <Link to="/activity/camping" className={classes.campingBtnText}>
                  我也想露營
                  <IoIosArrowDroprightCircle className="ms-1 mb-1" />
                </Link>
              </IconContext.Provider>
            </div>

            {/* RWD */}
            <div className={`${classes.linkTo} m-view`}>
              <IconContext.Provider
                value={{
                  color: '#1F9998',
                  size: '1.3rem',
                }}
              >
                <Link to="/activity/camping" className={classes.campingBtnText}>
                  我也想露營
                  <IoIosArrowDroprightCircle className="ms-1 mb-1" />
                </Link>
              </IconContext.Provider>
            </div>
            {/* ------ */}
          </div>
        </div>

        {/* picnic */}
        <div className={`${classes.activityCamping}`}>
          <figure className={classes.activityCampingImg}>
            <img
              src="/img/picnic/activity_picnic_img/picnic_01_01.jpg"
              alt="#/"
            />
          </figure>
          <div className={classes.campingTitle}>Do you like picnics？</div>
          <div className={classes.campingContainer}>
            <div className={classes.campingText}>LET's GO PICNIC！</div>
            <div className={`${classes.campingDetail} p-view`}>
              節奏明快的臺北步調，用「野餐」享受相聚時光， <br />
              趁著風光明媚的假期，和家人、好友在草地上一同享受野餐之樂。
              <br />
              在這裡，野可以，浪漫一夏！
            </div>
            {/* RWD */}
            <div className={`${classes.campingDetail} m-view`}>
              節奏明快的臺北步調，用「野餐」享受相聚時光 <br />
              趁著風光明媚的假期，和家人、好友
              <br />
              在草地上一同享受野餐之樂。
              <br />
              在這裡，野可以，浪漫一夏！
            </div>
            {/* ------ */}
            <div className={`${classes.linkTo} p-view`}>
              <IconContext.Provider
                value={{
                  color: '#1F9998',
                  size: '2rem',
                }}
              >
                <Link to="/activity/picnic" className={classes.campingBtnText}>
                  我也想野餐
                  <IoIosArrowDroprightCircle className="ms-1 mb-1" />
                </Link>
              </IconContext.Provider>
            </div>
            {/* RWD */}
            <div className={`${classes.linkTo} m-view`}>
              <IconContext.Provider
                value={{
                  color: '#1F9998',
                  size: '1.3rem',
                }}
              >
                <Link to="/activity/picnic" className={classes.campingBtnText}>
                  我也想野餐
                  <IoIosArrowDroprightCircle className="ms-1 mb-1" />
                </Link>
              </IconContext.Provider>
            </div>
            {/* ------ */}
          </div>
        </div>
      </main>
      <MapMainPage />
    </>
  );
}

export default ActivityMain;
