import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API_URL_IMG } from '../../../../utils/config';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

function Paicipant({ cardWidth, displayTotal, paicipantData }) {
  const [user, setUser] = useState(paicipantData);
  const userLength = user.length; //總共幾張
  const [userSlider, setUserSlider] = useState(0); //移動值

  const slideRight = (cardWidth, displayTotal) => {
    // 卡片寬 cardWidth, 呈現幾張 displayTotal
    // console.log(displayTotal);
    let nowLeft = 0;
    const leftMove = userSlider - cardWidth; //往左移動多少寬度
    let limitLeftMove = -cardWidth * (userLength - displayTotal);
    if (leftMove < limitLeftMove) return nowLeft;
    setUserSlider(leftMove);
    nowLeft = leftMove;
  };
  const slideLeft = (cardWidth) => {
    // console.log(cardWidth);
    let nowLeft = 0;
    const rightMove = userSlider + cardWidth;
    if (rightMove > 0) return nowLeft;
    setUserSlider(rightMove);
    nowLeft = rightMove;
  };

  return (
    <>
      <div className="paicipant">
        <h4>參加者(7/25)</h4>
        {paicipantData.length > 0 ? (
          <div className="arrowIconSlider">
            <IoIosArrowBack
              className="arrowIconLeft"
              onClick={() => {
                slideLeft(cardWidth);
              }}
            />
            <IoIosArrowForward
              className="arrowIconRight "
              onClick={() => {
                slideRight(cardWidth, displayTotal);
              }}
            />
            <div className="slider d-flex">
              <div
                className="d-flex slidewrap"
                style={{ transform: `translateX(${userSlider}px)` }}
              >
                {paicipantData.map((paicipantData) => {
                  return (
                    <div className="paicipantCard" key={uuidv4()}>
                      <div className="avatar">
                        <img
                          src={`${API_URL_IMG}${paicipantData.photo}`}
                          alt=""
                        />
                      </div>
                      <div className="userName my-2">{paicipantData.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="userIntro">
              <p>
                <FaQuoteLeft className="quoteIcon" />
                {paicipantData.intro}
                <FaQuoteRight className="quoteIcon" />
              </p>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '16px', color: '#444' }}>尚無參加者</div>
        )}
      </div>
    </>
  );
}

export default Paicipant;
