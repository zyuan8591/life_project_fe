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
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/rank`);
      // console.log(result.data);
      setRankData(result.data);
    })();
  }, []);
  return (
    <div className="reset">
      <div className="d-flex align-items-center justify-content-between title">
        <h4>商品一覽</h4>
        <BreadCrumb />
      </div>
      <div className="rankTitle">
        <h5>商品排名</h5>
      </div>
      <Slider
        now={now}
        setNow={setNow}
        maxWidth={1440}
        moveCount={5}
        total={15}
        pattern={'rank'}
        itemWidth={250 + 38}
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
