import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { IconContext } from 'react-icons';
import { MdLocationOn } from 'react-icons/md';
import { GiCampingTent } from 'react-icons/gi';
import { SiPicnic } from 'react-icons/si';

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Map,
  useMapEvents,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/map/_map.scss';
import Header from '../../components/public_component/Header';
import MapActivitySelect from '../../components/map/MapActivitySelect';
import DistanceSelect from '../../components/map/MapDistanceSelect';
// here position
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const customIcon = new Icon({
    iconUrl: '/img/user/user_img/horse.png',
    iconSize: [30, 30],
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
// map container
function SetMap() {
  const [mapData, setMapData] = useState([]);
  const [typeSelect, setTypeSelect] = useState('');
  const [centerPosL, setCenterPosL] = useState(23.8896861412312);
  const [centerPosR, setCenterPosR] = useState(120.9216218);

  // console.log(centerPosL, centerPosR);
  useEffect(() => {
    let getCampingData = async () => {
      let response = await axios.get(`${API_URL}/map?type=${typeSelect}`);
      // console.log(response.data.result);

      setMapData(response.data.result);
    };
    getCampingData();
  }, [typeSelect]);

  const position = [centerPosL, centerPosR];
  const campingIcon = new Icon({
    iconUrl: '/img/user/user_img/joe.png',
    iconSize: [30, 30],
    // iconAnchor: [0, 0],
    // popupAnchor: [-0, -76]
  });
  const picnicIcon = new Icon({
    iconUrl: '/img/user/user_img/amy.png',
    iconSize: [30, 30],
  });
  const centerIcon = new Icon({
    iconUrl: '/img/user/user_img/sandy.png',
    iconSize: [30, 30],
  });

  return (
    <>
      <Header />
      <div className="mapContainer">
        <div className="mapContain">
          <div className="selectContainer">
            {/* TODO: 區域篩選？ */}
            <div className="select ">
              <MapActivitySelect
                setTypeSelect={setTypeSelect}
                setCenterPosL={setCenterPosL}
                setCenterPosR={setCenterPosR}
              />
              <DistanceSelect />
              <input
                className="searchInput"
                placeholder="Search.."
                type="text"
                maxLength={12}
                // value={titleSearch}
                onChange={(e) => {
                  // let textValue = e.target.value.replace(/[, ]/g, '');
                  // setTitleSearch(textValue);
                }}
              />
            </div>
            <IconContext.Provider value={{ color: '#444', size: '1.3em' }}>
              <div className="mapCardContainer">
                {mapData.map((v) => {
                  const newAddress = v.address.substr(0, 6);
                  //console.log(newAddress);
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
                          <div className="intDistance">300km</div>
                        </div>
                        <div className="intTitle">{v.title}</div>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center">
                            <MdLocationOn />
                            <div className="intAddress">{newAddress}</div>
                          </div>
                          <IconContext.Provider
                            value={{ color: '#F2AC33', size: '1.5em' }}
                          >
                            <div>
                              {v.type === 1 ? <GiCampingTent /> : <SiPicnic />}
                            </div>
                          </IconContext.Provider>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </IconContext.Provider>
          </div>
          <div className="leaflet-container">
            <div className="map" id="map">
              <MapContainer
                center={position}
                zoom={11}
                scrollWheelZoom={true}
                icon={centerIcon}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                            <div style={{ color: '#221E73' }}>{v.place}</div>
                            <div>{v.address}</div>
                          </div>
                        </Popup>
                      </Marker>
                    </div>
                  );
                })}
                <LocationMarker />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetMap;
