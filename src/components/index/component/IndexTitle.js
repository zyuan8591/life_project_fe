import React from 'react';
import classes from '../../../styles/moduleCss/indexTitle.module.scss';
import { Link } from 'react-router-dom';

const IndexTitle = ({ title = '', subtitle = '', route = '/' }) => {
  return (
    <div className={classes.indexTitle}>
      <div className={classes.textContent}>
        <span className={classes.title}>{title}</span>
        <span className={classes.subtitle}>{subtitle}</span>
      </div>
      <Link to={route} className={classes.moreBtn}>
        MORE
      </Link>
    </div>
  );
};

export default IndexTitle;
