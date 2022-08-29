import React from 'react';
import { Link } from 'react-router-dom';

const CardSm = ({ title, type, name, img, link }) => {
  return (
    <div>
      {title && <div>{title}</div>}
      <img src={img} alt={name} />
      <Link to={link}>
        <div>{type}</div>
        <div>{name}</div>
      </Link>
    </div>
  );
};

export default CardSm;
