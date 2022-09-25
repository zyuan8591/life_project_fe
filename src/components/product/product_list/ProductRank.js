import React from 'react';
import '../../../styles/product/_productList.scss';
import Slider from '../product_detail/Slider';
import { useState, useEffect } from 'react';
import BreadCrumb from '../../public_component/BreadCrumb';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../../utils/config';

const ProductRank = () => {
  const [now, setNow] = useState(0);
  const [rankData, setRankData] = useState([]);
  const [moveCount, setMoveCount] = useState(5);
  const [itemWidth, setItemWidth] = useState(250 + 38);
  const [windowDimenion, detectHW] = useState(window.innerWidth);

  const detectSize = () => {
    detectHW(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);
  useEffect(() => {
    if (windowDimenion <= 400) {
      setNow(0);
      setMoveCount(3);
      setItemWidth(120 + 5);
    } else {
      setNow(0);
      setMoveCount(5);
      setItemWidth(250 + 38);
    }
  }, [windowDimenion]);
  // console.log(windowDimenion);
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/rank`);
      // console.log(result.data);
      setRankData(result.data);
    })();
  }, []);
  // console.log(width);
  return (
    <div className="reset">
      <div className="d-flex align-items-center justify-content-between title">
        <h4>商品一覽</h4>
        <BreadCrumb />
      </div>
      <div className="rankTitle">
        <h5>商品排名</h5>
      </div>
      {/* {window.innerWidth === 375 ? (
        <Slider
          now={now}
          setNow={setNow}
          maxWidth={1440}
          moveCount={moveCount}
          total={15}
          pattern={'rank'}
          itemWidth={itemWidth}
        >
          <div
            className="d-flex justify-content-between rankContainer"
            style={{
              transform: `translateX(${now}px)`,
              transition: '0.4s',
            }}
          >
            {rankData.map((v, i) => {
              let { name, color, img } = v;
              return (
                <div className="rank" key={i}>
                  <div
                    className={`${i === 0 ? 'one' : ''} ${
                      i === 1 ? 'two' : ''
                    } ${i === 2 ? 'three' : ''} number`}
                  >
                    <p>{i + 1}</p>
                  </div>
                  <figure>
                    <img
                      src={`${API_URL_IMG}/product/product_img/${img}`}
                      alt=""
                    />
                  </figure>
                  <p>
                    {name}（{color}）
                  </p>
                </div>
              );
            })}
          </div>
        </Slider>
      ) : (
        <Slider
          now={now}
          setNow={setNow}
          maxWidth={1440}
          moveCount={moveCount}
          total={15}
          pattern={'rank'}
          itemWidth={itemWidth}
        >
          <div
            className="d-flex justify-content-between rankContainer"
            style={{
              transform: `translateX(${now}px)`,
              transition: '0.4s',
            }}
          >
            {rankData.map((v, i) => {
              let { name, color, img } = v;
              return (
                <div className="rank" key={i}>
                  <div
                    className={`${i === 0 ? 'one' : ''} ${
                      i === 1 ? 'two' : ''
                    } ${i === 2 ? 'three' : ''} number`}
                  >
                    <p>{i + 1}</p>
                  </div>
                  <figure>
                    <img
                      src={`${API_URL_IMG}/product/product_img/${img}`}
                      alt=""
                    />
                  </figure>
                  <p>
                    {name}（{color}）
                  </p>
                </div>
              );
            })}
          </div>
        </Slider>
      )} */}
      <Slider
        now={now}
        setNow={setNow}
        maxWidth={1440}
        moveCount={moveCount}
        total={15}
        pattern={'rank'}
        itemWidth={itemWidth}
      >
        <div
          className="d-flex justify-content-between rankContainer"
          style={{
            transform: `translateX(${now}px)`,
            transition: '0.4s',
          }}
        >
          {rankData.map((v, i) => {
            let { name, color, img } = v;
            return (
              <div className="rank" key={i}>
                <div
                  className={`${i === 0 ? 'one' : ''} ${i === 1 ? 'two' : ''} ${
                    i === 2 ? 'three' : ''
                  } number`}
                >
                  <p>{i + 1}</p>
                </div>
                <figure>
                  <img
                    src={`${API_URL_IMG}/product/product_img/${img}`}
                    alt=""
                  />
                </figure>
                <p>
                  {name}（{color}）
                </p>
              </div>
            );
          })}
        </div>
      </Slider>
    </div>
  );
};

export default ProductRank;
