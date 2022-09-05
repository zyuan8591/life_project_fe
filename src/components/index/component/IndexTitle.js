/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';

const subClrBrown = '#817161';
const contentClr = '#444';
const hoverClr = '#eee';

const indexTitle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${hoverClr};
`;
const textContent = css`
  font-size: 32px;
  color: $contentClr;
  border-bottom: 2px solid ${subClrBrown};
  margin-bottom: -2px;
`;
const title = css`
  font-weight: bold;
`;
const subtitle = css`
  font-family: 'Kanit', sans-serif;
  margin-left: 1rem;
`;
const moreBtn = css`
  opacity: 0.5;
`;

const IndexTitle = ({ title = '', subtitle = '', route = '/' }) => {
  return (
    <div css={indexTitle}>
      <div css={textContent}>
        <span css={title}>{title}</span>
        <span css={subtitle}>{subtitle}</span>
      </div>
      <Link to={route} css={moreBtn}>
        MORE
      </Link>
    </div>
  );
};

export default IndexTitle;
