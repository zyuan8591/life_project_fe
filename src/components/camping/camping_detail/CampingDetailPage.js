import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IconContext } from 'react-icons';

import { FaPaw } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { GiCampingTent } from 'react-icons/gi';
import {
  IoIosCafe,
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from 'react-icons/io';
import { FaWifi, FaPlug, FaUserFriends, FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineLocalParking, MdLocationOn } from 'react-icons/md';

import '../../../styles/camping/camping_detail/_campingDetailPage.scss';
import Footer from '../../public_component/Footer';
import Header from '../../public_component/Header';
import BackToTop from '../../public_component/BackToTop';
import Slide from './component/slider/Slide';
import ProductSlide from './component/slider/ProductSlide';
import PlaceSlide from './component/slider/PlaceSlide';
import CampingDetailInfo from './component/CampingDetailInfo';
import CampingDetailJoinSlide from './component/CampingDetailJoinSlide';
const aboutIcons = [
  {
    icon: GiCampingTent,
    iconTitle: '免費裝備露營',
  },
  {
    icon: FaWifi,
    iconTitle: 'WiFi',
  },
  {
    icon: IoIosCafe,
    iconTitle: '販賣部',
  },
  {
    icon: MdOutlineLocalParking,
    iconTitle: '停車場',
  },
  {
    icon: FaUserFriends,
    iconTitle: '交誼廳',
  },
  {
    icon: FaPlug,
    iconTitle: '延長線',
  },
];
const aboutDetailContent = [
  {
    detailTitle: '餐飲需求',
    detailText:
      '預定成功後，將有勤美學團隊聯繫確認。若有餐食特殊需求（例如素食或不吃牛等），敬請主動告知。',
  },
  {
    detailTitle: '住宿基本設備說明',
    detailText:
      '帳篷提供有五米帳篷，內有床墊，寢具，冷氣與基本電力供3C充電使用，帳篷內無獨立盥洗間。',
  },
  {
    detailTitle: '穿著建議',
    detailText:
      '勤美學場域位於開放的大自然環境中，蚊蟲難免，請自備防蚊、防曬、防寒和雨具用品。建議穿著運動鞋、攜帶水壺，隨時補充水分。',
  },
];

const products = [
  { name: 'Moomin多功能電烤盤', img: 'BRUNO_BOE059_BGR_CE_02.jpeg' },
  { name: '隨行果汁機', img: 'CHANCOO_CC5800_GRE_03.webp' },
  { name: '單片熱壓三明治機', img: 'Tofft_khs3_p_03.jpg' },
  { name: 'Hot Plate 電烤盤', img: 'recolte_RHP_1_03.jpeg' },
  { name: 'Ball Mason Jar隨鮮瓶果汁機', img: 'OSTER_ BLSTMM_BA4_02.jpeg' },
  { name: '多功能電烤盤-經典款', img: 'BRUNO_ BOE026_CGR_02.webp' },
  { name: 'SOU‧SOU 多功能電烤盤', img: 'BRUNO_BOE021_SOUSOU_02.webp' },
  { name: '多功能計時鬆餅機', img: 'Giaretti_gtswt26_03.jpg' },
  { name: 'Moomin多功能電烤盤', img: 'BRUNO_BOE059_BGR_CE_02.jpeg' },
  { name: 'Ball Mason Jar隨鮮瓶果汁機', img: 'OSTER_ BLSTMM_BA4_02.jpeg' },
];

function CampingDetailPage() {
  const [aboutIcon, setAboutIcon] = useState(aboutIcons);
  const [aboutDetail, setAboutDetail] = useState(aboutDetailContent);
  const [scrollDown, setScrollDown] = useState(false);
  const [product, setProduct] = useState(products);
  const productLength = product.length;
  // console.log(productLength);

  const [productSlider, setProductSlider] = useState(0);
  const [placeSlider, setPlaceSlider] = useState(0);
  const [joinSlider, setJoinSlider] = useState(0);

  // sliderAll right
  const sliderAllRight = (cardWidth, cardLength, displayTotal) => {
    let nowSlide = 0;
    // 移動區塊
    let cardWidthTtl = cardWidth * displayTotal;
    // 移動次數
    let moveCount = Math.ceil(cardLength / displayTotal);
    // limit
    let moveWidth = -cardWidthTtl * moveCount + cardWidthTtl;

    let slider = joinSlider - cardWidthTtl;
    if (moveWidth > slider) return nowSlide;

    setJoinSlider(slider);
    nowSlide = slider;
  };

  // sliderAll left
  const sliderAllLeft = (cardWidth, displayTotal) => {
    let nowSlide = 0;
    // 移動區塊 925
    let cardWidthTtl = cardWidth * displayTotal;

    let slider = joinSlider + cardWidthTtl;
    if (slider > 0) return nowSlide;

    setJoinSlider(slider);
    nowSlide = slider;
  };

  // sticky
  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });

  return (
    <>
      <Header />
      <main className="CampingDetailPage">
        <div className="main">
          {/* breadCrumb */}
          <p className="breadCrumb py-3">LIFE --- 活動專區 </p>
          <div className="row">
            {/* 左側 */}
            <div className="col-8" style={{ backgroundColor: 'white' }}>
              <div className="mainTitle">
                <div className="title">露營FUN輕鬆</div>
                <div className="joinBtn">加入活動</div>
              </div>

              <div className="d-flex justify-content-between ">
                {/* 簡介 */}
                <div className="titleContainer">
                  <IconContext.Provider
                    value={{ color: '#817161', size: '1.2em' }}
                  >
                    <div className="titleContent">
                      <FaPaw />
                      <div className="mx-2">日期：</div>
                      <div className="titleText">2022/08/31 ~ 2022/09/01</div>
                    </div>
                    <div className="titleContent">
                      <FaPaw />
                      <div className="mx-2">地點：</div>
                      <div className="titleText">勤美學</div>
                    </div>
                    <div className="titleContent">
                      <FaPaw />
                      <div className="mx-2">地址：</div>
                      <div className="titleText">苗栗縣造橋鄉</div>
                    </div>
                    <div className="titleContent">
                      <FaPaw />
                      <div className="mx-2">報名期間：</div>
                      <div className="titleText">2022/08/01 ~ 2022/08/25</div>
                    </div>
                    <div className="titleContent">
                      <FaPaw />
                      <div className="mx-2">報名費用：</div>
                      <div className="titleText">NT$3680</div>
                    </div>
                    <div className="titleContent">
                      <FaPaw />
                      <div className="mx-2">活動名額：</div>
                      <div className="titleText">15</div>
                    </div>
                  </IconContext.Provider>
                </div>
                {/* weather */}
                <div
                  style={{
                    width: '250px',
                    height: '280px',
                    border: '1px solid lightBlue',
                    margin: '25px',
                  }}
                >
                  weather
                </div>
              </div>
              {/* title img */}
              <div className="ContainerImg">
                <div className="titleImg">
                  <img
                    src="/img/camping/activity_camping_img/camping_01_02.jpeg"
                    alt="/"
                  />
                </div>
                <div className="titleImg">
                  <img
                    src="/img/camping/activity_camping_img/camping_02_01.webp"
                    alt="/"
                  />
                </div>
                <div className="titleImg">
                  <img
                    src="/img/camping/activity_camping_img/camping_02_02.webp"
                    alt="/"
                  />
                </div>
              </div>

              {/* about */}
              <div className="aboutInt">相關資訊</div>
              <CampingDetailInfo
                aboutDetail={aboutDetail}
                aboutIcon={aboutIcon}
              />

              {/* join */}
              <IconContext.Provider value={{ color: '#817161', size: '2rem' }}>
                <div className="joinUserTitle">參加者（5/15）</div>
                <div className="joinSlide">
                  {productLength < 6 ? (
                    ''
                  ) : (
                    <>
                      <div className="sliderLeft">
                        <IoIosArrowDropleftCircle
                          onClick={() => {
                            sliderAllLeft(185, 5);
                          }}
                        />
                      </div>
                      <div className="sliderRight">
                        <IoIosArrowDroprightCircle
                          onClick={() => {
                            sliderAllRight(185, productLength, 5);
                          }}
                        />
                      </div>
                    </>
                  )}

                  <div className="joinContainer">
                    <div className="slide">
                      {product.map((v) => {
                        return (
                          <CampingDetailJoinSlide
                            key={uuidv4()}
                            joinSlider={joinSlider}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </IconContext.Provider>
            </div>

            {/* 右側 */}
            <IconContext.Provider value={{ color: '#444', size: '1.2rem' }}>
              <div className="col-4 ">
                <aside className={scrollDown ? 'sticky-top top-0' : 'sticky'}>
                  <div className="asideTitle">
                    <div className="titleName">露營FUN輕鬆</div>
                    <div className="state">開團已截止</div>
                  </div>
                  <div className="asidePrice">NT$3680</div>
                  <div className="asideContent">
                    <div className="contentItem">
                      <FaCalendarAlt />
                      <div className="ms-3">2022/08/31 ~ 2022/09/01</div>
                    </div>
                    <IconContext.Provider
                      value={{ color: '#444', size: '1.3rem' }}
                    >
                      <div className="contentItem">
                        <MdLocationOn />
                        <div className="ms-3">苗栗縣造橋鄉</div>
                      </div>
                      <div className="contentItem">
                        <BsPersonFill />
                        <div className="ms-3">尚可參加人數：10</div>
                      </div>
                    </IconContext.Provider>
                  </div>
                  <div className="asideMap">map</div>
                  <div className="text-center">
                    <div className="joinBtn">加入活動</div>
                  </div>
                </aside>
              </div>
            </IconContext.Provider>
          </div>

          {/* 商品推薦 */}
          <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
            <div className="productTitle">輕鬆享受露營，猜你會需要...</div>
            <Slide
              contentLength={productLength}
              maxWidth={1260}
              Slider={productSlider}
              setSlider={setProductSlider}
              cardWidth={210}
              displayContainer={6}
            >
              <ProductSlide product={product} productSlider={productSlider} />
            </Slide>

            {/* 地點推薦 */}
            <div className="placeTitle">喜歡露營的你，附近的活動還有...</div>
            <Slide
              contentLength={productLength}
              maxWidth={1375}
              Slider={placeSlider}
              setSlider={setPlaceSlider}
              cardWidth={275}
              displayContainer={5}
            >
              <PlaceSlide product={product} placeSlider={placeSlider} />
            </Slide>
          </IconContext.Provider>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default CampingDetailPage;
