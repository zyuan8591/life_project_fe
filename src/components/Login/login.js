import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Login = () => {
  const [eye, setEye] = useState(false);
  function clickEye() {
    setEye(eye ? false : true);
  }
  //TODO:製作記住帳號密碼

  return (
    <>
      <form action="">
        <div className="">
          <label className="email" htmlFor="email">
            註冊信箱：
          </label>
          <input
            className="inputStyle mt-2"
            type="email"
            id="email"
            name="email"
            placeholder="電子郵件信箱"
          />
        </div>
        <div className="mt-5 password-group ">
          <label htmlFor="password">密碼：</label>
          <input
            className="inputStyle mt-2"
            type={eye ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="密碼"
          />
          <div className="eye " onClick={clickEye}>
            <IconContext.Provider value={{ className: 'eye' }}>
              {eye ? <FaRegEye /> : <FaRegEyeSlash />}
            </IconContext.Provider>
          </div>
        </div>
        <div className="">
          <input type="radio" id="remember" />
          <label htmlFor="remember" className="fs-5 ">
            記住帳號密碼
          </label>
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
