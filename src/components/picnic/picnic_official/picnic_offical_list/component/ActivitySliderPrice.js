import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivitySlider.module.scss';
import '../../../../../styles/picnic/camping_main/_activitySlider.scss';
// const onAfterChange = (value) => {
//   // console.log('onAfterChange: ', value);
// };

function ActivitySliderPrice({
  maxPrice,
  setMaxPrice,
  minPrice,
  setMinPrice,
  setPageNow,
  data,
}) {
  function log(value) {
    setMaxPrice(value[1]);
    setMinPrice(value[0]);
    setPageNow(1);
    // console.log(value);
  }
  return (
    <>
      <div className={classes.activitySlider}>
        <p className={classes.sliderText}>活動費用</p>
        <Slider
          className={classes.slider}
          range
          step={1}
          max={2500}
          defaultValue={[0, 2500]}
          // onChange={onChange}
          onAfterChange={log}
        />
        <div className={classes.sliderSearch}>
          <div>
            ${minPrice} - ${maxPrice}
          </div>
          <button>篩選</button>
        </div>
      </div>
    </>
  );
}

export default ActivitySliderPrice;
