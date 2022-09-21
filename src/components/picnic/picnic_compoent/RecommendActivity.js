import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Divider, Tooltip } from 'antd';
import Slider from 'react-slick';
import { API_URL_IMG } from '../../../utils/config';
import { Link } from 'react-router-dom';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function RecommendActivity({ getMap, data, userJoin, user, handleAddJoin }) {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  // console.log(getMap);
  return (
    <>
      <div className="recommendActivity mb-5">
        <h4>附近熱門活動</h4>
        <Slider {...settings}>
          {getMap.map((getMap) => {
            return (
              <div className="cardItem" key={uuidv4()}>
                <div>
                  <p className="date mb-2">{getMap.place_name}</p>
                  <p className="cardTitle mb-2">{getMap.picnic_title}</p>
                  <p className="location mb-2">
                    <FaMapMarkerAlt className="mapMarkerIcon" />
                    {getMap.location}
                    {/* TODO: 地區還未撈出 */}
                  </p>
                  <p className="infoText">{getMap.intr}</p>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                      color: '#F2AC33',
                      backgroundColor: '#817161',
                    }}
                  >
                    {getMap.users.map((user) => {
                      return (
                        <Avatar
                          src={`${API_URL_IMG}${user.photo}`}
                          key={uuidv4()}
                        />
                      );
                    })}
                  </Avatar.Group>
                  <Link
                    to={`/activity/picnic/official/${getMap.id}`}
                    className="joinBtn btn"
                  >
                    查看活動
                  </Link>
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
