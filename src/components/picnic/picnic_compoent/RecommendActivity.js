import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Divider, Tooltip } from 'antd';
import Slider from 'react-slick';
import 'antd/dist/antd.css';

const data = [
  {
    id: 1,
    date: '2022/08/31',
    title: '標題標題標題',
    location: '台北市松山區',
    info: '番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！',
    img: 'picnic_index_banner1-2.png',
  },
  {
    id: 2,
    date: '2022/06/66',
    title: '標題標題',
    location: '台北市中山區',
    info: '番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！',
    img: 'picnic_index_banner1-2.png',
  },
  {
    id: 3,
    date: '2022/08/77',
    title: '11111',
    location: '台北市中山區',
    info: '番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！',
    img: 'picnic_index_banner1-2.png',
  },
  {
    id: 4,
    date: '2022/08/88',
    title: '222222',
    location: '台北市中山區',
    info: '番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！',
    img: 'picnic_index_banner1-2.png',
  },
  {
    id: 5,
    date: '2022/03/88',
    title: '333333',
    location: '台北市中山區',
    info: '番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！',
    img: 'picnic_index_banner1-2.png',
  },
  {
    id: 6,
    date: '2022/09/88',
    title: '標題標題',
    location: '台北市中山區',
    info: '番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！',
    img: 'picnic_index_banner1-2.png',
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
                      <img
                        src={`/img/picnic/activity_picnic_img/${v.img}`}
                        alt=""
                      />
                    </div>
                    <div className="userPic">
                      <img
                        src={`/img/picnic/activity_picnic_img/${data.img}`}
                        alt=""
                      />
                    </div>
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
