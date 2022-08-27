import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../styles/moduleCss/cardSm.module.scss';

const CardSm = ({ title, type, name, img, link, bg = '' }) => {
  return (
    <div className={classes.cardSm}>
      {title && <div className={classes.cardTitle}>{title}</div>}

      <figure className={classes.imgContainer} style={{ background: bg }}>
        <img src={img} alt={name} className="objectContain cardImg" />
      </figure>

      <Link to={link} className={classes.cardLink}>
        <div className={classes.type}>{type}</div>
        <div>{name}</div>
      </Link>
    </div>
  );
};

export default CardSm;
