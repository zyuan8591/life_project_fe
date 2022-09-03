import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';

const onAfterChange = (value) => {
  console.log('onAfterChange: ', value);
};

function ActivitySliderPrice() {
  return (
    <>
      <div className="activitySlider">
        <p className="sliderText">活動費用</p>
        <Slider
          className="slider"
          range
          step={1}
          defaultValue={[0, 100]}
          // onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <div className="d-flex sliderSearch">
          <div>$100 - $3000</div>
          <button>篩選</button>
        </div>
      </div>
    </>
  );
}

export default ActivitySliderPrice;
