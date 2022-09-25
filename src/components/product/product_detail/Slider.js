import React, { useState } from 'react';
import classes from '../../../styles/product/slider.module.scss';

import { IconContext } from 'react-icons';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const Slider = ({
  children,
  now,
  setNow,
  itemWidth,
  moveCount,
  total,
  maxWidth,
  pattern,
  showArrow,
}) => {
  // const [now, setNow] = useState(0);
  // const [maxWidth, setMaxWidth] = useState(900);
  // const [itemWidth, setItemWidth] = useState(300);
  // const [moveCount, setMoveCount] = useState(3);
  // const [total, setTotal] = useState(9);
  const [progressNow, setProgressNow] = useState(0);
  const [progressRound, setProgressRound] = useState(0);
  // console.log(now);
  const slideLeft = () => {
    if (now === 0) return;
    setNow(now + itemWidth * moveCount);
    setProgressNow(progressNow - progress);
    setProgressRound(progressRound - 1);
  };
  const slideRight = () => {
    if (now <= -(itemWidth * total - itemWidth * moveCount)) return;
    setNow(now - itemWidth * moveCount);
    setProgressNow(progressNow + progress);
    setProgressRound(progressRound + 1);
  };
  const progress = 300 / (total / moveCount);
  // console.log(progress);
  return (
    <>
      <div className={classes.sliderContainer}>
        <IconContext.Provider
          value={{ color: '#444', size: '2rem' }}
          className="cursor"
        >
          {pattern === 'recommend' ? (
            <div className={classes.recommendArrow}>
              <FaChevronLeft
                onClick={() => {
                  slideLeft();
                }}
              />
            </div>
          ) : (
            ''
          )}
          <div className={classes.item} style={{ width: `${maxWidth}px` }}>
            {children}
          </div>
          {pattern === 'recommend' ? (
            <div className={classes.recommendArrow}>
              <FaChevronRight
                onClick={() => {
                  slideRight();
                }}
              />
            </div>
          ) : (
            ''
          )}
        </IconContext.Provider>
      </div>
      {pattern === 'recommend' ? (
        <div className={classes.progressBar}>
          <div
            className={classes.progress}
            style={{
              width: `${progress}px`,
              transform: `translateX(${progressNow}px)`,
            }}
          ></div>
        </div>
      ) : (
        ''
      )}
      {pattern === 'rank' ? (
        <div className="d-flex justify-content-end align-items-center">
          <IconContext.Provider value={{ color: '#444', size: '1.3rem' }}>
            <div className={classes.cursor}>
              <IoIosArrowBack
                onClick={() => {
                  slideLeft();
                }}
              />
            </div>
            {[...Array(total / moveCount)].map((v, i) => {
              return (
                <div
                  className={
                    now === -(i * itemWidth * moveCount)
                      ? classes.progressRoundActive
                      : classes.progressRound
                  }
                  key={i}
                  onClick={() => {
                    setNow(-(i * itemWidth * moveCount));
                  }}
                ></div>
              );
            })}
            <div className={classes.cursor}>
              <IoIosArrowForward
                onClick={() => {
                  slideRight();
                }}
              />
            </div>
          </IconContext.Provider>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Slider;
