import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Navigate } from 'react-router-dom';
function PopWindow({ popWindow, setPopWindow }) {
  const [isGo, setIsGo] = useState(false);
  function exit(e) {
    e.preventDefault();
    setPopWindow(false);
    setIsGo(true);
  }
  if (isGo) {
    return <Navigate to="/users/account" />;
  }
  return popWindow ? (
    <div className="popwindow" css={popwindow}>
      <div className="inner">
        <div className="text ">
          <p>密碼變更成功</p>
        </div>
        <div className="btn">
          <button onClick={exit} className="exit exitBtn">
            確定
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
}

export default PopWindow;

const popwindow = css`
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
  .inner {
    background: #fff;
    width: 200px;
    border: 2px solid rgba(129, 113, 97, 0.9);
    border-radius: 20px;
    position: absolute;
    left: 45%;
    top: 40%;
    overflow: hidden;
    padding: 0 10px;
  }
  .text {
    padding-top: 10px;
    text-align: center;
    font-weight: bold;
    line-height: 3rem;
    border-bottom: 1px solid #ccc;
  }
  .btn {
    margin-top: 0.6rem;
    display: flex;
    justify-content: space-around;
    border: 0;
  }
  button {
    padding: 0px 5px;
    border: rgba(129, 113, 97, 0.9) 3px solid;
    border-radius: 5px;
    font-weight: 500;
  }
  .storeBtn {
    background: rgba(129, 113, 97, 0.9);
    border: 0;
    color: #fff;
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(1);
      box-shadow: inset 0 0 10px 1px rgba(50, 50, 50, 2);
    }
  }
  .exitBtn {
    background: #fff;
    color: #000;
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(1);
      box-shadow: inset 0 0 10px 1px rgba(150, 150, 150, 2);
    }
  }
`;
