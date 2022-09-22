/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { useSearchParams } from 'react-router-dom';
import { API_URL_IMG } from '../../../utils/config';
import { useUserRights } from '../../../usecontext/UserRights';

const subClrBrown = '#817161';
const title = css`
  border-left: 5px solid ${subClrBrown};
`;
const commentContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-column-gap: 1rem;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
const recommend = css`
  border: 2px solid ${subClrBrown};
`;
const avatorContainer = css`
  max-width: 70px;
  @media (max-width: 500px) {
    max-width: 50px;
  }
`;
const userDetail = css`
  border-bottom: 1px solid ${subClrBrown};
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    & :last-child {
      font-size: 12px;
    }
  }
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

const RecipeComments = ({
  data,
  setData,
  setRecipeData,
  setLoginBtn,
  setToast,
}) => {
  const [comment, setComment] = useState('');
  const [searchParams] = useSearchParams();
  const { user } = useUserRights();

  const id = searchParams.get('id');

  const commentHandler = (e) => {
    setComment(e.target.value);
  };
  const commentSubmit = async (e) => {
    if (!user) return setLoginBtn(true);
    await axios.post(
      `${API_URL}/recipes/${id}/comment`,
      { comment },
      { withCredentials: true }
    );
    // recipe detail
    let result = await axios.get(`${API_URL}/recipes/${id}`);
    setRecipeData(result.data[0]);
    // comment
    let commentsResult = await axios.get(`${API_URL}/recipes/${id}/comment`);
    setData(commentsResult.data);
    setComment('');
    setToast(3);
    setTimeout(() => {
      setToast(0);
    }, 2000);
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
              <figure css={avatorContainer} className="m-0 p-1">
                <img
                  src={`${API_URL_IMG}${d.photo}`}
                  alt=""
                  className="objectContain"
                />
              </figure>
              <div className="d-flex flex-column w-100 ps-2 pe-3">
                <div
                  css={userDetail}
                  className="d-flex justify-content-between"
                >
                  <span>{d.name}</span>
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
