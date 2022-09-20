import React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { availableLocations } from '../component/Utils';

const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 250px;
  box-shadow: 0.1px 0.1px 5px #ccc;
  box-sizing: border-box;
  padding: 15px;
  margin: 75px 25px;
  border-radius: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  color: #444;
  margin-bottom: 30px;
  text-align: center;
`;

const StyledInputList = styled.input`
  display: block;
  box-sizing: border-box;
  background: transparent;
  outline: none;
  width: 100%;
  max-width: 85%;
  font-size: 16px;
  padding: 7px 10px;
  margin: 0 auto 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  &:focus {
    border: 1px solid #817161;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 30px;
    width: 75px;
    border-radius: 5px;
    color: white;
    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }

    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`;

const Back = styled.button`
  && {
    background-color: #b9bdc5;
  }
`;

const Save = styled.button`
  && {
    background-color: #817161;
  }
`;

const locations = availableLocations.map((location) => location.cityName);

const WeatherSetting = ({
  setCurrentPage,
  setRemind,
  remind,
  cityName,
  setCurrentCity,
}) => {
  const [locationName, setLocationName] = useState(cityName);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setLocationName(e.target.value);
    setRemind('');
  };

  const handleSave = () => {
    // 是否包含在 locations 內
    if (locations.includes(locationName)) {
      // console.log(`儲存的地區資訊為：${locationName}`);
      setCurrentCity(locationName);

      // setCurrentPage 導回天氣資訊頁
      setCurrentPage('WeatherCard');
    } else {
      setRemind(`"${locationName}"並非有效的地區`);
      return;
    }
  };

  const remindText = () => {
    setRemind('');
    setCurrentPage('WeatherCard');
  };

  return (
    <WeatherSettingWrapper>
      <Title>請選擇搜尋區域</Title>
      <StyledInputList
        list="location-list"
        id="location"
        name="location"
        placeholder="Search.."
        onChange={handleChange}
      />
      <datalist id="location-list">
        {locations.map((l) => (
          <option value={l} key={l} />
        ))}
      </datalist>
      <div className="remind">{remind}</div>
      <ButtonGroup>
        <Back onClick={remindText}>返回</Back>
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
    </WeatherSettingWrapper>
  );
};

export default WeatherSetting;
