import React from 'react';
import classes from '../../../styles/moduleCss/indexActivity.module.scss';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

const IndexActivity = () => {
  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        <Link to="/" className={classes.card}>
          <figure className={classes.imgContainer}>
            <img
              className="objectContain"
              src="/img/index/indexCamping.png"
              alt="campImage"
            />
          </figure>
          <div className={classes.textContent}>
            <span>Camping</span>
            <span>立即前往露營</span>
          </div>
          <IconContext.Provider value={{ color: '#817161', size: '0.75rem' }}>
            <FaArrowAltCircleRight />
          </IconContext.Provider>
        </Link>
      </div>
      <div className={classes.btns}></div>
    </div>
  );
};

export default IndexActivity;
