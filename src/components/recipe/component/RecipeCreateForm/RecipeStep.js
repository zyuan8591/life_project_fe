import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TbTrash, TbMenu2 } from 'react-icons/tb';
import { AiOutlinePlus, AiOutlineCamera } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const container = css`
  display: grid;
  grid-template-columns: 3fr 7fr;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  gap: 1rem;
`;
const imgContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #eee;
  border-radius: 3px;
`;
const main = css``;

const RecipeStep = ({ i, delStep, addStep }) => {
  const [content, setContent] = useState('');
  return (
    <div css={container}>
      {/* img input */}
      <label
        htmlFor="recipeStepImg"
        css={imgContainer}
        className="cursorPointer"
      >
        <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
          <AiOutlineCamera />
        </IconContext.Provider>

        <span>點擊新增圖片</span>
      </label>
      <input type="file" className="d-none" id="recipeStepImg" />
      {/* right section */}
      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between">
          <span className="fw-bold">{i + 1}</span>
          <div className="d-flex gap-1">
            <IconContext.Provider
              value={{
                color: '#444',
                size: '1.5rem',
                className: 'cursorPointer',
              }}
            >
              <div onClick={() => addStep(i)}>
                <AiOutlinePlus />
              </div>
              <div onClick={() => delStep(i)}>
                <TbTrash />
              </div>
              <div>
                <TbMenu2 />
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <textarea
          placeholder="請輸入步驟說明 (最多 150 字)"
          rows="4"
          cols="auto"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <span className="align-self-end">0/150</span>
      </div>
    </div>
  );
};

export default RecipeStep;
