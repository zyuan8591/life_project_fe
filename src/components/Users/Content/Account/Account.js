import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InputGender from './component/InputGender';
import InputAddress from './component/inputAddress';
import WarnWindow from './component/WarnWindow';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';

const Account = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let getUser = async () => {
      let response = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      setUser(response.data);
    };
    getUser();
  }, []);
  //彈跳視窗
  const [warn, setWarn] = useState(false);
  function pop(e) {
    e.preventDefault();
    setWarn(true);
  }
  return (
    <>
      {user ? (
        <>
          <h3>個人檔案</h3>
          <div className="account" css={account}>
            <form action="" className="">
              <div className="account-group row ">
                <div className="col  left">
                  <div>
                    <label htmlFor="name"> 　　姓名：</label>
                    <input
                      value={user.name}
                      type="text"
                      name="name"
                      id="name"
                      css={input}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">註冊信箱：</label>
                    <input
                      value={user.email}
                      type="email"
                      name="email"
                      id="email"
                      readonly="readonly"
                      css={input}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">手機號碼：</label>
                    <input
                      value={user.phone}
                      type="text"
                      name="phone"
                      id="phone"
                      css={input}
                    />
                  </div>
                  <div>
                    <label htmlFor="birth">　　生日：</label>
                    <input
                      value={user.birth}
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
                    <label htmlFor="selfIntroduction">自我介紹：</label>
                    <textarea
                      name="selfIntroduction"
                      id="selfIntroduction"
                      value={user.intro}
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
      ) : (
        <h3>請先登入{/* TODO:後面做自動跳轉 */}</h3>
      )}
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
        transform: scale(1.05);
      }
      &:active {
        transform: scale(1);
        box-shadow: inset 0 0 10px 1px rgba(90, 90, 90, 2);
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
