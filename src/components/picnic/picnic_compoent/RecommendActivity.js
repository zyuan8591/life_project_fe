import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Divider, Tooltip } from 'antd';
import classes from '../../../styles/moduleCss/picnic_offical_detail/picnicOfficalDetail.module.scss';
import Slider from 'react-slick';
import { API_URL_IMG } from '../../../utils/config';
import { Link } from 'react-router-dom';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const city = [
  { value: 1, name: '信義區' },
  { value: 2, name: '中正區' },
  { value: 3, name: '萬華區' },
  { value: 4, name: '大同區' },
  { value: 5, name: '中山區' },
  { value: 6, name: '松山區' },
  { value: 7, name: '大安區' },
  { value: 8, name: '內湖區' },
  { value: 9, name: '南港區' },
  { value: 10, name: '士林區' },
  { value: 11, name: '北投區' },
  { value: 12, name: '文山區' },
];

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
  const settingsRWD = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  // console.log(getMap);
  return (
    <>
      <div className={`${classes.recommendActivity} mb-5`}>
        <h4>附近熱門活動...</h4>
        <div className={classes.pcView}>
          <Slider {...settings}>
            {getMap.map((getMap) => {
              return (
                <div className={classes.cardItem} key={uuidv4()}>
                  <div>
                    <p className={`${classes.date} mb-2`}>
                      {getMap.place_name}
                    </p>
                    <p className={`${classes.cardTitle} mb-2`}>
                      {getMap.picnic_title}
                    </p>
                    <p className="location mb-2">
                      {/* TODO: 地區還未撈出 */}
                      <FaMapMarkerAlt className={classes.mapMarkerIcon} />
                      {getMap.location}
                    </p>
                    <p className={classes.infoText}>{getMap.intr}</p>
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
                      className={`${classes.joinBtn} btn`}
                    >
                      查看活動
                    </Link>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className={classes.mbView}>
          <Slider {...settingsRWD}>
            {getMap.map((getMap) => {
              return (
                <div className={classes.cardItem} key={uuidv4()}>
                  <div>
                    <p className={`${classes.date} mb-2`}>
                      {getMap.place_name}
                    </p>
                    <p className={`${classes.cardTitle} mb-2`}>
                      {getMap.picnic_title}
                    </p>
                    <p className="location mb-2">
                      {/* TODO: 地區還未撈出 */}
                      <FaMapMarkerAlt className={classes.mapMarkerIcon} />
                      {getMap.location}
                    </p>
                    <p className={classes.infoText}>{getMap.intr}</p>
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
                      className={`${classes.joinBtn} btn`}
                    >
                      查看活動
                    </Link>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default RecommendActivity;
