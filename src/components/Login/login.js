import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { Navigate } from 'react-router-dom';
import { useUserRights } from '../../usecontext/UserRights';

const login = () => {
  return (
    <div className="login">
      <div className="login-input login-group login-email">
        <i class="fa-regular fa-envelope"></i>
        <input className="input" type="email" name="" id="" />
      </div>
      <div className="login-input login-group login-psaaword">
        <i class="fa-solid fa-lock"></i>
        <input className="input" type="password" />
      </div>
      <div className="remember">
        <input type="checkbox" id="remember"/>
        <label htmlFor="remember">記住帳號密碼</label>
      </div>
      <div className="loginBtn login-group">
        <button>登入</button>
      </div>
      <div className="forget">
        <Link to="">忘記密碼 ? </Link>
      </div>
      {/* <div className="google">
        <p>G</p>
      </div> */}
    </div>
  );
};

export default login;
