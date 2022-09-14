import React, { useState } from 'react';
import ShowPassword from '../../user_Component/ShowPassword';
import '../../../../styles/Users/password.scss';

const Password = () => {
  const [changePassword, setchangePassword] = useState({
    password: '123',
    newPassword: '123',
    confirmPassword: '123',
  });
  const [eye, setEye] = useState(false);
  function handleChange(e) {
    setchangePassword({ ...changePassword, [e.target.name]: e.target.value });
  }
  return (
    <div className="password">
      <h3>修改密碼</h3>
      <form action="">
        <div className="password-group ">
          <label htmlFor="passwword">　　　舊密碼：</label>
          <input
            value={changePassword.password}
            type={eye ? 'text' : 'password'}
            name="passwword"
            id="passwword"
            onChange={handleChange}
          />
          <ShowPassword eye={eye} setEye={setEye} />
        </div>
        <div className="password-group">
          <label htmlFor="newPasswword">　　　新密碼：</label>
          <input
            value={changePassword.newPassword}
            type={eye ? 'text' : 'password'}
            name="newPasswword"
            id="newPasswword"
            onChange={handleChange}
          />
          <ShowPassword eye={eye} setEye={setEye} />
        </div>
        <div className="password-group">
          <label htmlFor="confirmPassword">再次確認密碼：</label>
          <input
            value={changePassword.confirmPassword}
            type={eye ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
          />
          <ShowPassword eye={eye} setEye={setEye} />
        </div>
        <div>
          <label>　信箱驗證碼：</label>
          <input value="" type="text" name="" id="" />
          <a href="#/">重新發送驗證碼</a>
        </div>
        <button>確認</button>
      </form>
    </div>
  );
};

export default Password;
