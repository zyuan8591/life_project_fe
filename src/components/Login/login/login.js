import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const login = () => {
  return (
    <div className="login">
      <div className="lgcontainer">
        <form action="">
          <div className="mt-5">
            <label className="" htmlFor="">
              註冊信箱：
            </label>
            <input className="mt-3 inputStyle" type="text" />
          </div>
          <div className="mt-5">
            <label htmlFor="">密碼：</label>
            <input className="mt-3 inputStyle" type="password" />
          </div>
          <div className="d-flex mt-2">
            <input type="radio" />
            <label className="ms-2 fs-6">記住帳號密碼</label>
          </div>
          <button className="mt-5">登入</button>

          {/* TODO:
           1.從cookie取得使用者帳密 */}
        </form>
        <div className="row mt-2">
          <div className="col ">
            <Link to="/signup">註冊</Link>
          </div>

          <div className="col text-end">
            <Link to="">忘記密碼?</Link>
          </div>
          <div className="google mt-5 border">我是GOOGLE</div>
        </div>
      </div>
    </div>
  );
};

export default login;
