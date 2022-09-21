import React from 'react';
import Slider from './Slider';
import '../../../styles/product/_productRecommend.scss';
import ProductListSlider from './ProductListSlider';
import { useState } from 'react';
const ProductRecommend = ({ data }) => {
  const [now, setNow] = useState(0);
  return (
    <div>
      <div className="recommendContainer">
        <Slider
          now={now}
          setNow={setNow}
          maxWidth={1000}
          moveCount={4}
          total={12}
          pattern={'recommend'}
          itemWidth={250}
        >
          <ProductListSlider now={now} total={12} data={data} />
        </Slider>
      </div>
    </div>
  );
};

export default ProductRecommend;
