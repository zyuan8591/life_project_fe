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
`;
const cardTitle = css`
  font-weight: bold;
  font-size: 1.25rem;
`;
const imgContainer = css`
  margin: 0;
  max-width: ${imgWidth};
  max-height: ${imgWidth};
`;
const cartType = css`
  color: $subClrBrown;
  font-weight: bold;
`;

const CardSm = ({ title, type, name, img, link, bg = '' }) => {
  return (
    <div css={container}>
      {title && <div css={cardTitle}>{title}</div>}

      <figure css={imgContainer} style={{ background: bg }}>
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
