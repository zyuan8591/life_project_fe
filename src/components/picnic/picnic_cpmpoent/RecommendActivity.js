import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import 'antd/dist/antd.css';

function RecommendActivity() {
  return (
    <>
      <div className="recommendActivity mb-5">
        <h4 className="">附近熱門活動</h4>
        <div className="cardWrap d-flex">
          <div className="cardItem">
            <p className="time mb-2">2022/08/31</p>
            <p className="cardTitle mb-2">發芬發芬發芬標題</p>
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
                  <img src="/img/user/company_icon/bruno.jpeg" alt="" />
                </div>
              </div>
              <div className="joinBtn btn">加入活動</div>
            </div>
          </div>
          <div className="cardItem">
            <p className="time mb-2">2022/08/31</p>
            <p className="cardTitle mb-2">發芬發芬發芬標題</p>
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
              </div>
              <div className="joinBtn btn">加入活動</div>
            </div>
          </div>
          <div className="cardItem">
            <p className="time mb-2">2022/08/31</p>
            <p className="cardTitle mb-2">發芬發芬發芬標題</p>
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
              </div>
              <div className="joinBtn btn">加入活動</div>
            </div>
          </div>
          <div className="cardItem">
            <p className="time mb-2">2022/08/31</p>
            <p className="cardTitle mb-2">發芬發芬發芬標題</p>
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
              </div>
              <div className="joinBtn btn">加入活動</div>
            </div>
          </div>
          <div className="cardItem">
            <p className="time mb-2">2022/08/31</p>
            <p className="cardTitle mb-2">發芬發芬發芬標題</p>
            <p className="location mb-2">
              <FaMapMarkerAlt className="mapMarkerIcon" />
              台北市松山區
            </p>
            <p className="infoText">
              番薯市集與士東市場特地規劃「市場野餐日」，把野餐表示生活態度的意念融合餐點、飲料與音樂等，讓參與者可以盡情表達喜好的生活品味，位士東市場二樓的文創空間，將進駐許多的文創市集，從手作鹹食、甜點再到文創好物、插畫與生活產品等統統都有，體驗文藝融合市場文化將一次到位！
            </p>
            <div className="d-flex justify-content-between">
              <div className="userPicItems d-flex">
                <Avatar.Group className="my-auto"
                  maxCount={3}
                  maxStyle={{
                    color: '#fff',
                    backgroundColor: '#817161',
                  }}
                >
                  <Avatar src="https://joeschmoe.io/api/v1/random" />
                  <Avatar style={{ backgroundColor: '#1890ff', }} src="https://joeschmoe.io/api/v1/random">name</Avatar>
                  {/*  頭像3 */}
                  <Tooltip title="userName" placement="top">
                    <Avatar style={{ backgroundColor: '#1890ff', }} src="https://joeschmoe.io/api/v1/random" />
                  </Tooltip>
                  <Avatar style={{ backgroundColor: '#1890ff', }} src="https://joeschmoe.io/api/v1/random" />
                </Avatar.Group>
                <Divider />
                {/* <div className="userPic">
                  <img
                    src="/img/picnic/activity_picnic_img/picnic_index_banner1-2.png"
                    alt=""
                  />
                </div> */}
              </div>
              <div className="joinBtn btn">加入活動</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendActivity;
