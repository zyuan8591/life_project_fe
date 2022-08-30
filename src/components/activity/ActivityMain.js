import React from 'react';
import '../../styles/activity/_activityMain.scss';
import { IconContext } from 'react-icons';

import { IoIosArrowDroprightCircle } from 'react-icons/io';

function ActivityMain() {
  return (
    <>
      <IconContext.Provider value={{ color: '#1F9998', size: '2.5rem' }}>
        <main>
          <div className="main">
            <div className="mainBackgroundLeft">
              <img
                src="/img/camping/activity_camping_img/main_background_1.gif"
                alt="activity"
              />
            </div>
            <div className="mainBackgroundRight">
              <img
                src="/img/camping/activity_camping_img/main_background_4.gif"
                alt="activity"
              />
            </div>
            <h5>LIFE --- 活動專區 </h5>
            {/* picnic */}
            <div className="d-flex picnic">
              <div className="bannerPicnic">
                <img
                  src="/img/camping/activity_camping_img/main_img_2.png"
                  alt="activity"
                />
              </div>
              <div className="wrap">
                <div className="picnicGirl">
                  <img
                    src="/img/camping/activity_camping_img/camping_others_02.png"
                    alt="girl"
                  />
                </div>
                <div className="content d-flex">
                  <p className="m-0">我也想野餐</p>
                  <IoIosArrowDroprightCircle />
                </div>
              </div>
            </div>
            {/* camping */}
            <div className="pt-5 camping d-flex ">
              <div className="wrap d-flex flex-column">
                <div className="content d-flex">
                  <p className="m-0">我也想露營</p>
                  <IoIosArrowDroprightCircle />
                </div>
                <div className="picnicBoy">
                  <img
                    src="/img/camping/activity_camping_img/camping_others_01.png"
                    alt="boy"
                  />
                </div>
              </div>
              <div className="bannerPicnic">
                <img
                  src="/img/camping/activity_camping_img/main_img_2.png"
                  alt="activity"
                />
              </div>
            </div>
          </div>

          <div className="section">map</div>
        </main>
      </IconContext.Provider>
    </>
  );
}

export default ActivityMain;
