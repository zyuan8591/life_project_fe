import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
const IconContainer = styled.div`
  flex-basis: 30%;
  text-align: center;
  img {
    marge: 0 auto;
    max-height: 100px;
  }
`;

const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isPartiallyClearWithRain: [
    8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
  ],
  isSnowing: [23, 37, 42],
};

const weatherIcons = {
  day: {
    isThunderstorm: (
      <img
        src="/img/camping/weather-app-images/day-thunderstorm.svg"
        alt="day-thunderstorm"
      />
    ),
    isClear: (
      <img
        src="/img/camping/weather-app-images/day-clear.svg"
        alt="day-clear"
      />
    ),
    isCloudyFog: (
      <img
        src="/img/camping/weather-app-images/day-cloudy-fog.svg"
        alt="day-cloudy-fog"
      />
    ),
    isCloudy: (
      <img
        src="/img/camping/weather-app-images/day-cloudy.svg"
        alt="day-cloudy"
      />
    ),
    isFog: (
      <img src="/img/camping/weather-app-images/day-fog.svg" alt="day-fog" />
    ),
    isPartiallyClearWithRain: (
      <img
        src="/img/camping/weather-app-images/day-partially-clear-with-rain.svg"
        alt="day-partially-clear-with-rain"
      />
    ),
    isSnowing: (
      <img
        src="/img/camping/weather-app-images/day-snowing.svg"
        alt="day-snowing"
      />
    ),
  },
  night: {
    isThunderstorm: (
      <img
        src="/img/camping/weather-app-images/night-thunderstorm.svg"
        alt="night-thunderstorm"
      />
    ),
    isClear: (
      <img
        src="/img/camping/weather-app-images/night-clear.svg"
        alt="night-clear"
      />
    ),
    isCloudyFog: (
      <img
        src="/img/camping/weather-app-images/night-cloudy-fog.svg"
        alt="night-cloudy-fog"
      />
    ),
    isCloudy: (
      <img
        src="/img/camping/weather-app-images/night-cloudy.svg"
        alt="night-cloudy"
      />
    ),
    isFog: (
      <img
        src="/img/camping/weather-app-images/night-fog.svg"
        alt="night-fog"
      />
    ),
    isPartiallyClearWithRain: (
      <img
        src="/img/camping/weather-app-images/night-partially-clear-with-rain.svg"
        alt="night-partially-clear-with-rain"
      />
    ),
    isSnowing: (
      <img
        src="/img/camping/weather-app-images/night-snowing.svg"
        alt="night-snowing"
      />
    ),
  },
};

const weatherCode2Type = (weatherCode) => {
  const [weatherType] =
    Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
      weatherCodes.includes(Number(weatherCode))
    ) || [];

  return weatherType;
};

function WeatherIcon({ currentWeatherCode, moment }) {
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('isClear');

  const theWeatherIcon = useMemo(
    () => weatherCode2Type(currentWeatherCode),
    [currentWeatherCode]
  );

  useEffect(() => {
    setCurrentWeatherIcon(theWeatherIcon);
  }, [theWeatherIcon]);

  return (
    <IconContainer>{weatherIcons[moment][currentWeatherIcon]}</IconContainer>
  );
}

export default WeatherIcon;
