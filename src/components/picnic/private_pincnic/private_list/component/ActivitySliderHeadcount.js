import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivitySlider.module.scss';
import '../../../../../styles/picnic/camping_main/_activitySlider.scss';

function ActivitySliderHeadcount({
  minJoinPeople,
  setMinJoinPeople,
  maxJoinPeople,
  setMaxJoinPeople,
  setPageNow,
}) {
  const onAfterChange = (value) => {
    setMaxJoinPeople(value[1]);
    setMinJoinPeople(value[0]);
    setPageNow(1);
    // console.log(value);
  };
  return (
    <>
      <div className={classes.activitySlider}>
        <p className={classes.sliderText}>活動人數</p>
        <Slider
          className={classes.slider}
          range
          step={1}
          max={15}
          defaultValue={[0, 15]}
          // onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <div className={classes.sliderSearch}>
          <div>
            {minJoinPeople}人 - {maxJoinPeople}人
          </div>
          {/* <button>篩選</button> */}
        </div>
      </div>
    </>
  );
}

export default ActivitySliderHeadcount;
