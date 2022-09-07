/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CardSm from '../../public_component/CardSm';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// emotion css
const hoverClr = '#eee';
const subClrBrown = '#817161';
const productList = css`
  margin: 2.5rem 0;
  padding-left: 0.5rem;
  display: flex;
  gap: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.3s;
`;
const dragLine = css`
  max-width: 350px;
  width: 350px;
  height: 3px;
  background: ${hoverClr};
  margin: 0 auto;
  position: relative;
  flex-grow: 0;
`;
const dragProgress = css`
  position: relative;
  top: 0;
  left: 0;
  width: 100px;
  height: 3px;
  background: ${subClrBrown};
  z-index: 2;
  transition: 0.3s;
`;
const controller = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 400px;
`;
const controlDir = css`
  cursor: pointer;
`;

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
  useEffect(() => {
    window.addEventListener('resize', () => {
      setProductListWidth(productListRef.current.scrollWidth);
      setProgressWidth(progressRef.current.offsetWidth);
      setProgressBarWidth(progressBarRef.current.offsetWidth);
      setVwState(window.innerWidth);
    });
    setProductListWidth(productListRef.current.scrollWidth);
    setProgressWidth(progressRef.current.offsetWidth);
    setProgressBarWidth(progressBarRef.current.offsetWidth);
    setVwState(window.innerWidth);
  }, []);

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
      <div ref={productListRef} css={productList}>
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
      <div css={controller}>
        <div
          className="flexCenter"
          css={controlDir}
          onClick={() => {
            controlHandler('left');
          }}
        >
          <FaAngleLeft />
        </div>
        <div ref={progressBarRef} css={dragLine}>
          <div
            ref={progressRef}
            css={dragProgress}
            style={{ left: styleState }}
          ></div>
        </div>
        <div
          className="flexCenter"
          css={controlDir}
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
