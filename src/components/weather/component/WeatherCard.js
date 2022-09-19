import React from 'react';
import styled from '@emotion/styled';
import WeatherIcon from './WeatherIcon.js';

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 250px;
  height: 300px;
  box-shadow: 0.1px 0.1px 5px #ccc;
  background-color: transparent;
  box-sizing: border-box;
  padding: 15px;
  margin: 45px 25px;
  border-radius: 10px;
`;
const Location = styled.div`
  font-size: 28px;
  color: #817161;
  margin-right: 15px;
`;
const Description = styled.div`
  font-size: 16px;
  color: #828282;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 5px;
`;

const Temperature = styled.div`
  color: #757575;
  font-size: 25px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 16px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 300;
  color: #828282;
  img {
    width: 30px;
    height: auto;
    margin-right: 15px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 300;
  color: #828282;
  img {
    width: 30px;
    height: auto;
    margin-right: 15px;
  }
`;
const Redo = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 14px;
  display: flex;
  align-items: flex-end;
  color: #828282;
  img {
    margin-left: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
  }
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const WeatherCard = (props) => {
  const { weatherElement, moment, allData, setCurrentPage, cityName } = props;
  const {
    // currentLocation,
    description,
    comfortability,
    temperature,
    weatherCode,
    windSpeed,
    rainPossibility,
    isLoading,
    observationTime,
  } = weatherElement;

  return (
    <WeatherCardWrapper>
      <img
        className="cog"
        src="/img/camping/weather-app-images/cog.svg"
        alt="cog"
        onClick={() => {
          setCurrentPage('WeatherSetting');
        }}
      />
      <div className="d-flex align-items-center mb-2">
        <Location>{cityName}</Location>
        <Temperature>
          {Math.round(temperature)} <Celsius>°C</Celsius>
        </Temperature>
      </div>
      <Description>
        {description}
        {comfortability}
      </Description>
      <WeatherIcon currentWeatherCode={weatherCode} moment={moment || 'day'} />
      <CurrentWeather>
        <AirFlow>
          <img
            src="/img/camping/weather-app-images/airFlow.svg"
            alt="airFlow"
          />
          {windSpeed} m/h
        </AirFlow>
        <Rain>
          <img src="/img/camping/weather-app-images/rain.svg" alt="rain" />
          {Math.round(rainPossibility)} %
        </Rain>
      </CurrentWeather>

      <Redo onClick={allData} isLoading={isLoading} className="redo">
        最後觀測時間：
        {new Intl.DateTimeFormat('zh-TW', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(observationTime))}
        {isLoading ? (
          <img
            className="refresh"
            src="/img/camping/weather-app-images/loading.svg"
            alt="refreshw"
          />
        ) : (
          <img
            className="refresh"
            src="/img/camping/weather-app-images/refresh.svg"
            alt="refreshw"
          />
        )}
      </Redo>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;
