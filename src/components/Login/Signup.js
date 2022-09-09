import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import '../../styles/Users/signup.scss';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';
import { API_URL } from '../../utils/config';

const Signup = () => {
  return (
    <div className="signup">
      <div className="signup-input signup-group signup-name">
        <i class="fa-regular fa-user"></i>
        <input className="input" type="email" name="" id="" />
      </div>
      <div className="signup-input signup-group signup-email">
        <i class="fa-regular fa-envelope"></i>
        <input className="input" type="email" name="" id="" />
      </div>
      <div className="signup-input signup-group signup-psaaword">
        <i class="fa-solid fa-unlock-keyhole"></i>
        <input className="input" type="password" />
      </div>
      <div className="signup-input signup-group signup-psaaword">
        <i class="fa-solid fa-lock"></i>
        <input className="input" type="password" />
      </div>
      <div className="siginupBtn">
        <button>註冊</button>
      </div>
    </div>
  );
};
export default Signup;
// Xmark
// <i class="fa-solid fa-circle-xmark"></i>
