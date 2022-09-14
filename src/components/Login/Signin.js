import React from 'react';
import '../../styles/Users/signin.scss';
import { Outlet, Link, NavLink } from 'react-router-dom';

const Signin = () => {
  return (
    <div className="signinPage">
      <div className="frame">
        <div className="title">
          <Link to="/">
            <h1 className="logo">LIFE</h1>
          </Link>
          <div className="logn-in">
            <NavLink
              className={`long-in_link (nav) => (nav.isActive ? 'active' : '')`}
              to="/signin/login"
            >
              LOGIN
            </NavLink>
            <p>|</p>
            <NavLink
              className={`long-in_link (nav) => (nav.isActive ? 'active' : '')`}
              to="/signin/signup"
            >
              SIGNUP
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Signin;
