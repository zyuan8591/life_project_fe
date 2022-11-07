import React, { useState, useEffect } from 'react';
import '../../styles/Users/signin.scss';
import { Outlet, Link, NavLink, useSearchParams } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import Notification from '../activity/Notification';
import { SiFoodpanda } from 'react-icons/si';

const Signin = () => {
  const [display, setDisplay] = useState(1); //判斷是登入還是註冊
  const [searchParams, setSearchParams] = useSearchParams(); //抓取網址參數
  const [signupOK, setSignupOK] = useState(false); //左下角註冊成功提示訊息
  useEffect(() => {
    setDisplay(parseInt(searchParams.get('p')));
  }, [searchParams]);
  const showSignupOK = () => {
    setSignupOK(true);
    setTimeout(() => {
      setSignupOK(false);
    }, 2000);
  };

  // async function postPoints() {
  //   await axios.post(
  //     `${API_URL}/user/points`,
  //     {
  //       point: -50, //新增/扣除點數
  //       event: '購物折扣', //名目
  //     },
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }
  return (
    <div className="signinPage">
      {signupOK && (
        <Notification contaninText="註冊成功" iconSize={2} bottom={30}>
          <SiFoodpanda />
        </Notification>
      )}
      {/* <button onClick={postPoints}>測試點數</button> */}
      <div className="frame">
        <div className="title">
          <Link to="/">
            <h1 className="logo">LIFE</h1>
          </Link>
          <div className="logn-in">
            <Link
              className={`long-in_link ${display === 1 ? 'active' : ''}`}
              to="/signin?p=1"
            >
              LOGIN
            </Link>
            <p>|</p>
            <Link
              className={`long-in_link ${display === 2 ? 'active' : ''}`}
              to="/signin?p=2"
            >
              SIGNUP
            </Link>
          </div>
        </div>
        {display === 1 ? <Login /> : <Signup showSignupOK={showSignupOK} />}
      </div>
    </div>
  );
};

export default Signin;
