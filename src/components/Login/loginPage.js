import React from 'react';
import Login from './login/login';
import '../../styles/Users/login.scss';

const loginPage = () => {
  return (
    <div className="loginPage">
      <div className="loginContaner">
        <div className="logo">
          <h1>LIFE</h1>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default loginPage;
