import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InputGender from './component/InputGender';
import InputAddress from './component/inputAddress';
import WarnWindow from './component/WarnWindow';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';
import AccountEdit from './Account_Edit';
import '../../../../styles/Users/Account.scss';

const Account = () => {
  const { user, setUser } = useUserRights();
  const [edit, setEdit] = useState(false);
  // useEffect(() => {
  //   let getUser = async () => {
  //     let response = await axios.get(`${API_URL}/user`, {
  //       withCredentials: true,
  //     });
  //     setUser(response.data);
  //   };
  //   getUser();
  // }, []);
  function clickEdit() {
    setEdit(true);
  }
  //彈跳視窗
  const [warn, setWarn] = useState(false);
  function pop(e) {
    e.preventDefault();
    setWarn(true);
  }

  return (
    <>
      <h3>個人檔案</h3>
      {!edit ? (
        <div className="account">
          <div className="edit" onClick={clickEdit}>
            編輯
          </div>
          <div className="avata-group">
            <figure className="avata ">
              <img src="/img/user/user_img/fish.png" alt="" />
            </figure>
            <p className="">{user.name}</p>
          </div>
          <div className="information">
            <div className="userData ">
              <p>性別：</p>
              <p>{user.gender}</p>
            </div>
            <div className="userData ">
              <p>生日：</p>
              <p>{user.birth}</p>
            </div>
            <div className="userData ">
              <p>信箱：</p>
              <p>{user.email}</p>
            </div>
            <div className="userData ">
              <p>電話：</p>
              <p>{user.phone}</p>
            </div>
            <div className="userData ">
              <p>地址：</p>
              <p>{`${user.city}${user.area}`}</p>
            </div>
            <div className="userData row">
              <p className="col">簡介:</p>
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
      ) : (
        <AccountEdit />
      )}
    </>
  );
};

export default Account;
