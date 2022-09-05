import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IconContext } from 'react-icons';

import { FaPaw } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { IoWarning } from 'react-icons/io5';
import { HiLightBulb } from 'react-icons/hi';
import { GiCampingTent } from 'react-icons/gi';
import { IoIosCafe } from 'react-icons/io';
import {
  FaWifi,
  FaPlug,
  FaUserFriends,
  FaHandPointRight,
  FaCalendarAlt,
  FaChevronRight,
  FaChevronLeft,
} from 'react-icons/fa';
import { MdOutlineLocalParking, MdLocationOn } from 'react-icons/md';

import '../../../styles/camping/camping_detail/_campingDetailPage.scss';
import Footer from '../../public_component/Footer';
import Header from '../../public_component/Header';
import BackToTop from '../../public_component/BackToTop';
import Slide from './component/Slide';
import ProductSlide from './component/ProductSlide';
import PlaceSlide from './component/PlaceSlide';

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
  { name: '隨行果汁機', img: 'CHANCOO_CC5800_GRE_03.webp' },
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
              <div className="titleImg">
                <img
                  src="/img/camping/activity_camping_img/camping_01_02.jpeg"
                  alt="/"
                />
              </div>

              {/* about */}
              <div className="aboutInt">相關資訊</div>
              <div className="aboutContainer">
                <div className="about">
                  <div className="aboutTitle">關於</div>
                  <div className="aboutDetail">
                    「勤美學」是一個在地美學實驗計畫。傳達自然永續、院長導師精神、生活哲學的企業核心精神，以台灣老式的香格里拉樂園為基地，融入在地文化，透過旅遊與生活體驗，一步步打造在地生活美學的實驗平台。
                  </div>
                </div>
                <div className="about">
                  <div className="aboutTitle">住宿</div>
                  <div className="aboutDetail">
                    一泊二食。住宿形式為森林帳篷，廁所浴室位於公共空間。
                    <br />
                    <IconContext.Provider
                      value={{ color: '#F2AC33', size: '1.3rem' }}
                    >
                      <div className="aboutText">
                        <IoWarning />
                        <span className="ms-1" style={{ fontSize: '14px' }}>
                          提醒您～活動為隨機分房不得選擇
                        </span>
                      </div>
                    </IconContext.Provider>
                  </div>
                </div>
                <IconContext.Provider
                  value={{ color: '#F2AC33', size: '1.2rem' }}
                >
                  <div className="about">
                    <div className="aboutTitle">服務與措施</div>
                    <div className="aboutDetail">
                      <IconContext.Provider
                        value={{ color: '#444', size: '1.4rem' }}
                      >
                        {aboutIcon.map((v) => {
                          return (
                            <div
                              className="d-flex align-items-center mb-2"
                              key={uuidv4()}
                            >
                              <v.icon />
                              <span className="ms-1">{v.iconTitle}</span>
                            </div>
                          );
                        })}
                      </IconContext.Provider>
                    </div>
                  </div>
                  <div className="about">
                    <div className="aboutTitle">行程介紹</div>
                    <div className="aboutDetail">
                      <div className="aboutText">
                        <FaHandPointRight className="me-2" />
                        <div className="textTitle">Day 1</div>
                      </div>
                      <div className="ms-4">
                        16:00 - 16:30 星際碼頭集合報到 <br />
                        16:30 - 17:00 人力推行器，前進好夢里 <br />
                        17:00 - 18:30 能量補充，樹屋探險 <br />
                        18:30 - 20:00 來自地心的獵人主廚晚餐 <br />
                        20:00 - 20:40 太空夢遊趣 <br />
                        20:40 - 天地間造夢 <br />
                      </div>
                      <div className="aboutText">
                        <FaHandPointRight className="me-2" />
                        <div className="textTitle">Day 2</div>
                      </div>
                      <div className="ms-4">
                        07:30 - 09:30 晨食白日夢 <br />
                        09:30 - 10:30 星際迷走，遺跡探索 <br />
                        10:30 - 11:30 野地廚房，我是地球好野人
                        <br />
                        1130- 再見好夢里
                      </div>
                    </div>
                  </div>
                  <div className="about">
                    <div className="aboutTitle">注意事項</div>
                    <div className="aboutDetail">
                      {aboutDetail.map((v) => {
                        return (
                          <div key={uuidv4()}>
                            <div className="aboutText">
                              <HiLightBulb className="me-2" />
                              <div className="textTitle">{v.detailTitle}</div>
                            </div>
                            <div className="ms-4">{v.detailText}</div>
                          </div>
                        );
                      })}
                      {/* <div>
                      <div className="aboutText">
                        <HiLightBulb className="me-2" />
                        <div className="textTitle">餐飲需求</div>
                      </div>
                      <div className="ms-4">
                        預定成功後，將有勤美學團隊聯繫確認。若有餐食特殊需求（例如素食或不吃牛等），敬請主動告知。
                      </div>
                    </div>
                    <div>
                      <div className="aboutText">
                        <HiLightBulb className="me-2" />
                        <div className="textTitle">住宿基本設備說明</div>
                      </div>
                      <div className="ms-4">
                        帳篷提供有五米帳篷，內有床墊，寢具，冷氣與基本電力供3C充電使用，帳篷內無獨立盥洗間。
                      </div>
                    </div>
                    <div>
                      <div className="aboutText">
                        <HiLightBulb className="me-2" />
                        <div className="textTitle">穿著建議</div>
                      </div>
                      <div className="ms-4">
                        勤美學場域位於開放的大自然環境中，蚊蟲難免，請自備防蚊、防曬、防寒和雨具用品。建議穿著運動鞋、攜帶水壺，隨時補充水分。
                      </div>
                    </div> */}
                      <div>
                        <div className="aboutText">
                          <HiLightBulb className="me-2" />
                          <div className="textTitle">入住注意項項</div>
                        </div>
                        <div className="ms-4">
                          1.
                          為維護旅程品質，請勿攜帶寵物。導盲犬除外。帳篷內禁止飲食。
                          <br />
                          2.
                          為保障體驗期間村民與場域安全，場域內禁止村民使用明火、仙女棒、煤油爐、氣化燈、瓦斯爐等明火器材。
                          <br />
                          3.
                          帳篷內禁止使用高瓦數電器設備，如吹風機、電熱器、電捲棒、電磁爐、電毯、快煮壺。
                          <br />
                          4.
                          ​勤美學為維護體驗品質與其他客人權益，場域內音量將受管理，未經許可禁止在勤美學場域內使用擴音設備或大聲喧嘩。
                        </div>
                      </div>
                    </div>
                  </div>
                </IconContext.Provider>
              </div>

              {/* join */}
              <IconContext.Provider value={{ color: '#444', size: '2rem' }}>
                <div className="joinUserTitle">參加者（5/15）</div>
                <div className="joinContainer">
                  <div className="joinUser">
                    <div className="userImg">
                      <img src="/img/user/company_icon/aarke.jpg" alt="/" />
                    </div>
                    <div className="userName">Joe</div>
                  </div>
                  <div className="joinUser">
                    <div className="userImg">
                      <img src="/img/user/company_icon/aarke.jpg" alt="/" />
                    </div>
                    <div className="userName">Joe</div>
                  </div>
                  <div className="joinUser">
                    <div className="userImg">
                      <img src="/img/user/company_icon/aarke.jpg" alt="/" />
                    </div>
                    <div className="userName">Joe</div>
                  </div>
                  <div className="joinUser">
                    <div className="userImg">
                      <img src="/img/user/company_icon/aarke.jpg" alt="/" />
                    </div>
                    <div className="userName">Joe</div>
                  </div>
                  {/* <div className="joinUser">
                    <div className="userImg">
                      <img src="/img/user/company_icon/aarke.jpg" alt="/" />
                    </div>
                    <div className="userName">Joe</div>
                  </div> */}
                  <div className="sliderLeft">
                    <FaChevronLeft />
                  </div>
                  <div className="sliderRight">
                    <FaChevronRight />
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
