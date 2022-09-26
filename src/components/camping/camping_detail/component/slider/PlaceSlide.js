import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { MdLocationOn } from 'react-icons/md';
import classes from '../../../../../styles/moduleCss/camping_detail_page/PlaceSlide.module.scss';
import { API_URL_IMG } from '../../../../../utils/config';

function PlaceSlide({ placeSlider, mapDataId }) {
  const newAddress = (address) => {
    return address.substr(0, 6);
  };
  const newDistance = (distance) => {
    return Math.floor(distance);
  };
  return (
    <>
      <div className={classes.slide}>
        <div
          className={classes.placeSlider}
          style={{ transform: `translateX(${placeSlider}px)` }}
        >
          <IconContext.Provider value={{ color: '#444', size: '1.5rem' }}>
            {/* card 更換 */}
            {mapDataId.map((v) => {
              const allJoin = v.users;
              const joinSlice = allJoin.slice(0, 3);
              const allJoinL = allJoin.length;
              //console.log(joinSlice);

              const countAll = (count) => {
                const total = count - 3;
                return `+${total}`;
              };

              return (
                <div className={classes.placeSliderContainer} key={v.id}>
                  <div className={classes.contentDate}>{v.activity_date}</div>
                  <div className={classes.contentName}>{v.place}</div>
                  <div className="d-flex align-items-center">
                    <MdLocationOn />
                    <div className={classes.contentCounty}>
                      {newAddress(v.address)}
                    </div>
                  </div>
                  <div className={classes.contentDistance}>
                    距離當前活動： {newDistance(v.distance)} km
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      {allJoinL !== 0 ? (
                        joinSlice.map((v) => {
                          return (
                            <div className="d-flex" key={v.id}>
                              <div style={{ marginLeft: '-4px' }}>
                                <div className={classes.contentImg}>
                                  <img
                                    src={`${API_URL_IMG}${v.photo}`}
                                    alt="/"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className={classes.emptyImg}></div>
                      )}

                      {allJoinL < 4 ? (
                        ''
                      ) : (
                        <div className="d-flex" key={v.id}>
                          <div className={classes.addCount}>
                            <div className="countNumber">
                              {countAll(allJoinL)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <Link
                      to={`/activity/camping/${v.id}`}
                      className={classes.contentBtn}
                    >
                      更多詳情
                    </Link>
                  </div>
                </div>
              );
            })}
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
}

export default PlaceSlide;
