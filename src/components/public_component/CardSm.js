/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';

const imgWidth = '270px';

const container = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #444;
  flex: 0 0 270px;
  @media (max-width: 768px) {
    flex: 0 0 220px;
  }
  @media (max-width: 500px) {
    flex: 0 0 200px;
  }
`;
const cardTitle = css`
  font-weight: bold;
  font-size: 1.25rem;
`;
const imgContainer = css`
  margin: 0;
  max-width: ${imgWidth};
  max-height: ${imgWidth};
  overflow: hidden;
  @media (max-width: 768px) {
    max-width: 220px;
  }
  @media (max-width: 500px) {
    max-width: 200px;
  }
`;
const cartType = css`
  color: $subClrBrown;
  font-weight: bold;
`;

const CardSm = ({ title, type, name, img, link, bg = '', className = '' }) => {
  return (
    <div css={container}>
      {title && <div css={cardTitle}>{title}</div>}

      <figure
        css={imgContainer}
        style={{ background: bg }}
        className={className}
      >
        <img src={img} alt={name} className="objectContain cardImg" />
      </figure>

      <Link
        to={link}
        css={css`
          font-size: 14px;
        `}
      >
        <div css={cartType}>{type}</div>
        <div>{name}</div>
      </Link>
    </div>
  );
};

export default CardSm;
