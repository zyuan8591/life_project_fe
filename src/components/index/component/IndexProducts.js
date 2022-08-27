import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CardSm from '../../public_component/CardSm';
import classes from '../../../styles/moduleCss/indexProduct.module.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const IndexProducts = () => {
  const cardClr = ['#f7f3ed', '#f6f2f7', '#fcf3f0', '#f7faf2'];

  const productListRef = useRef(null);

  // progress bar
  const progressRef = useRef(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const progressBarRef = useRef(null);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [progressState, setProgressState] = useState('0');
  const [styleState, setStyleState] = useState(`${progressState}%`);

  // product list
  const [productListWidth, setProductListWidth] = useState(0);
  const [vwState, setVwState] = useState(0);

  // set list width
  useLayoutEffect(() => {
    setProductListWidth(productListRef.current.scrollWidth);
    setProgressWidth(progressRef.current.offsetWidth);
    setProgressBarWidth(progressBarRef.current.offsetWidth);
    setVwState(window.innerWidth);
  }, []);
  window.addEventListener('resize', () => {
    setProductListWidth(productListRef.current.scrollWidth);
    setProgressWidth(progressRef.current.offsetWidth);
    setProgressBarWidth(progressBarRef.current.offsetWidth);
    setVwState(window.innerWidth);
  });

  useEffect(() => {
    setStyleState(`${progressState}%`);
  }, [progressState]);

  // scroll bar handler
  const controlHandler = (ctrl) => {
    let newState = 0;
    const max = ((progressBarWidth - progressWidth) / progressBarWidth) * 100;
    let productListPercent =
      (productListWidth - window.innerWidth) / productListWidth;
    let progressBarPercent =
      (progressBarWidth - progressWidth) / progressBarWidth;
    switch (ctrl) {
      case 'left':
        productListRef.current.scrollLeft -=
          (productListPercent / 4) * productListWidth;
        newState = Number(progressState) - (progressBarPercent / 4) * 100;
        if (newState < 0) newState = 0;
        setProgressState(newState);
        break;
      case 'right':
        productListRef.current.scrollLeft +=
          (productListPercent / 4) * productListWidth;
        newState = Number(progressState) + (progressBarPercent / 4) * 100;
        if (newState > max) newState = max;
        setProgressState(newState);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        ref={productListRef}
        className={classes.productList}
        onWheel={(e) => {
          e.preventDefault();
        }}
      >
        {Array(9)
          .fill(1)
          .map((d, i) => {
            return (
              <CardSm
                key={i}
                title="05.28 上架"
                type="TOSHIBA"
                name="AA_5566烤箱"
                img={`/img/product/product_img/kolin_KBO_SD1915_01.jpg`}
                link="/"
                bg={cardClr[0]}
              />
            );
          })}
      </div>
      <div className={classes.controller}>
        <div
          className={`flexCenter ${classes.controllLeft}`}
          onClick={() => {
            controlHandler('left');
          }}
        >
          <FaAngleLeft />
        </div>
        <div ref={progressBarRef} className={classes.dragLine}>
          <div
            ref={progressRef}
            className={classes.dragProgress}
            style={{ left: styleState }}
          ></div>
        </div>
        <div
          className={`flexCenter ${classes.controllRight}`}
          onClick={() => {
            controlHandler('right');
          }}
        >
          <FaAngleRight />
        </div>
      </div>
    </>
  );
};

export default IndexProducts;
