import React from 'react';
import '../../styles/Users/login.scss';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="loginPage row">
      <div className="group col">
        <Link to="/">
          <h1 className="logo">LIFE</h1>
        </Link>
      </div>
      <div className="col group">
        <div className="frame">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
