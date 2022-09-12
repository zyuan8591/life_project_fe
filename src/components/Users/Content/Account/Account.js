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

  //彈跳視窗
  const [warn, setWarn] = useState(false);
  function pop(e) {
    e.preventDefault();
    setWarn(true);
  }
  return (
    <>
      <h3>個人檔案</h3>
      <div className="account" css={account}>
        <p className="edit">編輯</p>
        <div className="avata-group">
          <figure className="avata ">
            <img src="/img/user/user_img/fish.png" alt="" />
          </figure>
          <p className="">貓喵</p>
        </div>
        <div className="information">
          <div className="userData ">
            <p>性別：</p>
            <p>男</p>
          </div>
          <div className="userData ">
            <p>生日：</p>
            <p>1994-05-28</p>
          </div>
          <div className="userData ">
            <p>信箱：</p>
            <p>cat@test.com</p>
          </div>
          <div className="userData ">
            <p>電話：</p>
            <p>0911112344</p>
          </div>
          <div className="userData ">
            <p>地址：</p>
            <p>桃園市中壢區</p>
          </div>
          <div className="userData row">
            <p className="col">簡介:</p>
            <textarea className="info" name="" id="" cols="30" rows="10" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;

const account = css`
  width: 70%;
  height: 50%;
  border: 1px solid #000;
  margin: 60px auto;
  position: relative;
  display: flex;
  border-radius: 10px;
  font-size: 16px;
  justify-content: center;
  padding-top: 50px;

  .information {
    .userData {
      display: flex;
    }
    .info {
      padding: 0;
      width: 180px;
      height: 50px;
      resize: none;
      border: 0;

      &:focus {
        outline: none;
      }
    }
  }
  .edit {
    position: absolute;
    right: 15px;
    top: 5px;
    color: #221e73;
  }
  .avata-group {
    text-align: center;
    ${'' /* background: red; */}
    margin:10px 60px 0 -10px;
    ${'' /* padding-top: 35px; */}
  }
  .avata {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    border: 2px solid #817161;
    padding: 0.1rem;
    background: #fff;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      vertical-align: middle;
      border-style: none;
    }
  }
`;
