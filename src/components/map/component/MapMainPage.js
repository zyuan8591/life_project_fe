import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../utils/config';
import { useParams } from 'react-router-dom';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../styles/map/_mapMainPage.scss';
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
    iconUrl: '/img/user/user_img/userAvatar/kerp.png',
    iconSize: [30, 35],
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
// -------------

// map container
function MapMainPage() {
  const { campingId } = useParams();
  const [mapData, setMapData] = useState([]);
  const [typeSelect, setTypeSelect] = useState('');
  const [distanceSelect, setDistanceSelect] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [distanceSort, setDistanceSort] = useState('');

  useEffect(() => {
    let getCampingData = async () => {
      let response = await axios.get(
        `${API_URL}/map?type=${typeSelect}&search=${nameSearch}&distance=${distanceSelect}&order=${distanceSort}`
      );
      setMapData(response.data.allResult);
    };
    getCampingData();

    // let getAsideId = async () => {
    //   let response = await axios.get(`${API_URL}/map/${campingId}`);
    //   console.log(response.data.asideIdresult);
    // };
    // getAsideId();
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
      <div className="mapMainContain">
        <div className="mapContain">
          <div className="leaflet-container">
            <div className="map" id="map">
              <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
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
                            {v.type === 1 ? (
                              <Link
                                to={`/activity/camping/${v.id}`}
                                style={{ color: '#221E73' }}
                              >
                                {v.place}
                              </Link>
                            ) : (
                              <Link
                                to={`/activity/picnic/${v.id}`}
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
                      iconUrl: '/img/user/user_img/userAvatar/kerp.png',
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
        <Link to="/map">
          <div className="linkBtn">搜尋更多活動地點</div>
        </Link>
      </div>
    </>
  );
}

export default MapMainPage;
