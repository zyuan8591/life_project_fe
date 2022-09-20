import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Navigate } from 'react-router-dom';
function PopWindow({ popWindow, setPopWindow, linkTo = '/signin/login' }) {
  const [isGo, setIsGo] = useState(false);
  function exit(e) {
    e.preventDefault();
    setPopWindow(false);
    setIsGo(true);
  }
  if (isGo) {
    return <Navigate to={linkTo} />;
  }
  return popWindow ? (
    <div className="popwindow" css={popwindow}>
      <div className="inner">
        <div className="text ">
          <p>密碼變更成功</p>
        </div>
        <div className="btngroup">
          <button onClick={exit} className="">
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
  display: flex;
  align-items: center;
  justify-content: center;
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
    border-radius: 5px;
    overflow: hidden;
    padding: 0 20px;
  }
  .text {
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    p {
      margin: 10px 0;
    }
  }
  .btngroup {
    display: flex;
    justify-content: space-around;
    border: 0;
    margin: 5px 0;
  }
  button {
    padding: 0px 5px;
    border: 1px solid rgba(130, 113, 97, 0.9);
    border-radius: 5px;
    font-weight: 500;
    color: #fff;
    background: rgba(129, 113, 97, 0.9);
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(1);
      box-shadow: inset 0 0 10px 1px rgba(150, 150, 150, 2);
    }
  }
`;
