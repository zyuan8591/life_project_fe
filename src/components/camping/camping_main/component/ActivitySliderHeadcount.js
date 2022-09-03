import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';

const onAfterChange = (value) => {
  console.log('onAfterChange: ', value);
};

function ActivitySliderHeadcount() {
  return (
    <>
      <div className="activitySlider">
        <p className="sliderText">活動人數</p>
        <Slider
          className="slider"
          range
          step={1}
          defaultValue={[0, 100]}
          // onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <div className="d-flex sliderSearch">
          <div>3人 - 12人</div>
          <button>篩選</button>
        </div>
      </div>
    </>
  );
}

export default ActivitySliderHeadcount;
