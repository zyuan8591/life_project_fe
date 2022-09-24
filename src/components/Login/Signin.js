import React, { useState, useEffect } from 'react';
import '../../styles/Users/signin.scss';
import { Outlet, Link, NavLink, useSearchParams } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';
import { API_URL } from '../../utils/config';

const Signin = () => {
  const [display, setDisplay] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setDisplay(parseInt(searchParams.get('p')));
  }, [searchParams]);

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
        {display === 1 ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Signin;
