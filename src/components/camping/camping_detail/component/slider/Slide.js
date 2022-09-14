import React from 'react';
import classes from '../../../../../styles/moduleCss/camping_detail_page/Slide.module.scss';

import { IconContext } from 'react-icons';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

function Slide({
  children,
  contentLength,
  maxWidth,
  Slider,
  setSlider,
  cardWidth,
  displayContainer,
}) {
  // slideRight
  const slideRight = (totalLength, width, displayTotal) => {
    let nowLeft = 0;
    const left = Slider - width;
    let limitLeft = -width * (totalLength - displayTotal);
    if (left < limitLeft) return nowLeft;
    setSlider(left);
    nowLeft = left;
  };
  // slideLeft
  const slideLeft = (width) => {
    let nowLeft = 0;
    const left = Slider + width;
    if (left > 0) return nowLeft;
    setSlider(left);
    nowLeft = left;
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
        <div
          className={classes.productSlide}
          style={{ maxWidth: `${maxWidth}px` }}
        >
          {displayContainer >= contentLength ? (
            ''
          ) : (
            <>
              <div className={classes.sliderLeft}>
                <FaChevronLeft
                  onClick={() => {
                    slideLeft(cardWidth);
                  }}
                />
              </div>
              <div className={classes.sliderRight}>
                <FaChevronRight
                  onClick={() => {
                    slideRight(contentLength, cardWidth, displayContainer);
                  }}
                />
              </div>
            </>
          )}

          {/* slider */}
          {children}
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Slide;
