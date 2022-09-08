import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { Navigate } from 'react-router-dom';
import { useUserRights } from '../../usecontext/UserRights';
const Login = () => {
  const { user, setUser } = useUserRights();
  const [loginUser, setLoginUser] = useState({
    email: 'Ace@test.com',
    password: 'a12345678',
  });

  //顯示密碼
  const [eye, setEye] = useState(false);
  function clickEye() {
    setEye(eye ? false : true);
  }
  // const [isLogin, setIsLogin] = useState(false);

  function handleChange(e) {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await axios.post(`${API_URL}/login`, loginUser, {
      withCredentials: true,
    });
    setUser(response.data);
    // setIsLogin(true);
  }
  console.log(user);
  //TODO:製作記住帳號密碼
 if(user){
  return <Navigate to="/" />;
 }
  return (
    <>
      <form action="">
        <div className="">
          <label className="email" htmlFor="email">
            信箱：
          </label>
          <input
            className="inputStyle mt-2"
            type="email"
            id="email"
            name="email"
            placeholder="請輸入您的註冊信箱"
            value={loginUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5 password-group ">
          <label htmlFor="password">密碼：</label>
          <input
            className="inputStyle mt-2"
            type={eye ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="請輸入您的密碼"
            value={loginUser.password}
            onChange={handleChange}
          />
          <div className="eye " onClick={clickEye}>
            <IconContext.Provider value={{ className: 'eye' }}>
              {eye ? <FaRegEye /> : <FaRegEyeSlash />}
            </IconContext.Provider>
          </div>
        </div>
        {/* <div className="">
          <input type="radio" id="remember" />
          <label htmlFor="remember" className="fs-5 ">
            記住帳號密碼
          </label>
        </div> */}
        <button className="loginBtn mt-5" onClick={handleSubmit}>
          登入
        </button>
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
