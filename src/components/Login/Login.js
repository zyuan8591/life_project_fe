import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowPassword from '../Users/user_Component/ShowPassword';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useUserRights } from '../../usecontext/UserRights';

const Login = () => {
  const { user, setUser } = useUserRights();
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState(null);

  //顯示密碼
  const [eye, setEye] = useState({
    eye1: false,
  });

  function handleChange(e) {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let response = await axios.post(`${API_URL}/login`, loginUser, {
        withCredentials: true,
      });

      setUser(response.data);
    } catch (e) {
      setErr(e.response.data.message);
    }
  }

  //TODO:一鍵填寫
  function easy() {
    setLoginUser({
      email: 'Ace@test.com',
      password: 'a12345678',
    });
  }
  function easyEmail() {
    setLoginUser({
      email: 'cat814051@gmail.com',
      password: 'a12345678',
    });
  }

  //TODO:製作記住帳號密碼
  if (user) {
    return navigate('/');
    // return <Navigate to="/" />;
  }

  return (
    <>
      <div className="test">
        <button className="btn btn-outline-danger" onClick={easy}>
          一鍵填寫
        </button>
        <button className="btn btn-outline-warning mt-2" onClick={easyEmail}>
          寄信測試帳號
        </button>
      </div>
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
            {err && (
              <div className="errtext">
                <i className="fa-regular fa-circle-xmark"></i>
                <p>{err}</p>
              </div>
            )}
          </div>
          <div className="login-input login-group login-psaaword">
            <i className="fa-solid fa-lock"></i>
            <input
              className="input"
              type={eye.eye1 ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              value={loginUser.password}
              onChange={handleChange}
            />
            <ShowPassword eye={eye} setEye={setEye} name="eye1" />
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
        </div>
      </form>
    </>
  );
};

export default Login;
