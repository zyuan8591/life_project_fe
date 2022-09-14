import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';
import classes from '../../../../styles/moduleCss/camping_main/ActivitySlider.module.scss';
import '../../../../styles/camping/camping_main/_activitySlider.scss';

function ActivitySliderPrice({
  setMaxPrice,
  setMinPrice,
  minPrice,
  maxPrice,
  setPage,
}) {
  function log(value) {
    setMaxPrice(value[1]);
    setMinPrice(value[0]);
    setPage(1);
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
          max={9900}
          defaultValue={[0, 9900]}
          // onChange={log}
          onAfterChange={log}
        />
        <div className={classes.sliderSearch}>
          <div className="my-2">
            $ {minPrice} - $ {maxPrice}
          </div>
          {/* <button>篩選</button> */}
        </div>
      </div>
    </>
  );
}

export default ActivitySliderPrice;
