import React, { useState, useEffect } from 'react';
import '../../styles/Users/signin.scss';
import { Outlet, Link, NavLink, useSearchParams } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Signin = () => {
  const [display, setDisplay] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setDisplay(parseInt(searchParams.get('p')));
  }, [searchParams]);
  return (
    <div className="signinPage">
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
