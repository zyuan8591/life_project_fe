import React from 'react';
import '../../../styles/product/_productList.scss';
import Slider from '../product_detail/Slider';
import { useState } from 'react';
import BreadCrumb from '../../public_component/BreadCrumb';
const slideImg = '/img/product/product_img/BRUNO_BOE021_RD_01.jpeg';

const ProductRank = () => {
  const [now, setNow] = useState(0);
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
        itemWidth={220}
      >
        <div className="d-flex justify-content-between">
          {[...Array(15)].map((v, i) => {
            return (
              <div className="rank" key={i}>
                <div className="number">
                  <p>{i + 1}</p>
                </div>
                <figure style={{}}>
                  <img src={slideImg} alt="" />
                </figure>
                <p>BOE021 多功能電烤盤-經典款（紅色）</p>
              </div>
            );
          })}
        </div>
      </Slider>
    </div>
  );
};

export default ProductRank;
