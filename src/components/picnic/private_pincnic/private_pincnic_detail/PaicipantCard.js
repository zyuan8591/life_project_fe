import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { API_URL_IMG } from '../../../../utils/config';

function PaicipantCard({ userSlider, paicipantData }) {
  //   console.log(userSlider);
  return (
    <>
      <div className="slider d-flex">
        <div
          className="d-flex slidewrap"
          style={{ transform: `translateX(${userSlider}px)` }}
        >
          {paicipantData.map((paicipantData) => {
            return (
              <div className="paicipantCard" key={uuidv4()}>
                <div className="avatar">
                  <img src={`${API_URL_IMG}${paicipantData.photo}`} alt="" />
                </div>
                <div className="userName my-2">{paicipantData.name}</div>
                <div className="back">
                  <div className="userIntro">
                    <FaQuoteLeft className="quoteIcon" />
                    {paicipantData.intro}
                    <FaQuoteRight className="quoteIcon" />
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
