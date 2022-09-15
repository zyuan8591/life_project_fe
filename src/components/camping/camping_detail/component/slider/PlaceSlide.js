import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { MdLocationOn } from 'react-icons/md';
import classes from '../../../../../styles/moduleCss/camping_detail_page/PlaceSlide.module.scss';

function PlaceSlide({ placeSlider, mapDataId }) {
  const newAddress = (address) => {
    return address.substr(0, 6);
  };
  const newDistance = (distance) => {
    return Math.floor(distance);
  };

  return (
    <>
      <div className={classes.slide}>
        <div
          className={classes.placeSlider}
          style={{ transform: `translateX(${placeSlider}px)` }}
        >
          <IconContext.Provider value={{ color: '#444', size: '1.5rem' }}>
            {/* card 更換 */}
            {mapDataId.map((v) => {
              return (
                <div className={classes.placeSliderContainer} key={v.id}>
                  <div className={classes.contentDate}>{v.activity_date}</div>
                  <div className={classes.contentName}>{v.place}</div>
                  <div className="d-flex align-items-center">
                    <MdLocationOn />
                    <div className={classes.contentCounty}>
                      {newAddress(v.address)}
                    </div>
                  </div>
                  <div className={classes.contentDistance}>
                    距離當前活動： {newDistance(v.distance)} 公尺
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className={classes.contentImg}>
                        <img src="/img/user/company_icon/aarke.jpg" alt="" />
                      </div>
                      <div className={classes.contentImg}>
                        <img src="/img/user/company_icon/aarke.jpg" alt="" />
                      </div>
                    </div>
                    <Link
                      to="/activity/camping/1"
                      className={classes.contentBtn}
                    >
                      更多詳情
                    </Link>
                  </div>
                </div>
              );
            })}
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
}

export default PlaceSlide;
