import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../utils/config';
import { IconContext } from 'react-icons';
import { MdLocationOn, MdOutlineIcecream } from 'react-icons/md';
import { GiCampingTent } from 'react-icons/gi';
// import { RiCake3Line, RiCake3Fill } from 'react-icons/ri';
// import { IoLocationOutline } from 'react-icons/io5';
// import { FaCanadianMapleLeaf } from 'react-icons/fa';

import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/map/_map.scss';
import Header from '../../components/public_component/Header';
import MapActivitySelect from './component/MapActivitySelect';
import DistanceSelect from './component/MapDistanceSelect';
import MapSortSelect from './component/MapSortSelect';
// here position
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound() {
      setPosition([25.10542873699434, 121.52266751703542]);
      map.flyTo(position, map.getZoom());
    },
  });

  const customIcon = new Icon({
    iconUrl: '/img/user/user_img/kerp.png',
    iconSize: [30, 35],
    // iconAnchor: [0, 0],
    // popupAnchor: [-0, -76]
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
// -------------

// circle
const center = [25.10542873699434, 121.52266751703542];
const fillBlueOptions = { fillColor: 'blue' };

// map container
function SetMap() {
  const [mapData, setMapData] = useState([]);
  const [mapDataLength, setMapDataLength] = useState('');
  const [typeSelect, setTypeSelect] = useState('');
  const [distanceSelect, setDistanceSelect] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [distanceSort, setDistanceSort] = useState('');
  const [radius, setRadius] = useState('');

  useEffect(() => {
    let getCampingData = async () => {
      let response = await axios.get(
        `${API_URL}/map?type=${typeSelect}&search=${nameSearch}&distance=${distanceSelect}&order=${distanceSort}`
      );
      setMapDataLength(response.data.allResultL);
      setMapData(response.data.allResult);
    };
    getCampingData();
  }, [typeSelect, distanceSelect, nameSearch, distanceSort]);

  const position = [25.10542873699434, 121.52266751703542];
  const campingIcon = new Icon({
    iconUrl: '/img/camping/activity_camping_img/ba1.png',
    iconSize: [20, 30],
  });
  const picnicIcon = new Icon({
    iconUrl: '/img/camping/activity_camping_img/ba2.png',
    iconSize: [20, 30],
  });

  return (
    <>
      <Header />
      <div className="p-view">
        <div className="mapContainer">
          <div className="mapContain">
            <div className="selectContainer">
              <div className="select ">
                <MapActivitySelect setTypeSelect={setTypeSelect} />
                <DistanceSelect
                  setDistanceSelect={setDistanceSelect}
                  setRadius={setRadius}
                />
                <MapSortSelect setDistanceSort={setDistanceSort} />
              </div>
              <div className="inputSearch">
                <input
                  className="searchInput"
                  placeholder="Search.."
                  type="text"
                  maxLength={15}
                  value={nameSearch}
                  onChange={(e) => {
                    let textValue = e.target.value.replace(/[, ]/g, '');
                    setNameSearch(textValue);
                  }}
                />
                <div style={{ color: '#817161' }}>
                  目前搜尋到 {mapDataLength} 筆
                </div>
              </div>
              <IconContext.Provider value={{ color: '#444', size: '1.3em' }}>
                <div className="mapCardContainer">
                  {mapDataLength > 0 ? (
                    mapData.map((v) => {
                      const newDistance = Math.floor(v.distance);
                      //const newAddress = v.address.substr(0, 6);
                      //console.log(newDistance);
                      return (
                        <div className="mapCard" key={v.id}>
                          <div className="mapImg">
                            <img
                              src={`/img/camping/activity_camping_img/${v.img}`}
                              alt="/"
                            />
                          </div>
                          <div className="intContainer">
                            <div className="d-flex justify-content-between">
                              <div className="intDate">{v.activity_date}</div>
                              <div className="intDistance">
                                {newDistance} km
                              </div>
                            </div>
                            <div className="intTitle">{v.title}</div>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <MdLocationOn />
                                <div>{v.address}</div>
                              </div>
                              <IconContext.Provider
                                value={{
                                  color: '#F2AC33',
                                  size: '1.8em',
                                }}
                              >
                                <div>
                                  {v.type === 1 ? (
                                    <Link to={`/activity/camping/${v.id}`}>
                                      <GiCampingTent />
                                    </Link>
                                  ) : (
                                    <Link
                                      to={`/activity/picnic/official/${v.id}`}
                                    >
                                      <MdOutlineIcecream />
                                    </Link>
                                  )}
                                </div>
                              </IconContext.Provider>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="noDataText">尚無符合的資料</div>
                  )}
                </div>
              </IconContext.Provider>
            </div>
            <div className="leaflet-container">
              <div className="map" id="map">
                <MapContainer
                  center={position}
                  zoom={12}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Circle
                    center={center}
                    pathOptions={fillBlueOptions}
                    radius={radius}
                  />
                  {mapData.map((v) => {
                    return (
                      <div key={v.id}>
                        <Marker
                          // key={v.id}
                          position={[v.lat, v.lng]}
                          icon={v.type === 1 ? campingIcon : picnicIcon}
                        >
                          <Popup>
                            <div>
                              {v.type === 1 ? (
                                <Link
                                  to={`/activity/camping/${v.id}`}
                                  style={{ color: '#221E73' }}
                                >
                                  {v.place}
                                </Link>
                              ) : (
                                <Link
                                  to={`/activity/picnic/offical/${v.id}`}
                                  style={{ color: '#221E73' }}
                                >
                                  {v.place}
                                </Link>
                              )}
                              <div>{v.address}</div>
                            </div>
                          </Popup>
                        </Marker>
                      </div>
                    );
                  })}
                  <LocationMarker />
                  <Marker
                    position={[25.10542873699434, 121.52266751703542]}
                    icon={
                      new Icon({
                        iconUrl: '/img/user/user_img/kerp.png',
                        iconSize: [30, 35],
                      })
                    }
                  >
                    <Popup>You are here</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* RWD */}
      <div className="m-view">
        <div className="mapContainer">
          <div className="mapContain">
            <div className="leaflet-container">
              <div className="map" id="map">
                <MapContainer
                  center={position}
                  zoom={12}
                  scrollWheelZoom={true}
                  // icon={centerIcon}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Circle
                    center={center}
                    pathOptions={fillBlueOptions}
                    radius={radius}
                  />
                  {mapData.map((v) => {
                    return (
                      <div key={v.id}>
                        <Marker
                          // key={v.id}
                          position={[v.lat, v.lng]}
                          icon={v.type === 1 ? campingIcon : picnicIcon}
                        >
                          <Popup>
                            <div>
                              {v.type === 1 ? (
                                <Link
                                  to={`/activity/camping/${v.id}`}
                                  style={{ color: '#221E73' }}
                                >
                                  {v.place}
                                </Link>
                              ) : (
                                <Link
                                  to={`/activity/picnic/offical/${v.id}`}
                                  style={{ color: '#221E73' }}
                                >
                                  {v.place}
                                </Link>
                              )}
                              <div>{v.address}</div>
                            </div>
                          </Popup>
                        </Marker>
                      </div>
                    );
                  })}
                  <LocationMarker />
                  <Marker
                    position={[25.10542873699434, 121.52266751703542]}
                    icon={
                      new Icon({
                        iconUrl: '/img/user/user_img/kerp.png',
                        iconSize: [30, 35],
                      })
                    }
                  >
                    <Popup>You are here</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div className="selectContainer">
              <div className="select ">
                <MapActivitySelect setTypeSelect={setTypeSelect} />
                <DistanceSelect
                  setDistanceSelect={setDistanceSelect}
                  setRadius={setRadius}
                />
                <MapSortSelect setDistanceSort={setDistanceSort} />
              </div>
              <div className="inputSearch">
                <input
                  className="searchInput"
                  placeholder="Search.."
                  type="text"
                  maxLength={15}
                  value={nameSearch}
                  onChange={(e) => {
                    let textValue = e.target.value.replace(/[, ]/g, '');
                    setNameSearch(textValue);
                  }}
                />
                <div style={{ color: '#817161' }}>
                  目前搜尋到 {mapDataLength} 筆
                </div>
              </div>
              <IconContext.Provider value={{ color: '#444', size: '1.3em' }}>
                <div className="mapCardContainer">
                  {mapDataLength > 0 ? (
                    mapData.map((v) => {
                      const newDistance = Math.floor(v.distance);
                      //const newAddress = v.address.substr(0, 6);
                      //console.log(newDistance);
                      return (
                        <div className="mapCard" key={v.id}>
                          <div className="mapImg">
                            <img
                              src={`/img/camping/activity_camping_img/${v.img}`}
                              alt="/"
                            />
                          </div>
                          <div className="intContainer">
                            <div className="d-flex justify-content-between">
                              <div className="intDate">{v.activity_date}</div>
                              <div className="intDistance">
                                {newDistance} km
                              </div>
                            </div>
                            <div className="intTitle">{v.title}</div>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <MdLocationOn />
                                <div>{v.address}</div>
                              </div>
                              <IconContext.Provider
                                value={{
                                  color: '#F2AC33',
                                  size: '1.8em',
                                }}
                              >
                                <div>
                                  {v.type === 1 ? (
                                    <Link to={`/activity/camping/${v.id}`}>
                                      <GiCampingTent />
                                    </Link>
                                  ) : (
                                    <Link
                                      to={`/activity/picnic/offical/${v.id}`}
                                    >
                                      <MdOutlineIcecream />
                                    </Link>
                                  )}
                                </div>
                              </IconContext.Provider>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="noDataText">尚無符合的資料</div>
                  )}
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetMap;
