import React from 'react';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Paicipant({
  children,
  cardWidth,
  displayTotal,
  userLength,
  userSlider,
  setUserSlider,
  paicipantData,
  data = [],
}) {
  const slideRight = (userLength, cardWidth, displayTotal) => {
    // 卡片寬 cardWidth, 呈現幾張 displayTotal
    console.log(userLength);
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
        {data.length !== 0 && (
          <h4>
            參加者 ({data[0].currentJoin}/{data[0].join_limit})
          </h4>
        )}
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
                slideRight(userLength, cardWidth, displayTotal);
              }}
            />
            {children}
          </div>
        ) : (
          <div style={{ fontSize: '16px', color: '#444' }}>尚無參加者</div>
        )}
      </div>
    </>
  );
}

export default Paicipant;
