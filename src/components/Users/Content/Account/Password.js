import React from 'react';

const Password = () => {
  return (
    <div className="password">
      <h3>修改密碼</h3>
      <form action="">
        <div>
          <label>　　舊密碼：</label>
          <input value="" type="text" name="" id="" />
        </div>
        <div>
          <label>　　新密碼：</label>
          <input value="" type="text" name="" id="" />
        </div>
        <div>
          <label>　密碼確認：</label>
          <input value="" type="text" name="" id="" />
        </div>
        <div>
          <label>信箱驗證碼：</label>
          <input value="" type="text" name="" id="" />
          <a href="#/">重新發送驗證碼</a>
        </div>
        <button>確認</button>
      </form>
    </div>
  );
};

export default Password;
