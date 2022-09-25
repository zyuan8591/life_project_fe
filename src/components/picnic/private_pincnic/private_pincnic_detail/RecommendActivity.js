import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Divider, Tooltip } from 'antd';
import Slider from 'react-slick';
import 'antd/dist/antd.css';

const data = [
  {
    id: 1,
    date: '2022/10/31',
    title: 'HI！白色野餐',
    location: '台北市文山區',
    info: '起源於1988年的法國(DînerenBlanc)白色野餐，擁有30多年歷史，為了快速辨識賓客，規定與會人士皆須穿著全白服裝。全球近90座城市爭相舉辦這場白色盛宴，如:紐約、巴塞隆納、倫敦、雪梨、溫哥華、香港、上海、東京、首爾等。白色野餐已然形成各國政商名流、時尚人士爭相參與的社交活動。',
    img: 'english.png',
  },
  {
    id: 2,
    date: '2022/10/05',
    title: '好朋友野餐日',
    location: '台北市士林區',
    info: '位在木柵的福德坑滑草場，可以免費滑草，草地上鋪上野餐墊就能躺著休息，適合三五好友呼朋引伴前來同樂。',
    img: 'cat.png',
  },
  {
    id: 3,
    date: '2022/11/01',
    title: '一日好『野』人',
    location: '台北市中山區',
    info: '台北天母運動公園兒童遊戲場，與天母新光三越跟大葉高島屋相鄰，吃飯用餐很方便，公園內有溜冰場、遊戲場、沙坑等設施，還有一片很大的草坪，可以野餐、踢球，讓孩子跑跳。',
    img: 'dennis.png',
  },
  {
    id: 4,
    date: '2022/10/28',
    title: '小清新森林野餐',
    location: '台北市文山區',
    info: '台北最長磨石子溜滑梯出現，沿著山坡而建46米長溜滑梯，玩起來很刺激。人造草皮很像天然的，很適合親子同行野餐。',
    img: 'alex.png',
  },
  {
    id: 5,
    date: '2022/10/15',
    title: '文青野餐',
    location: '台北市中山區',
    info: '在「華山文創園區」看完展覽先別急著走！園區旁有片綠油油的「華山大草原」可以坐下休憩，不時還會遇到許多人遛毛小孩，光是看著都覺得療癒心情～而且在這裡完全不用擔心餐點不易準備，就算是臨時起意，附近也有咖啡廳、餐廳很方便選購。可以看展覽又有場地野餐，完全就是假日消磨時光的好選擇！',
    img: 'alen.png',
  },
  {
    id: 6,
    date: '2022/11/16',
    title: '都會野餐',
    location: '台北市北投區',
    info: '大都會公園是近年來假日的好去處，這裡的共融遊戲場，不只小朋友超愛玩，連大人都想參一咖！溜滑梯、滑草、滑軌⋯⋯超多項遊樂設施可以玩。大都會公園的草皮佔地424公頃，相當於16座大安森林公園，野餐不用怕找不到位置。而捷運站就在旁邊，外面就有停車場，交通相當便利，很適合一家大小假日來遊玩！如果覺得太陽太大，傍晚來野餐，也有另外一種情調～',
    img: 'aaron.png',
  },
];

function RecommendActivity() {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // centerMode: true,
    // centerPadding: '60px',
  };

  return (
    <>
      <div className="recommendActivity mb-5">
        <h4 className="">附近熱門活動</h4>
        <Slider {...settings}>
          {data.map((v) => {
            return (
              <div className="cardItem" key={uuidv4()}>
                <p className="date mb-2">{v.date}</p>
                <p className="cardTitle mb-2">{v.title}</p>
                <p className="location mb-2">
                  <FaMapMarkerAlt className="mapMarkerIcon" />
                  {v.location}
                </p>
                <p className="infoText">{v.info}</p>
                <div className="d-flex justify-content-between">
                  <div className="userPicItems d-flex">
                    <div className="userPic">
                      <img src={`/img/user/user_img/${v.img}`} alt="user" />
                    </div>
                    <Avatar.Group
                      maxCount={2}
                      maxStyle={{
                        color: '#F2AC33',
                        backgroundColor: '#817161',
                        size: 'large',
                      }}
                    >
                      <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </Avatar.Group>
                  </div>
                  <div className="joinBtn btn">加入活動</div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default RecommendActivity;
