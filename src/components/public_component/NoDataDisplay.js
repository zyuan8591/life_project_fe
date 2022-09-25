/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const NoDataDisplay = ({
  noDataText = '資料',
  fontSize = '2.5rem',
  iconSize = '4rem',
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
    <IconContext.Provider value={{ color: '#444', size: iconSize }}>
      <div
        className="d-flex flex-column align-items-center mt-5"
        css={container}
      >
        <div className="flexCenter">
          <AiOutlineFileSearch />
          <h2 className="m-0" css={text}>
            目前無相關{noDataText}
          </h2>
        </div>
        {linkFunc && (
          <button
            onClick={() => linkFunc()}
            css={addNow}
            className="flexCenter mt-3 transition"
          >
            {linkText}
          </button>
        )}
      </div>
    </IconContext.Provider>
  );
};

export default NoDataDisplay;
