import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { MdLocationOn } from 'react-icons/md';
import classes from '../../../../../styles/moduleCss/camping_detail_page/PlaceSlide.module.scss';

function PlaceSlide({ placeSlider, product }) {
  return (
    <>
      <div className={classes.slide}>
        <div
          className={classes.placeSlider}
          style={{ transform: `translateX(${placeSlider}px)` }}
        >
          <IconContext.Provider value={{ color: '#444', size: '1.5rem' }}>
            {/* card 更換 */}
            {product.map((v) => {
              return (
                <div className={classes.placeSliderContainer} key={uuidv4()}>
                  <div className={classes.contentDate}>
                    2022/08/20 ~ 2022/09/20
                  </div>
                  <div className={classes.contentName}>今夏CAMPING了嗎？</div>
                  <div className="d-flex align-items-center">
                    <MdLocationOn />
                    <div className={classes.contentCounty}>台北市</div>
                  </div>
                  <div className={classes.contentDistance}>
                    距離當前活動：345 公尺
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
