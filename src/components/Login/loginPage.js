import React from 'react';
import Login from './login';
import Signup from './Signup';
import '../../styles/Users/login.scss';
import { Routes, Route, Link } from 'react-router-dom';

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
          <Routes>
            <Route path="/" element=<Login /> />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
