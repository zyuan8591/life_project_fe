import React from 'react';
import '../../../styles/picnic/_picnicOffical.scss';
import { Link } from 'react-router-dom';

function PicnicOffical() {
  return (
    <>
      <div className="banner objectContain">
        <img
          className="bannerImg"
          src="/img/picnic/activity_picnic_img/picnic_detail_banner.webp"
          alt="picnic"
        />
      </div>
      <main className="main">
        <div className="aside">
          <div className="activityState">
            <h3>活動狀態</h3>
            <ul className="activityStateBtn">
              <li>
                <Link to="/">即將開團</Link>
              </li>
              <li>
                <Link to="/">開團中</Link>
              </li>
              <li>
                <Link to="/">已成團</Link>
              </li>
              <li>
                <Link to="/">開團已截止</Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default PicnicOffical;
