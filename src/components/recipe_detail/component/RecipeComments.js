/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { useSearchParams } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';

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

const RecipeComments = ({ data, setData, setRecipeData }) => {
  console.log('comment', typeof data);
  const [comment, setComment] = useState('');
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');

  const commentHandler = (e) => {
    setComment(e.target.value);
  };
  const commentSubmit = async (e) => {
    await axios.post(
      `${API_URL}/recipes/${id}/comment`,
      {
        user_id: 5,
        comment,
      },
      {
        withCredentials: true,
      }
    );
    // recipe detail
    let result = await axios.get(`${API_URL}/recipes/${id}`);
    setRecipeData(result.data[0]);
    // comment
    let commentsResult = await axios.get(`${API_URL}/recipes/${id}/comment`);
    setData(commentsResult.data);
    setComment('');
  };
  const demoHandler = () => {
    setComment('感謝作者的食譜分享~');
  };

  return (
    <>
      <div className="fs-2 ps-2 lh-sm mb-3" css={title}>
        食譜評論
      </div>
      <div css={commentContainer}>
        {data.map((d, i) => {
          return (
            <div
              className="d-flex align-items-center mb-3 rounded-1"
              css={recommend}
              key={d.id}
            >
              <figure css={avatorContainer} className="m-0">
                <img
                  src="/img/user/user_img/alen.png"
                  alt=""
                  className="objectContain"
                />
              </figure>
              <div className="d-flex flex-column w-100 px-3">
                <div
                  css={borderBottom}
                  className="d-flex justify-content-between"
                >
                  <span>{d.user_id}</span>
                  <span>{d.create_time.replace(/-/g, '.')}</span>
                </div>

                <span>{d.content}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="position-relative">
        <textarea
          name=""
          id=""
          rows="5"
          className="w-100 p-3 rounded-1 fs-6"
          css={commentArea}
          placeholder="寫下您的評論 ..."
          value={comment}
          onChange={commentHandler}
        ></textarea>
      </div>
      <div className="d-flex justify-content-end gap-3">
        <button
          className="text-nowrap d-flex border-0 bg-danger text-white py-1 px-3 rounded-1"
          css={commentSubmitBtn}
          onClick={demoHandler}
        >
          留言
        </button>
        <button
          className="text-nowrap d-flex border-0 text-white py-1 px-3 rounded-1"
          css={commentSubmitBtn}
          onClick={commentSubmit}
        >
          送出
        </button>
      </div>
    </>
  );
};

export default RecipeComments;
