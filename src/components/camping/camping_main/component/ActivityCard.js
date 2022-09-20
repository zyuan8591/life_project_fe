import React from 'react';
import classes from '../../../../styles/moduleCss/camping_main/ActivityCard.module.scss';
import { IconContext } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';

function ActivityCard({
  v,
  stateClassName,
  user,
  userCollected,
  setUserCollected,
  setCollectConfirm,
  setCollectCancel,
  setLoginBtn,
}) {
  const dataReplace = (date) => {
    return date.replace(/-/g, '/');
  };

  const priceReplace = (price) => {
    const newPrice = price.toString();
    return newPrice.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  const progressBarWidth = () => {
    if (v.pepcount === 0) return 0;
    let width = (v.pepcount / v.join_limit) * 220 - 2;
    return width + 'px';
  };

  const handleAddCollect = async (campingId) => {
    // console.log(campingId);
    let response = await axios.post(
      `${API_URL}/camping/campingCollect/${campingId}`,
      {},
      { withCredentials: true }
    );
    console.log('add', response.data);
    let collected = response.data.getCamping.map((v) => v.activity_id);
    setUserCollected(collected);
    // TODO: 修改alert
    setCollectConfirm(true);
    setTimeout(() => {
      setCollectConfirm(false);
    }, 2000);
  };

  const handleDelCollect = async (campingId) => {
    // console.log(campingId);
    let response = await axios.delete(
      `${API_URL}/camping/campingCollect/${campingId}`,
      { withCredentials: true }
    );
    console.log('del', response.data);
    let collected = response.data.getCamping.map((v) => v.activity_id);
    setUserCollected(collected);
    // TODO: 修改alert
    setCollectCancel(true);
    setTimeout(() => {
      setCollectCancel(false);
    }, 2000);
  };

  return (
    <>
      <div className={classes.activityCardStyle}>
        <div className={classes.activityImg}>
          <img
            src={`/img/camping/activity_camping_img/${v.img1}`}
            alt="camping"
          />
        </div>
        <div className={classes.activityInfo}>
          <div className={`${classes.activityTitle} my-2`}>
            <div className={classes.title}>{v.title}</div>
            {user ? (
              userCollected.includes(v.id) ? (
                <IconContext.Provider
                  value={{ className: classes.collectedBtn }}
                >
                  <FaHeart
                    onClick={() => {
                      handleDelCollect(v.id);
                    }}
                  />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ className: classes.collectBtn }}>
                  <FaHeart
                    onClick={() => {
                      handleAddCollect(v.id);
                    }}
                  />
                </IconContext.Provider>
              )
            ) : (
              <IconContext.Provider value={{ className: classes.collectBtn }}>
                <FaHeart
                  // className={classes.collect}
                  onClick={() => {
                    // TODO: 改掉alert
                    setLoginBtn(true);
                  }}
                />
              </IconContext.Provider>
            )}
          </div>
          <div className={`d-flex ${classes.labelContent}`}>
            <div className="d-flex">
              <div className={classes.label}>{v.location}</div>
              <div
                className={classes.stateLabel}
                style={{ backgroundColor: `${stateClassName(v.state)}` }}
              >
                {v.state}
              </div>
            </div>
            <div className={classes.price}>$ {priceReplace(v.price)}</div>
          </div>

          <div className={`${classes.activityDate} my-2`}>
            <div>
              {dataReplace(v.activity_start_date)} ~
              {dataReplace(v.activity_end_date)}
            </div>
          </div>
          <div className={classes.progressBar}>
            <div
              className={classes.bar}
              style={{ width: progressBarWidth() }}
            ></div>
          </div>
          <div className={classes.content}>
            <div className={classes.limit}>目前人數：{v.pepcount}</div>
            <div className={classes.limit}>活動名額：{v.join_limit}</div>
          </div>
          <div className={`${classes.activityText} mt-1`}>
            <div className={classes.activityInt}>活動簡介：</div>
            <div className={classes.intContent}>{v.activity_about}</div>
          </div>
          <div className={`${classes.intMore} my-1`}>
            <IconContext.Provider value={{ className: classes.moreIcon }}>
              <Link to={`/activity/camping/${v.id}`} className={classes.more}>
                more
                <HiChevronDoubleRight />
              </Link>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityCard;
