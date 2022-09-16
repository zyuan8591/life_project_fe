import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/activity/_activityMain.scss';

import { IconContext } from 'react-icons';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

function ActivityMain() {
  return (
    <>
      <IconContext.Provider value={{ color: '#1F9998', size: '2rem' }}>
        <main className="activityMainPage">
          {/* camping */}
          <div className="activityCamping">
            <figure className="activityCampingImg">
              <img
                src="/img/camping/activity_camping_img/camping_07_01.webp"
                alt="#/"
              />
            </figure>
            <div className="campingTitle">Do you like camping？</div>
            <div className="campingContainer">
              <div className="campingText">LET's GO CAMPING！</div>
              <div className="campingDetail">
                一個人也想露營？ <br />
                一起加入露營活動認識更多的朋友，
                <br />
                主打懶人露營，讓您如同入住酒店般舒適，
                <br />
                再也不用一身狼狽同樣能享受野趣的全新體驗！
              </div>
              <div className="text-end pt-4">
                <Link to="/activity/camping" className="campingBtnText">
                  我也想露營
                  <IoIosArrowDroprightCircle className="ms-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* picnic */}
          <div className="activityCamping">
            <figure className="activityCampingImg">
              <img
                src="/img/Camping/activity_Camping_img/picnic_13_01.jpg"
                alt="#/"
              />
            </figure>
            <div className="campingTitle">Do you like picnics？</div>
            <div className="campingContainer">
              <div className="campingText">LET's GO PICNIC！</div>
              <div className="campingDetail">
                節奏明快的臺北步調，用「野餐」享受相聚時光， <br />
                趁著風光明媚的假期，和家人、好友在草地上一同享受野餐之樂。
                <br />
                在這裡，野可以，浪漫一夏！
              </div>
              <div className="text-end pt-4">
                <Link to="/activity/picnic" className="campingBtnText">
                  我也想野餐
                  <IoIosArrowDroprightCircle className="ms-1" />
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Link to="/map">
          <div className="section">map</div>
        </Link>
      </IconContext.Provider>
    </>
  );
}

export default ActivityMain;
