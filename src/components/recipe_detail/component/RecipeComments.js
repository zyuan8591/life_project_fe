/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { useSearchParams } from 'react-router-dom';
import { API_URL_IMG } from '../../../utils/config';
import { useUserRights } from '../../../usecontext/UserRights';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import moment from 'moment';

const subClrBrown = '#817161';
const title = css`
  border-left: 5px solid ${subClrBrown};
`;
const commentContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-column-gap: 1rem;
  position: relative;
  z-index: 10;
  textarea {
    resize: none;
    &:focus {
      outline: none;
    }
  }
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

const commentEdit = css`
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 0.5rem;
  background: #fff;
  position: absolute;
  top: 100%;
  transform: translateX(-50%);
  button {
    border: none;
    background: #fff;
    padding: 0.25rem;
    border-radius: 8px;
    &:hover {
      background: #eee;
    }
  }
  @media (max-width: 500px) {
    display: none !important;
  }
`;
const editCommentRwd = css`
  z-index: 20;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  height: fit-content;
  padding: 1rem;
  border-radius: 18px 18px 0 0;
  button {
    background: none;
    border: none;
    color: #fff;
    padding: 1rem;
  }
  &.translateY {
    transform: translateY(100%);
  }
  @media (min-width: 500px) {
    display: none !important;
  }
`;

const RecipeComments = ({
  data,
  setData,
  setRecipeData,
  setLoginBtn,
  setToast,
}) => {
  const [comment, setComment] = useState('');
  const [commentValidMsg, setCommentValidMsg] = useState('');
  // for editing comment
  const [editing, setEditing] = useState(0);
  const [editMsg, setEditMsg] = useState('感謝作者的食譜分享~');
  const [showEditBar, setShowEditBar] = useState(0);
  const editingHadnler = (e) => {
    setEditMsg(e.target.value);
  };

  const leaveEditing = (e) => {
    if (e.key === 'Escape') setEditing(0);
  };
  useEffect(() => {
    window.addEventListener('keydown', leaveEditing);
    return function clear() {
      window.removeEventListener('keydown', leaveEditing);
    };
  }, []);

  const [searchParams] = useSearchParams();
  const { user } = useUserRights();
  const user_id = user ? user.id : '';
  const id = searchParams.get('id');

  const initData = async () => {
    // recipe detail
    let result = await axios.get(`${API_URL}/recipes/${id}`);
    setRecipeData(result.data[0]);
    // comment
    let commentsResult = await axios.get(`${API_URL}/recipes/${id}/comment`);
    setData(commentsResult.data);
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  // update comment
  const editSubmit = async (id) => {
    await axios.put(
      `${API_URL}/recipes/comment/${id}`,
      { comment: editMsg },
      { withCredentials: true }
    );
    await initData();
    setEditing(0);
    setEditMsg('');
    setToast(4);
    setTimeout(() => {
      setToast(0);
    }, 2000);
  };
  // delcomment
  const delCommetHandler = async (id) => {
    await axios.delete(`${API_URL}/recipes/comment/${id}`, {
      withCredentials: true,
    });
    await initData();
    setToast(3);
    setTimeout(() => {
      setToast(0);
    }, 2000);
  };

  const commentSubmit = async (e) => {
    if (!user) return setLoginBtn(true);
    if (comment.trim().length === 0)
      return setCommentValidMsg('請寫下評論後再送出');
    await axios.post(
      `${API_URL}/recipes/${id}/comment`,
      { comment },
      { withCredentials: true }
    );
    setCommentValidMsg('');
    await initData();
    setComment('');
    setToast(5);
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
              <div
                className={`d-flex flex-column position-fixed start-0 bottom-0 transition ${
                  showEditBar === d.id ? '' : 'translateY'
                }`}
                css={editCommentRwd}
              >
                {editing === d.id ? (
                  <>
                    <button onClick={() => editSubmit(d.id)}>送出</button>
                    <button onClick={() => setEditing(0)}>取消</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditing(d.id);
                        setEditMsg(d.content);
                      }}
                    >
                      編輯留言
                    </button>
                    <button onClick={() => delCommetHandler(d.id)}>
                      刪除留言
                    </button>
                    <button onClick={() => setShowEditBar(0)}>取消</button>
                  </>
                )}
              </div>
              {/* user avatar */}
              <figure css={avatorContainer} className="m-0 p-1">
                <img
                  src={`${API_URL_IMG}${d.photo}`}
                  alt=""
                  className="objectContain"
                />
              </figure>
              {/* user name & comment time */}
              <div className="d-flex flex-column w-100 ps-2 pe-3">
                <div
                  css={userDetail}
                  className="d-flex justify-content-between"
                >
                  <span>{d.name}</span>
                  <span>
                    {moment(d.create_time, 'YYYY-MM-DD  HH:mm:ss').fromNow()}
                    {}
                  </span>
                </div>
                {/* user comment */}
                <div className="position-relative">
                  {editing === d.id ? (
                    <textarea
                      rows="1"
                      className="w-100 mt-1 rounded-pill px-2"
                      value={editMsg}
                      onChange={(e) => editingHadnler(e)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') editSubmit(d.id);
                      }}
                    />
                  ) : (
                    <span>{d.content}</span>
                  )}

                  {/* edit comment or delcomment */}
                  {user_id === d.user_id && editing !== d.id && (
                    <div
                      className="position-absolute end-0 top-50 translate-middle-y cursorPointer"
                      onClick={() => {
                        if (!showEditBar) return setShowEditBar(d.id);
                        setShowEditBar(0);
                      }}
                    >
                      <AiOutlineEllipsis />
                      <div
                        className={`d-flex flex-column  ${
                          showEditBar === d.id ? '' : 'd-none'
                        }`}
                        css={commentEdit}
                      >
                        <button
                          className="text-nowrap"
                          onClick={() => {
                            setEditing(d.id);
                            setEditMsg(d.content);
                          }}
                        >
                          編輯留言
                        </button>
                        <button
                          className="text-nowrap"
                          onClick={() => delCommetHandler(d.id)}
                        >
                          刪除留言
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
      <div className="d-flex justify-content-between">
        <div className="text-danger fw-bold">{commentValidMsg}</div>
        <div className="d-flex gap-3">
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
      </div>
    </>
  );
};

export default RecipeComments;
