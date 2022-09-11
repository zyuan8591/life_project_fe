import React, { useState } from 'react';
import classes from '../../../styles/product/slider.module.scss';

import { IconContext } from 'react-icons';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
const Slider = ({
  children,
  now,
  setNow,
  itemWidth,
  moveCount,
  total,
  maxWidth,
  pattern,
}) => {
  // const [now, setNow] = useState(0);
  // const [maxWidth, setMaxWidth] = useState(900);
  // const [itemWidth, setItemWidth] = useState(300);
  // const [moveCount, setMoveCount] = useState(3);
  // const [total, setTotal] = useState(9);
  console.log(maxWidth);
  const [progressNow, setProgressNow] = useState(0);
  const slideLeft = () => {
    if (now === 0) return;
    setNow(now + itemWidth * moveCount);
    setProgressNow(progressNow - progress);
  };
  const slideRight = () => {
    if (now <= -(itemWidth * total - itemWidth * moveCount)) return;
    setNow(now - itemWidth * moveCount);
    setProgressNow(progressNow + progress);
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
          {pattern === 'recommend' ? {} : ''}
          <div className={classes.cursor}>
            <FaChevronLeft
              onClick={() => {
                slideLeft();
              }}
            />
          </div>
          <div className={classes.item} style={{ width: `${maxWidth}px` }}>
            {children}
          </div>
          <div className={classes.cursor}>
            <FaChevronRight
              onClick={() => {
                slideRight();
              }}
            />
          </div>
        </IconContext.Provider>
      </div>
      <div className={classes.progressBar}>
        <div
          className={classes.progress}
          style={{
            width: `${progress}px`,
            transform: `translateX(${progressNow}px)`,
          }}
        ></div>
      </div>
    </>
  );
};

export default Slider;
