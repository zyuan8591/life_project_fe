import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import InputGender from './component/InputGender';
import InputAddress from './component/inputAddress';
import WarnWindow from './component/WarnWindow';

const Account = () => {
  const [warn, setWarn] = useState(false);
  function pop(e) {
    e.preventDefault();
    setWarn(true);
  }
  return (
    <>
      <h3>個人檔案</h3>
      <div className="account" css={account}>
        <form action="" className="">
          <div className="account-group row ">
            <div className="col  left">
              <div>
                <label for="name"> 　　姓名：</label>
                <input
                  value="梓園園"
                  type="text"
                  name="name"
                  id="name"
                  css={input}
                />
              </div>
              <div>
                <label for="email">註冊信箱：</label>
                <input
                  value="test@gmial.com"
                  type="email"
                  name="email"
                  id="email"
                  css={input}
                />
              </div>
              <div>
                <label for="phone">手機號碼：</label>
                <input
                  value="0912345646"
                  type="text"
                  name="phone"
                  id="phone"
                  css={input}
                />
              </div>
              <div>
                <label for="birth">　　生日：</label>
                <input
                  value="1995/08/31"
                  type="text"
                  name="birth"
                  id="birth"
                  css={input}
                />
              </div>
              <InputGender />
              <InputAddress />
            </div>
            <div className="col avata-group">
              <div className="avata">
                <img src="/img/index/joinUs.jpg" alt="" />
                <p>點擊更換圖片</p>
              </div>
              <div className="selfIntroduction-group">
                <label for="selfIntroduction">自我介紹：</label>
                <textarea
                  name="selfIntroduction"
                  id="selfIntroduction"
                  value="我叫紫園園，興趣是露營，希望有許多志同道合的朋友。"
                />
              </div>
            </div>
            <div className="reviseBtn">
              <button onClick={pop}>修改資料</button>
            </div>
            <WarnWindow warn={warn} setWarn={setWarn} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Account;

const account = css`
  line-height: 4rem;
  form {
    padding: 0 50px;
  }

  .account-group {
    padding: 0 0 0 5%;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  //right
  .avata {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    margin: 20px auto 30px auto;
    position: relative;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      p {
        color: #fff;
      }
    }
    p {
      position: absolute;
      z-index: 99;
      left: 28%;
      top: 35%;
      color: transparent;
      transition: 0.3s;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
  .selfIntroduction-group {
    padding-left: 30px;
  }
  textarea {
    border-radius: 10px;
    resize: none;
    width: 450px;
    height: 130px;
    padding: 5px;
  }
  .reviseBtn {
    text-align: center;
    padding: 0 10% 0 0;
    button {
      padding: 10px;
      background: #817161;
      color: #fff;
      border-radius: 10px;
      border: 0;
      &:hover {
        background: #b9bdc5;
      }
    }
  }
`;
const input = css`
  border-radius: 10px;
  height: 20px;
  padding: 15px 0px 15px 5px;
  width: 300px;
`;
