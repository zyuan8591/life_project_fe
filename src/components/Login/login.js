import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Login = () => {
  const [eye, setEye] = useState(false);
  function clickEye() {
    setEye(eye ? false : true);
  }

  return (
    <>
      <form action="">
        <div className="">
          <label className="" htmlFor="">
            註冊信箱：
          </label>
          <input className="inputStyle mt-2" type="text" />
        </div>
        <div className="mt-5 password-group ">
          <label htmlFor="">密碼：</label>
          <input className="inputStyle mt-2" type={eye ? 'text' : 'password'} />
          <div className="eye " onClick={clickEye}>
            <IconContext.Provider value={{ className: 'eye' }}>
              {eye ? <FaRegEye /> : <FaRegEyeSlash />}
            </IconContext.Provider>
          </div>
        </div>
        <div className="">
          <input type="radio" id="remember"/>
          <label for="remember" className="fs-5 ">記住帳號密碼</label>
        </div>
        <button className="loginBtn mt-5">登入</button>

        {/* TODO:
   1.從cookie取得使用者帳密 */}
      </form>
      <div className="row mt-2 linkgroup">
        <div className="col ">
          <Link to="/login/signup">註冊</Link>
        </div>

        <div className="col text-end">
          <Link to="">忘記密碼?</Link>
        </div>
        <div className="google mt-5 border">我是GOOGLE</div>
      </div>
    </>
  );
};

export default Login;
