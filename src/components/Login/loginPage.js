import React from 'react';
import Login from './login/login';
import '../../styles/Users/login.scss';
import { Routes, Route, Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="loginContaner">
        <div className="logo">
          <Link to="/">
            <h1>LIFE</h1>
          </Link>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
