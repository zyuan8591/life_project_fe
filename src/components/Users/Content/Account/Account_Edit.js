import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InputGender from './component/InputGender';
import InputAddress from './component/inputAddress';
import WarnWindow from './component/WarnWindow';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';

const Account = () => {
  const { user, setUser } = useUserRights();
  const [newUser, serNewUser] = useState(user);

  //彈跳視窗
  const [warn, setWarn] = useState(false);
  function pop(e) {
    e.preventDefault();
    setWarn(true);
  }
  return (
    <>
      <form action="">
        <div className="account">
          <div className="avata-group">
            <figure className="avata ">
              <img src="/img/user/user_img/fish.png" alt="" />
            </figure>
            <p className="">{user.name}</p>
          </div>
          <div className="information">
            <div className="userData ">
              <label htmlFor="gender">性別：</label>
              <input type="radio" name="gender" id="gender" />
              <label htmlFor="">男</label>
              <input type="radio" name="gender" id="gender" />
              <label htmlFor="">女</label>
            </div>
            <div className="userData ">
              <label>生日：</label>
              <input type="date" />
            </div>
            <div className="userData ">
              <label>信箱：</label>
              <input type="email" />
            </div>
            <div className="userData ">
              <label>電話：</label>
              <input type="text" />
            </div>
            <InputAddress />
            <div className="userData row">
              <label className="col">簡介:</label>
              <textarea
                className="info"
                name=""
                id=""
                cols="30"
                rows="10"
                value={user.intro}
              />
            </div>
          </div>
        </div>
        <div className="reviseBtn">
          <button onClick={pop}>確定</button>
        </div>
      </form>
      {/* <div className="account">
        <form action="" className="">
          <div className="account-group row ">
            <div className="col  left">
              <div className="mb-4">
                <label htmlFor="name"> 　　姓名：</label>
                <input value={user.name} type="text" name="name" id="name" />
              </div>
              <div className="mb-4">
                <label htmlFor="email">註冊信箱：</label>
                <input
                  value={user.email}
                  type="email"
                  name="email"
                  id="email"
                  readonly="readonly"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone">手機號碼：</label>
                <input value={user.phone} type="text" name="phone" id="phone" />
              </div>
              <div className="mb-4">
                <label htmlFor="birth">　　生日：</label>
                <input value={user.birth} type="text" name="birth" id="birth" />
              </div>
              <InputGender />
              <InputAddress />
            </div>
            <div className="col avata-group">
              <div className="avata">
                <img src="" alt="" />
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
              <button onClick={pop}>確定</button>
            </div>
            <WarnWindow warn={warn} setWarn={setWarn} />
          </div>
        </form>
      </div> */}
    </>
  );
};

export default Account;
