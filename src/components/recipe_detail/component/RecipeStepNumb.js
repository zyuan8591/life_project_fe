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

const RecipeStepNumb = ({ num = 5, onClick }) => {
  const [stepNow, setStepNow] = useState(0);
  return (
    <>
      {Array(num)
        .fill('')
        .map((d, i) => {
          return (
            <div
              key={uuidv4()}
              className={`p-3 text-center lh-1 d-inline-block rounded-circle me-3 fw-bold ${
                stepNow === i ? 'active' : ''
              } cursorPointer`}
              css={stepContainer}
              onClick={(e) => setStepNow(i)}
            >
              {i + 1}
            </div>
          );
        })}
    </>
  );
};

export default RecipeStepNumb;
