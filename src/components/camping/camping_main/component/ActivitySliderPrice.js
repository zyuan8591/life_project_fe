import React from 'react';

function ActivitySliderPrice() {
  return (
    <>
      <div className="activitySlider">
        <p className="sliderText">活動費用</p>
        <input type="range" className="slider" />
        <div className="d-flex sliderSearch">
          <div>$100 - $3000</div>
          <button>篩選</button>
        </div>
      </div>
    </>
  );
}

export default ActivitySliderPrice;
