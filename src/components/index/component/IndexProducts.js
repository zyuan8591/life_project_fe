/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CardSm from '../../public_component/CardSm';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../../../utils/config';

// emotion css
const hoverClr = '#eee';
const subClrBrown = '#817161';
const productList = css`
  margin: 2.5rem 0;
  padding-left: 0.5rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  transition: 0.3s;
  @media (max-width: 768px) {
    margin: 1.5rem 0;
  }
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
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
  const [data, setData] = useState([]);
  const cardClr = ['#f7f3ed', '#f6f2f7', '#fcf3f0', '#f7faf2'];

  // get default data
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/index`);
      result = result.data.map((d, i) => {
        return {
          id: d.id,
          name: d.name,
          image: d.img,
          brand: d.brand,
          date: d.created_time.slice(5, 11).replace(/-/g, '.'),
          color: cardClr[i % cardClr.length],
        };
      });
      setData(result);
    })();
  }, []);

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
  const [vwState, setVwState] = useState(window.innerWidth);

  // set list width
  const settingState = () => {
    setProductListWidth(productListRef.current.scrollWidth);
    setProgressWidth(progressRef.current.offsetWidth);
    setProgressBarWidth(progressBarRef.current.offsetWidth);
    setVwState(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', settingState);
    settingState();
    return function cleanUp() {
      window.removeEventListener('resize', settingState);
    };
  }, []);

  useEffect(() => {
    setStyleState(`${progressState}%`);
  }, [progressState]);

  // scroll bar handler
  const controlHandler = (ctrl) => {
    let newState = 0;
    const max = ((progressBarWidth - progressWidth) / progressBarWidth) * 100;
    let productListPercent = (productListWidth - vwState) / productListWidth;
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
        {data.map((d, i) => {
          return (
            <CardSm
              key={d.id}
              title={`${d.date} 上架`}
              type={d.brand}
              name={d.name}
              img={`/img/product/product_img/${d.image}`}
              link={`/products/${d.id}`}
              bg={d.color}
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
