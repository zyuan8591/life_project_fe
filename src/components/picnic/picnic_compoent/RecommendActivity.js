import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from 'antd';
import classes from '../../../styles/moduleCss/picnic_offical_detail/picnicOfficalDetail.module.scss';
// import Slider from 'react-slick';
import { API_URL_IMG } from '../../../utils/config';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const city = [
  '信義區',
  '中正區',
  '萬華區',
  '大同區',
  '中山區',
  '松山區',
  '大安區',
  '內湖區',
  '南港區',
  '士林區',
  '北投區',
  '文山區',
];

function RecommendActivity({ getMap, data, userJoin, user, handleAddJoin }) {
  // const newAddress = (address) => {
  //   return address.substr(0, 3);
  // };
  return (
    <>
      <div className={`${classes.recommendActivity} mb-5`}>
        <h4>附近熱門活動...</h4>
        <div className={classes.pcView}>
          <Swiper
            spaceBetween={19}
            slidesPerView={5}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Pagination, Autoplay]}
          >
            {getMap.map((getMap, i) => (
              <SwiperSlide key={i}>
                <div className={classes.cardItem} key={uuidv4()}>
                  <div>
                    <p className={`${classes.date} mb-2`}>
                      {getMap.place_name}
                    </p>
                    <p className={`${classes.cardTitle} mb-2`}>
                      {getMap.picnic_title}
                    </p>
                    <p className="location mb-2">
                      <FaMapMarkerAlt className={classes.mapMarkerIcon} />
                      {city[getMap.location - 1]}
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={classes.mbView}>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Pagination, Autoplay]}
          >
            {getMap.map((getMap, i) => (
              <SwiperSlide key={i}>
                <div className={classes.cardItem} key={uuidv4()}>
                  <div>
                    <p className={`${classes.date} mb-2`}>
                      {getMap.place_name}
                    </p>
                    <p className={`${classes.cardTitle} mb-2`}>
                      {getMap.picnic_title}
                    </p>
                    <p className="location mb-2">
                      <FaMapMarkerAlt className={classes.mapMarkerIcon} />
                      {city[getMap.location - 1]}
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default RecommendActivity;
