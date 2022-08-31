import React from 'react';

function ActivityHorizontalCard({ BsHeart, Link }) {
  return (
    <>
      <div className="activityHorizontalStyle">
        <div className="activityImg">
          <img
            src="/img/camping/activity_camping_img/camping_01_01.jpeg"
            alt="/"
          />
        </div>
        <div className="activityInformation">
          <div className="activityTitle mb-2">
            <div className="title">浪花野餐計畫</div>
            <BsHeart className="collect" />
          </div>
          <div className="d-flex">
            <div className="label">新北市</div>
            <div className="label">開團已截止</div>
          </div>
          <div className="content my-2">
            <div>2022/08/31 ~ 2022/09/01</div>
            <div>$2000</div>
          </div>
          <div className="activityText">
            <div className="activityInt">活動簡介：</div>
            <div className="intContent">
              身為島國人，「環島」是一個浪漫的體驗。「 野餐
              」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。「
              野餐」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。
            </div>
          </div>
          <div className="intMore mt-3">
            <div>
              <div className="progressBar">
                <div className="bar"></div>
              </div>
              <div className="progressBarText">
                <div className="limit">目前人數：22</div>
                <div className="limit">活動名額：25</div>
              </div>
            </div>
            <Link to="/activity/camping/1" className="more">
              更多資訊
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityHorizontalCard;
