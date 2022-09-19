import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import '../../styles/weather/_weather.scss';
import sunriseAndSunsetData from './component/sunrise-sunset.json';
import WeatherSetting from './component/WeatherSetting';
import WeatherCard from './component/WeatherCard';
import useWeatherApi from './component/UseWeatherApi';
import { findLocation } from './component/Utils';

// import {ReactComponent as Logo} from '../../../public/img/camping';

const Contain = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getMoment = (locationName) => {
  // 從日出日落時間中找出符合的地區
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName
  );

  // 找不到的話則回傳 null
  if (!location) return null;

  // 取得當前時間
  const now = new Date();

  // 時間格式"2019-10-08"
  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .replace(/\//g, '-');

  // 從該地區中找到對應的日期
  const locationDate =
    location.time && location.time.find((time) => time.dataTime === nowDate);

  // 將日出日落以及當前時間轉成時間戳記（TimeStamp）
  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`
  ).getTime();
  const sunsetTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`
  ).getTime();
  const nowTimeStamp = now.getTime();

  // 若當前時間介於日出和日落中間，則表示為白天，否則為晚上
  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
    ? 'day'
    : 'night';
};

function Weather() {
  const storageCity = localStorage.getItem('cityName');
  const [currentCity, setCurrentCity] = useState(storageCity || '臺北市');
  const currentLocation = findLocation(currentCity) || {};
  const [weatherElement, allData] = useWeatherApi(currentLocation);
  const [currentPage, setCurrentPage] = useState('WeatherCard');
  const [remind, setRemind] = useState('');

  const moment = useMemo(
    () => getMoment(currentLocation.sunriseCityName),
    [currentLocation.sunriseCityName]
  );

  useEffect(() => {
    localStorage.setItem('cityName', currentCity);
  }, [currentCity]);

  return (
    <Contain>
      {currentPage === 'WeatherCard' && (
        <WeatherCard
          weatherElement={weatherElement}
          allData={allData}
          setCurrentPage={setCurrentPage}
          moment={moment}
          cityName={currentLocation.cityName}
        />
      )}
      {currentPage === 'WeatherSetting' && (
        <WeatherSetting
          setCurrentPage={setCurrentPage}
          remind={remind}
          setRemind={setRemind}
          cityName={currentLocation.cityName}
          setCurrentCity={setCurrentCity}
        />
      )}
    </Contain>
  );
}

export default Weather;
