import React from 'react';
import Slider from './Slider';
import '../../../styles/product/_productRecommend.scss';
import ProductListSlider from './ProductListSlider';
import { useState } from 'react';
const ProductRecommend = () => {
  const [now, setNow] = useState(0);
  return (
    <div>
      <div className="recommendContainer">
        <Slider
          now={now}
          setNow={setNow}
          maxWidth={900}
          moveCount={3}
          total={15}
          pattern={'recommend'}
          itemWidth={300}
        >
          <ProductListSlider now={now} total={9} />
        </Slider>
      </div>
    </div>
  );
};

export default ProductRecommend;
