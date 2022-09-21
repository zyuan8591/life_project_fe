/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
function WarnWindow({ warn, setWarn }) {
  function exit(e) {
    e.preventDefault();
    setWarn(false);
  }
  return warn ? (
    <div className="warnWindow" css={warnWindow}>
      <div className="inner">
        <div className="text ">
          <p>請再次確認您的資料</p>
          <p>是否儲存變更</p>
        </div>
        <div className="btngroup ">
          <button className="store storeBtn" type="submit">
            儲存
          </button>
          <button onClick={exit} className="exit exitBtn">
            取消
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
}

export default WarnWindow;

const warnWindow = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.363);
  z-index: 99;
  .inner {
    background: #fff;
    width: 300px;
    border: 2px solid rgba(129, 113, 97, 0.9);
    border-radius: 5px;
    overflow: hidden;
  }
  .text {
    padding-top: 10px;
    text-align: center;
    font-weight: bold;
    line-height: 1.5rem;
    border-bottom: 1px solid #ccc;
  }
  .btngroup {
    display: flex;
    justify-content: space-around;
    margin: 5px;
  }
  button {
    padding: 0px 10px;
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
