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
          maxWidth={750}
          moveCount={3}
          total={9}
          pattern={'recommend'}
          itemWidth={250}
        >
          <ProductListSlider now={now} total={9} data={data} />
        </Slider>
      </div>
    </div>
  );
};

export default ProductRecommend;
