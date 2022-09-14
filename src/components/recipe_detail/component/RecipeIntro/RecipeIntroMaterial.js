/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const subClrBrown = '#817161';
const item = css`
  border: 1px solid ${subClrBrown};
  width: fit-content;
  &:hover {
    background: ${subClrBrown};
    color: #fff;
  }
`;

const RecipeIntroMaterial = ({ name, quantity }) => {
  return (
    <div
      className="d-flex justify-content-between rounded-pill transition py-1 px-3 text-nowrap me-2 mb-3"
      css={item}
    >
      <span className="me-2">{name}</span>
      <span>{quantity}</span>
    </div>
  );
};

export default RecipeIntroMaterial;
