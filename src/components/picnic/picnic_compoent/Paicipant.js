import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const users = [
  { name: 'Hello', img: 'BRUNO_BOE029_R_02.jpeg' },
  { name: 'Amy', img: 'BRUNO_BOE043_PP_02.webp' },
  { name: 'May', img: 'BRUNO_BOE059_BGR_CE_02.jpeg' },
  { name: 'May', img: 'BRUNO_BOE059_BGR_CE_02.jpeg' },
  { name: 'Amy', img: 'BRUNO_BOE043_PP_02.webp' },
  { name: 'Amy', img: 'BRUNO_BOE043_PP_02.webp' },
  { name: 'Jay', img: 'CHANCOO_CC5800_WH_03.jpeg' },
];

function Paicipant({ cardWidth, displayTotal }) {
  const [user, setUser] = useState(users);
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
              {users.map((v) => {
                return (
                  <div className="paicipantCard" key={uuidv4()}>
                    <div className="avatar">
                      <img src={`/img/product/product_img/${v.img}`} alt="" />
                    </div>
                    <div className="userName my-2">{v.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="userIntro">
            <p>
              <FaQuoteLeft className="quoteIcon" />
              我是朋友圈中的開心果，天生有著幽默風趣的性格，相信有我的加入，絕對是帶動氣氛的重要角色。
              <FaQuoteRight className="quoteIcon" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Paicipant;
