/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const RecipeCateBtn = ({ cateNum, type, content, active }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const btnColor = type === 'recipeCate' ? '#817161' : '#1F9998';

  const btn = css`
    color: #444;
    padding: 0.5rem 0.75rem;
    border-radius: 3px;
    border: none;
    box-shadow: 0px 0px 1.7px rgba(0, 0, 0, 0.5);
    background: none;
    &:hover,
    &.active {
      background: ${btnColor};
      color: #fff;
    }
  `;

  return (
    <button
      css={btn}
      className={`${active ? 'active' : ''} text-nowrap`}
      onClick={() => {
        const params = Object.fromEntries([...searchParams]);
        params[type] = cateNum;
        setSearchParams(params);
      }}
    >
      {content}
    </button>
  );
};

export default RecipeCateBtn;
