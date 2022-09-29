/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
function WarnWindow({
  warn,
  setWarn,
  text1 = null,
  text2 = null,
  clickFunction = () => {},
}) {
  function exit(e) {
    e.preventDefault();
    setWarn(false);
  }
  return warn ? (
    <div className="warnWindow" css={warnWindow}>
      <div className="inner">
        <div className={`text ${text2 === null ? 'active' : ''}`}>
          <p>{text1}</p>
          <p>{text2}</p>
        </div>
        <div className="btngroup ">
          <button
            className="store storeBtn"
            type="submit"
            onClick={clickFunction}
          >
            確定
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
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.363);
  z-index: 99;
  @media (max-width: 768px) {
    height: 110vh;
  }
  .inner {
    background: #fff;
    width: 250px;
    border: 2px solid rgba(129, 113, 97, 0.9);
    border-radius: 5px;
    overflow: hidden;
    padding: 0 30px;
  }
  .text {
    padding-top: 10px;
    text-align: center;
    font-weight: bold;
    line-height: 1.5rem;
    border-bottom: 1px solid #ccc;
  }
  .active{
    line-height: 3rem;
  }
  .btngroup {
    display: flex;
    justify-content: space-between;
    margin: 5px;
  }
  button {
    padding: 5px 10px !important;
    border: rgba(129, 113, 97, 0.9) 3px solid;
    border-radius: 5px;
    font-weight: 500;
  }
  .storeBtn {
    background: rgba(129, 113, 97, 0.9) !important;
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
    border: 1px solid rgba(129, 113, 97, 0.9) !important;
    background: #fff !important;
    color: #000 !important;
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(1);
      box-shadow: inset 0 0 10px 1px rgba(150, 150, 150, 2);
    }
  }
`;
