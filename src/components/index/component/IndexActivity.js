import React from 'react';
import classes from '../../../styles/moduleCss/indexActivity.module.scss';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

const imgRoute = '/img/index/';

const IndexActivity = () => {
  const activity = [
    {
      titleEn: 'Activities',
      titleCh: '活動專區',
      img: 'indexActivity.png',
      link: '/activity',
    },
    {
      titleEn: 'Camping',
      titleCh: '立即前往露營',
      img: 'indexCamping.png',
      link: '/activity/camping',
    },
    {
      titleEn: 'Picnic',
      titleCh: '立即前往野餐',
      img: 'indexPicnic.png',
      link: '/activity/picnic',
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        {activity.map((a, i) => {
          return (
            <Link to={a.link} key={a.titleEn} className={classes.card}>
              <div className={classes.cardCotainer}>
                <figure className={classes.imgContainer}>
                  <img
                    className="objectContain"
                    src={`/img/index/${a.img}`}
                    alt="campImage"
                  />
                </figure>
                <div className={classes.textContent}>
                  <span>{a.titleEn}</span>
                  <span>{a.titleCh}</span>
                </div>
                <IconContext.Provider
                  value={{ color: '#817161', size: '0.75rem' }}
                >
                  <FaArrowAltCircleRight />
                </IconContext.Provider>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={classes.btns}>
        <Link to="/activity/picnic/official" className={classes.btn}>
          <IconContext.Provider value={{ color: '#817161', size: '0.75rem' }}>
            <FaArrowAltCircleRight />
          </IconContext.Provider>
          <span>官方活動一覽</span>
        </Link>
        <Link to="/activity/picnic/group" className={classes.btn}>
          <IconContext.Provider value={{ color: '#817161', size: '0.75rem' }}>
            <FaArrowAltCircleRight />
          </IconContext.Provider>
          <span>私人活動一覽</span>
        </Link>
      </div>
    </div>
  );
};

export default IndexActivity;
