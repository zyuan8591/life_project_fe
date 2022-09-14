import React from 'react';
import classes from '../../../../styles/moduleCss/camping_detail_page/CampingDetailJoinSlide.module.scss';

function CampingDetailJoinSlide({ joinSlider }) {
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
            <img src="/img/user/company_icon/aarke.jpg" alt="/" />
          </div>
          <div className={classes.userName}>Joe</div>
          <div className={classes.back}>
            <div className={classes.backbcg}>
              <div className={classes.backInt}>
                我喜歡輕鬆隨性的旅行，曾經去過許多國家，理解了旅行的意義，若你也有跟我一樣的人生經驗，可以一起來聊聊！！
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampingDetailJoinSlide;
