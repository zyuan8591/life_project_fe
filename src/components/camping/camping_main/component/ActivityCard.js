import React from 'react';

function ActivityCard({
  FaHeart,
  IoIosArrowDroprightCircle,
  Link,
  IconContext,
}) {
  return (
    <>
      <div className="activityCardStyle">
        <div className="activityImg">
          <img
            src="/img/camping/activity_camping_img/camping_01_01.jpeg"
            alt="/"
          />
        </div>
        <div className="activityInformation">
          <div className="activityTitle my-2">
            <div className="title">浪花露營計畫</div>
            <IconContext.Provider value={{ className: 'collectBtn' }}>
              <FaHeart className="collect" />
            </IconContext.Provider>
          </div>
          <div className="d-flex labelContent">
            <div className="d-flex">
              <div className="label">新北市</div>
              <div className="label">開團已截止</div>
            </div>
            <div className="price">$2000</div>
          </div>

          <div className="activityDate my-2">
            <div>2022/08/31 ~ 2022/09/01</div>
          </div>
          <div className="progressBar">
            <div className="bar"></div>
          </div>
          <div className="content">
            <div className="limit">目前人數：22</div>
            <div className="limit">活動名額：25</div>
          </div>
          <div className="activityText mt-1">
            <div className="activityInt">活動簡介：</div>
            <div className="intContent">
              身為島國人，「環島」是一個浪漫的體驗。「 野餐
              」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。，透過土地產生情感上的凝聚與連結。
            </div>
          </div>
          <div className="intMore my-1">
            <IconContext.Provider value={{ className: 'moreIcon' }}>
              <Link to="/activity/camping/1" className="more">
                more
                <IoIosArrowDroprightCircle />
              </Link>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityCard;
