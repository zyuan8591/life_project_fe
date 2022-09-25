import { useState } from 'react';
import classes from '../../../styles/moduleCss/picnic_offical_detail/picnicOfficalDetail.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { API_URL_IMG } from '../../../utils/config';

//
function PaicipantCard({ userSlider, paicipantData }) {
  //   console.log(userSlider);
  return (
    <>
      <div className={`${classes.slider} d-flex`}>
        <div
          className={`${classes.slidewrap} d-flex`}
          style={{ transform: `translateX(${userSlider}px)` }}
        >
          {paicipantData.map((paicipantData) => {
            return (
              <div className={classes.paicipantCard} key={uuidv4()}>
                <div className={classes.avatar}>
                  <img src={`${API_URL_IMG}${paicipantData.photo}`} alt="" />
                </div>
                <div className={`${classes.userName} my-1`}>
                  {paicipantData.name}
                </div>
                {/* <div className="userIntro1 my-2">{paicipantData.intro}</div> */}
                <div className={classes.back}>
                  <div className={classes.userIntro}>
                    <FaQuoteLeft className={classes.quoteIcon} />
                    {paicipantData.intro}
                    <FaQuoteRight className={classes.quoteIcon} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PaicipantCard;
