/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';

const subClrBrown = '#817161';
const contentClr = '#444';
const hoverClr = '#eee';

const indexTitle = css`
  border-bottom: 2px solid ${hoverClr};
`;
const textContent = css`
  font-size: 32px;
  color: ${contentClr};
  border-bottom: 2px solid ${subClrBrown};
  margin-bottom: -2px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
  @media (max-width: 500px) {
    font-size: 20px;
  }
`;
const sub = css`
  font-family: 'Kanit', sans-serif;
`;
const moreBtn = css`
  opacity: 0.5;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const IndexTitle = ({ title = '', subtitle = '', route = '/' }) => {
  return (
    <div
      css={indexTitle}
      className="d-flex justify-content-between align-items-center"
    >
      <div css={textContent}>
        <span className="fw-bold">{title}</span>
        <span css={sub} className="ms-3">
          {subtitle}
        </span>
      </div>
      <Link to={route} css={moreBtn}>
        MORE
      </Link>
    </div>
  );
};

export default IndexTitle;
