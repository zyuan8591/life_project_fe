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
    border: 1.7px solid rgba(0, 0, 0, 0.2);
    background: none;
    height: fit-content;
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
