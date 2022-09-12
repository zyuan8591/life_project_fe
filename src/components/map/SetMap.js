import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
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

// map container
function SetMap() {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    let getCampingData = async () => {
      let response = await axios.get(`${API_URL}/map`);
      // console.log(response.data.result);

      setMapData(response.data.result);
    };
    getCampingData();
  }, []);

  const position = [24.6233140379895, 120.844803893144];
  const customIcon = new Icon({
    iconUrl: '/img/user/user_img/joe.png',
    iconSize: [30, 30],
    // iconAnchor: [0, 0],
    // popupAnchor: [-0, -76]
  });

  return (
    <>
      <Header />
      <div className="mapContainer">
        <div className="mapContain">
          <div className="selectContainer">
            <div className="select ">
              <MapActivitySelect className="" />
              <DistanceSelect />
            </div>
            <div className="mapCardContainer">
              <div className="mapCard">
                <figure>
                  <img
                    src="/img/camping/activity_camping_img/camping_01_01.jpeg"
                    alt="/"
                  />
                </figure>
                <div className="d-flex justify-content-between">
                  <div>2022/08/01~2022/08/31</div>
                  <div>300km</div>
                </div>
                <div>露營FUN輕鬆</div>
                <div className="d-flex justify-content-between">
                  <div>新北市三峽區</div>
                  <div>icon</div>
                </div>
              </div>
            </div>
          </div>
          <div className="leaflet-container">
            <div className="map" id="map">
              <MapContainer center={position} zoom={11} scrollWheelZoom={true}>
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
                        icon={customIcon}
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
