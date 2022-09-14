import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowPassword from '../Users/user_Component/ShowPassword';
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
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form action="">
      <div className="login">
        <div className="login-input login-group login-email">
          <i className="fa-regular fa-envelope"></i>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={loginUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="login-input login-group login-psaaword">
          <i className="fa-solid fa-lock"></i>
          <input
            className="input"
            type={eye ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            value={loginUser.password}
            onChange={handleChange}
          />
          <ShowPassword eye={eye} setEye={setEye} />
        </div>
        <div className="remember">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">記住帳號密碼</label>
        </div>
        <div className="loginBtn login-group">
          <button onClick={handleSubmit}>登入</button>
        </div>

        <div className="forget">
          <Link to="">忘記密碼 ? </Link>
        </div>
        {/* <div className="google">
        <p>G</p>
      </div> */}
      </div>
    </form>
  );
};

export default Login;
