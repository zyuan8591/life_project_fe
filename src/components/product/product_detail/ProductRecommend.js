import React from 'react';
import Slider from './Slider';
import '../../../styles/product/_productRecommend.scss';
import ProductListSlider from './ProductListSlider';
import { useState, useEffect } from 'react';
const ProductRecommend = ({ data }) => {
  const [now, setNow] = useState(0);
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
    } else {
      setNow(0);
    }
  }, [windowDimenion]);
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
          <ProductListSlider
            now={now}
            total={12}
            data={data}
            itemWidth={120}
            minHeight={345}
          />
        </Slider>
      </div>
    </div>
  );
};

export default ProductRecommend;
