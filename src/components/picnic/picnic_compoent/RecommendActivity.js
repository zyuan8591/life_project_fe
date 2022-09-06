import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Avatar, Divider, Tooltip } from 'antd';
import Slider from 'react-slick';
import 'antd/dist/antd.css';

function RecommendActivity() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    variableWidth: true,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: '60px',
  };

  return (
    <>
      <div className="recommendActivity">
        <h4 className="">附近熱門活動</h4>
        <Slider {...settings}>
          <div className="cardItem" style={{ width: 250 }}>
            <p className="time mb-2">2022/08/31</p>
            <p className="cardTitle mb-2">標題標題標題</p>
            <p className="location mb-2">
              <FaMapMarkerAlt className="mapMarkerIcon" />
              台北市松山區
            </p>
            <p className="infoText">
              番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！
            </p>
            <div className="d-flex justify-content-between">
              <div className="userPicItems d-flex">
                <div className="userPic">
                  <img
                    src="/img/picnic/activity_picnic_img/picnic_index_banner1-2.png"
                    alt=""
                  />
                </div>
                <div className="userPic">
                  <img
                    src="/img/picnic/activity_picnic_img/picnic_index_banner1-2.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="joinBtn btn">加入活動</div>
            </div>
          </div>
          <div className="cardItem" style={{ width: 250 }}>
            <p className="time mb-2">2022/08/31</p>
            <p className="cardTitle mb-2">標題標題標題</p>
            <p className="location mb-2">
              <FaMapMarkerAlt className="mapMarkerIcon" />
              台北市松山區
            </p>
            <p className="infoText">
              番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！
            </p>
            <div className="d-flex justify-content-between">
              <div className="userPicItems">
                <div className="userPic">
                  <img
                    src="/img/picnic/activity_picnic_img/picnic_index_banner1-2.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="joinBtn btn">加入活動</div>
            </div>
          </div>
          <div className="cardItem" style={{ width: 250 }}>
            <p className="time mb-2">2022/08/31</p>
            <p className="cardTitle mb-2">標題標題標題</p>
            <p className="location mb-2">
              <FaMapMarkerAlt className="mapMarkerIcon" />
              台北市松山區
            </p>
            <p className="infoText">
              番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！
            </p>
            <div className="d-flex justify-content-between">
              <div className="userPicItems">
                <div className="userPic">
                  <img
                    src="/img/picnic/activity_picnic_img/picnic_index_banner1-2.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="joinBtn btn">加入活動</div>
            </div>
          </div>
          <div className="cardItem" style={{ width: 250 }}>
            <p className="time mb-2">2022/08/31</p>
            <p className="cardTitle mb-2">標題標題標題</p>
            <p className="location mb-2">
              <FaMapMarkerAlt className="mapMarkerIcon" />
              台北市松山區
            </p>
            <p className="infoText">
              番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！
            </p>
            <div className="d-flex justify-content-between">
              <div className="userPicItems">
                <div className="userPic">
                  <img
                    src="/img/picnic/activity_picnic_img/picnic_index_banner1-2.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="joinBtn btn">加入活動</div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
}

export default RecommendActivity;
