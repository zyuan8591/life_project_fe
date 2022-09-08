/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const subClrBrown = '#817161';
const title = css`
  border-left: 5px solid ${subClrBrown};
`;
const commentContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-column-gap: 1rem;
`;
const recommend = css`
  border: 2px solid ${subClrBrown};
`;
const avatorContainer = css`
  max-width: 80px;
`;
const borderBottom = css`
  border-bottom: 1px solid ${subClrBrown};
`;
const commentArea = css`
  resize: none;
  border: 2px solid ${subClrBrown};
  color: #444;
  &:focus {
    outline: none;
    &::placeholder {
      color: transparent;
    }
  }
`;
const commentSubmitBtn = css`
  background: ${subClrBrown};
`;

const RecipeComments = () => {
  return (
    <>
      <div className="fs-2 ps-2 lh-sm mb-3" css={title}>
        食譜評論
      </div>
      <div css={commentContainer}>
        {Array(5)
          .fill('')
          .map((a, i) => {
            return (
              <div
                className="d-flex align-items-center mb-3 rounded-1"
                css={recommend}
                key={i}
              >
                <figure css={avatorContainer} className="m-0">
                  <img
                    src="/img/user/user_img/alen.png"
                    alt=""
                    className="objectContain"
                  />
                </figure>
                <div className="d-flex flex-column w-100 px-3">
                  <span css={borderBottom}>Aaron</span>
                  <span>超級好吃</span>
                </div>
              </div>
            );
          })}
      </div>
      <div className="position-relative">
        <textarea
          name=""
          id=""
          rows="10"
          className="w-100 p-3 rounded-1"
          css={commentArea}
          placeholder="寫下您的評論 ..."
        ></textarea>
        <button
          className="position-absolute text-nowrap bottom-0 end-0 mb-3 me-3 border-0 text-white py-2 px-3 rounded-1"
          css={commentSubmitBtn}
        >
          送出
        </button>
      </div>
    </>
  );
};

export default RecipeComments;
