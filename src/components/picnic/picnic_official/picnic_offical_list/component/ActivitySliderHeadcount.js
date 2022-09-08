import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';
import classes from '../../../../../styles/moduleCss/camping_main/ActivitySlider.module.scss';
import '../../../../../styles/camping/camping_main/_activitySlider.scss';

const onAfterChange = (value) => {
  // console.log('onAfterChange: ', value);
};

function ActivitySliderHeadcount() {
  return (
    <>
      <div className={classes.activitySlider}>
        <p className={classes.sliderText}>活動人數</p>
        <Slider
          className={classes.slider}
          range
          step={1}
          defaultValue={[0, 100]}
          // onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <div className={classes.sliderSearch}>
          <div>3人 - 12人</div>
          <button>篩選</button>
        </div>
      </div>
    </>
  );
}

export default ActivitySliderHeadcount;
