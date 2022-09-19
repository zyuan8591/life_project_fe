import React from 'react';
import classes from '../../../../styles/moduleCss/camping_detail_page/CampingDetailJoinSlide.module.scss';

function CampingDetailJoinSlide({ joinSlider, v }) {
  return (
    <>
      <div
        className={classes.slideContent}
        style={{
          transform: `translateX(${joinSlider}px)`,
        }}
      >
        <div className={classes.joinUser}>
          <div className={classes.userImg}>
            <img src={`/img/user/user_img/${v.photo}`} alt="/" />
          </div>
          <div className={classes.userName}>{v.name}</div>
          <div className={classes.back}>
            <div className={classes.backbcg}>
              <div className={classes.backInt}>{v.intro}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampingDetailJoinSlide;
