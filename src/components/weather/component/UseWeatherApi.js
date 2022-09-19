import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

let CurrentWeatherData = async (locationName) => {
  let response = await axios.get(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-C5E85170-D7E9-487C-B77C-CE5A0D971130&locationName=${locationName}`
  );

  const locationData = response.data.records.location[0];
  const weatherElements = locationData.weatherElement.reduce(
    (neededElements, item) => {
      if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
        neededElements[item.elementName] = item.elementValue;
      }
      return neededElements;
    },
    {}
  );

  return {
    observationTime: locationData.time.obsTime,
    locationName: locationData.locationName,
    temperature: weatherElements.TEMP,
    windSpeed: weatherElements.WDSD,
    humid: weatherElements.HUMD,
  };
  // console.log(locationData);
};

let weatherForecastData = async (cityName) => {
  let response = await axios.get(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-C5E85170-D7E9-487C-B77C-CE5A0D971130&locationName=${cityName}`
  );

  const locationData = response.data.records.location[0];
  const weatherElements = locationData.weatherElement.reduce(
    (neededElements, item) => {
      if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
        neededElements[item.elementName] = item.time[0].parameter;
      }
      return neededElements;
    },
    {}
  );

  return {
    description: weatherElements.Wx.parameterName,
    weatherCode: weatherElements.Wx.parameterValue,
    rainPossibility: weatherElements.PoP.parameterName,
    comfortability: weatherElements.CI.parameterName,
  };
  // console.log(locationData);
};

const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation;
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    description: '',
    temperature: 0,
    windSpeed: 0,
    humid: 0,
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true,
  });

  const allData = useCallback(() => {
    const allDataItem = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        CurrentWeatherData(locationName),
        weatherForecastData(cityName),
      ]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      });
      // console.log(weatherElement);
    };
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    allDataItem();
  }, [locationName, cityName]);

  useEffect(() => {
    allData();
  }, [allData]);
  return [weatherElement, allData];
};
export default useWeatherApi;
