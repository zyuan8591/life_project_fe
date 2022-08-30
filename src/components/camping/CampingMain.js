import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IconContext } from 'react-icons';
import '../../styles/camping/_campingMain.scss';
import { AiOutlineBars } from 'react-icons/ai';
import { BsGridFill, BsHeart } from 'react-icons/bs';

const activityState = [
  { state: '即將開團', style: '#817161' },
  { state: '開團中', style: '#F2AC33' },
  { state: '已成團', style: '#1F9998' },
  { state: '開團已截止', style: '#B9BDC5' },
];

function CampingMain() {
  const [stateSearch, setStateSearch] = useState(activityState);

  return (
    <IconContext.Provider value={{ color: '#8C7161', size: '2rem' }}>
      <main>
        <div className="main">
          <div className="banner">
            <img
              src="/img/camping/activity_camping_img/main_img_4.gif"
              alt="camping"
            />
          </div>
          <p className="breadCrumb py-3">LIFE --- 活動專區 </p>
          <p className="intText">
            一個人也想露營嗎？ <br />
            一起加入露營活動認識更多的朋友
            <br />
            主打懶人露營，讓您如同入住酒店般舒適
            <br />
            再也不用一身狼狽同樣能享受野趣的全新體驗
          </p>
          <div className="contain">
            <div className="row m-0">
              {/* 左側篩選欄 */}
              <div className="col-4">
                <div className="activityState">
                  <p className="stateText">活動狀態</p>
                  {stateSearch.map((v, i) => {
                    return (
                      <button
                        key={uuidv4()}
                        className="searchBtn"
                        style={{ backgroundColor: v.style }}
                      >
                        {v.state}
                      </button>
                    );
                  })}
                </div>
                <div className="activityPrice">
                  <p className="priceText">活動費用</p>
                  <input type="range" className="slider" />
                  <div className="d-flex priceSearch">
                    <div>$100 - $3000</div>
                    <button>篩選</button>
                  </div>
                </div>
                <div className="activityPrice">
                  <p className="priceText">活動人數</p>
                  <input type="range" className="slider" />
                  <div className="d-flex priceSearch">
                    <div>3人 - 12人</div>
                    <button>篩選</button>
                  </div>
                </div>
                <div className="activityDate">
                  <p className="dateText">活動日期</p>
                  <div className="d-flex ms-3">
                    <input type="date" />
                    <div className="mx-3">-</div>
                    <input type="date" />
                  </div>
                </div>
              </div>
              {/* 右側活動列表 */}
              <div className="col-8" style={{ backgroundColor: 'orange' }}>
                <div className="mb-3">
                  <AiOutlineBars className="me-3 changeBtn" />
                  <BsGridFill className="changeBtn" />
                </div>
                <IconContext.Provider value={{ color: '#000', size: '1.3rem' }}>
                  <div className="row gx-2" style={{ backgroundColor: '#ccc' }}>
                    {/* 列表 card */}
                    <div className="col-4 wrap">
                      <div className="activityImg">
                        <img
                          src="/img/camping/activity_camping_img/camping_01_01.jpeg"
                          alt="/"
                        />
                      </div>
                      <div className="activityInformation">
                        <div className="activityTitle my-2">
                          <div className="title">浪花野餐計畫</div>
                          <BsHeart className="collect" />
                        </div>
                        <div className="d-flex">
                          <div className="label">新北市</div>
                          <div className="label">開團已截止</div>
                        </div>
                        <div className="content my-1">
                          <div>2022-08-30</div>
                          <div>$2000</div>
                        </div>
                        <div className="limit">活動名額： 25</div>
                        <div className="activityText mt-1">
                          <div className="activityInt">活動簡介：</div>
                          <div className="intContent">
                            身為島國人，「環島」是一個浪漫的體驗。「 野餐
                            」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。，透過土地產生情感上的凝聚與連結。
                          </div>
                        </div>
                        <div className="intMore my-2">
                          <a className="more">更多資訊</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 wrap">
                      <div className="activityImg">
                        <img
                          src="/img/camping/activity_camping_img/camping_01_01.jpeg"
                          alt="/"
                        />
                      </div>
                      <div className="activityInformation">
                        <div className="activityTitle my-2">
                          <div className="title">浪花野餐計畫</div>
                          <BsHeart className="collect" />
                        </div>
                        <div className="d-flex">
                          <div className="label">新北市</div>
                          <div className="label">開團已截止</div>
                        </div>
                        <div className="content my-1">
                          <div>2022-08-30</div>
                          <div>$2000</div>
                        </div>
                        <div className="limit">活動名額： 25</div>
                        <div className="activityText mt-1">
                          <div className="activityInt">活動簡介：</div>
                          <div className="intContent">
                            身為島國人，「環島」是一個浪漫的體驗。「 野餐
                            」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。，透過土地產生情感上的凝聚與連結。
                          </div>
                        </div>
                        <div className="intMore my-2">
                          <a className="more">更多資訊</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 wrap">
                      <div className="activityImg">
                        <img
                          src="/img/camping/activity_camping_img/camping_01_01.jpeg"
                          alt="/"
                        />
                      </div>
                      <div className="activityInformation">
                        <div className="activityTitle my-2">
                          <div className="title">浪花野餐計畫</div>
                          <BsHeart className="collect" />
                        </div>
                        <div className="d-flex">
                          <div className="label">新北市</div>
                          <div className="label">開團已截止</div>
                        </div>
                        <div className="content my-1">
                          <div>2022-08-30</div>
                          <div>$2000</div>
                        </div>
                        <div className="limit">活動名額： 25</div>
                        <div className="activityText mt-1">
                          <div className="activityInt">活動簡介：</div>
                          <div className="intContent">
                            身為島國人，「環島」是一個浪漫的體驗。「 野餐
                            」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。，透過土地產生情感上的凝聚與連結。
                          </div>
                        </div>
                        <div className="intMore my-2">
                          <a className="more">更多資訊</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 wrap">
                      <div className="activityImg">
                        <img
                          src="/img/camping/activity_camping_img/camping_01_01.jpeg"
                          alt="/"
                        />
                      </div>
                      <div className="activityInformation">
                        <div className="activityTitle my-2">
                          <div className="title">浪花野餐計畫</div>
                          <BsHeart className="collect" />
                        </div>
                        <div className="d-flex">
                          <div className="label">新北市</div>
                          <div className="label">開團已截止</div>
                        </div>
                        <div className="content my-1">
                          <div>2022-08-30</div>
                          <div>$2000</div>
                        </div>
                        <div className="limit">活動名額： 25</div>
                        <div className="activityText mt-1">
                          <div className="activityInt">活動簡介：</div>
                          <div className="intContent">
                            身為島國人，「環島」是一個浪漫的體驗。「 野餐
                            」是人與人間，透過土地產生情感上的凝聚與連結。「LIFE廚聚」生活計畫，透過土地產生情感上的凝聚與連結。，透過土地產生情感上的凝聚與連結。
                          </div>
                        </div>
                        <div className="intMore my-2">
                          <a className="more">更多資訊</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </IconContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </main>
    </IconContext.Provider>
  );
}

export default CampingMain;
