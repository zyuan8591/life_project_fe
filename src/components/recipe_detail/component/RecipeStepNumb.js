/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const subClrBrown = '#817161';
const stepContainer = css`
  width: 50px;
  height: 50px;
  border: 1px solid ${subClrBrown};
  color: ${subClrBrown};
  &.active {
    color: #fff;
    background: ${subClrBrown};
  }
`;

const RecipeStepNumb = ({ num = 5, onClick, stepNow, stepScrollTo }) => {
  const getPages = () => {
    let stepNum = [];
    for (let i = 0; i < num; i++) {
      stepNum.push(
        <div
          key={uuidv4()}
          className={`p-3 text-center lh-1 d-inline-block rounded-circle me-3 mb-3 fw-bold ${
            stepNow === i + 1 ? 'active' : ''
          } cursorPointer`}
          css={stepContainer}
          onClick={() => {
            onClick(i + 1);
            stepScrollTo(i);
          }}
        >
          {i + 1}
        </div>
      );
    }
    return stepNum;
  };

  return <>{getPages()}</>;
};

export default RecipeStepNumb;
