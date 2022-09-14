import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';
import classes from '../../../../styles/moduleCss/camping_main/ActivitySlider.module.scss';
import '../../../../styles/camping/camping_main/_activitySlider.scss';

function ActivitySliderHeadcount({
  setMinJoinTtl,
  setMaxJoinTtl,
  setPage,
  minJoinTtl,
  maxJoinTtl,
}) {
  const onAfterChange = (value) => {
    setMaxJoinTtl(value[1]);
    setMinJoinTtl(value[0]);
    setPage(1);
  };
  return (
    <>
      <div className={classes.activitySlider}>
        <p className={classes.sliderText}>活動人數</p>
        <Slider
          className={classes.slider}
          range
          step={1}
          max={22}
          defaultValue={[0, 22]}
          // onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <div className={classes.sliderSearch}>
          <div className="my-2">
            {minJoinTtl} 人 - {maxJoinTtl} 人
          </div>
          {/* <button>篩選</button> */}
        </div>
      </div>
    </>
  );
}

export default ActivitySliderHeadcount;
