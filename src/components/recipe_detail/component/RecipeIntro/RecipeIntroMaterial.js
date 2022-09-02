/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const subClrBrown = '#817161';
const item = css`
  padding: 0.25rem 1rem;
  transition: 0.3s;
  border-radius: 3px;
  &:hover {
    background: ${subClrBrown};
    color: #fff;
  }
`;

const RecipeIntroMaterial = ({ name = '高麗菜', quantity = '87公克' }) => {
  return (
    <div className="d-flex justify-content-between w-100" css={item}>
      <span>{name}</span>
      <span>{quantity}</span>
    </div>
  );
};

export default RecipeIntroMaterial;
