import React from 'react';

function ActivitySliderHeadcount() {
  return (
    <>
      <div className="activitySlider">
        <p className="sliderText">活動人數</p>
        <input type="range" className="slider" />
        <div className="d-flex sliderSearch">
          <div>3人 - 12人</div>
          <button>篩選</button>
        </div>
      </div>
    </>
  );
}

export default ActivitySliderHeadcount;
