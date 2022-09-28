/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Button, Empty } from 'antd';

const NoDataDisplay = ({
  noDataText = '資料',
  fontSize = '2.5rem',
  iconSize = '',
  linkFunc = '',
  linkText = '',
}) => {
  const subClrBrown = '#817161';
  const container = css`
    @media (max-width: 765px) {
      svg {
        width: 50px;
      }
    }
  `;
  const text = css`
    font-size: ${fontSize};
    color: #444;
    @media (max-width: 765px) {
      font-size: 28px;
    }
  `;
  const addNow = css`
    border: 2px solid ${subClrBrown};
    color: ${subClrBrown} !important;
    text-align: center;
    padding: 0.5rem 2rem;
    display: inline-block;
    background: #fff;
    &:hover {
      background: ${subClrBrown};
      color: white !important;
    }
  `;
  // const
  return (
    <Empty
      imageStyle={{
        height: iconSize,
      }}
      description={<span className="fs-5">目前無相關{noDataText}</span>}
    >
      {linkText && (
        <button
          onClick={() => linkFunc()}
          css={addNow}
          className="flexCenter mt-3 transition"
        >
          {linkText}
        </button>
      )}
    </Empty>
  );
};

export default NoDataDisplay;
