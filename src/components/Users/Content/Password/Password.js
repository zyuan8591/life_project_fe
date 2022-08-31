import React from 'react';
import ShowPassword from './ShowPassword/ShowPassword';

const Password = () => {
  return (
    <div className="password">
      <h3>修改密碼</h3>
      <form action="">
        <div className="password-group">
          <label htmlFor="">　　　舊密碼：</label>
          <ShowPassword />
        </div>
        <div className="password-group">
          <label htmlFor="">　　　新密碼：</label>
          <ShowPassword />
        </div>
        <div className="password-group">
          <label htmlFor="">再次確認密碼：</label>
          <ShowPassword />
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
