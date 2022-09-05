import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TbTrash, TbMenu2 } from 'react-icons/tb';
import { IconContext } from 'react-icons';

const container = css`
  display: grid;
  grid-template-columns: 6fr 3fr 1fr;
  gap: 1rem;
  align-items: center;
`;
const name = css``;
const num = css``;
const btns = css`
  display: flex;
  justify-content: space-around;
`;

const RecipeMaterial = ({ delHandler, dragHandler }) => {
  return (
    <IconContext.Provider
      value={{ color: '#444', size: '1.5rem', className: 'cursorPointer' }}
    >
      <div css={container}>
        <input type="text" placeholder="食材" css={name} />
        <input type="text" placeholder="份量" css={num} />
        <div css={btns}>
          <TbTrash />
          <TbMenu2 />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default RecipeMaterial;
