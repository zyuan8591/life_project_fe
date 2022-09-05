import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../../styles/Users/signup.scss';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';
import { API_URL } from '../../utils/config';

const Signup = () => {
  const [member, setMember] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    // 把預設行為關掉
    e.preventDefault();
    try {
      let response = await axios.post(`${API_URL}/signup`, member);
      console.log(response.data);
    } catch (e) {
      console.error('register', e);
    }
  }

  //顯示密碼
  const [eye, setEye] = useState(false);
  function clickEye() {
    setEye(eye ? false : true);
  }
  const [reading, setreading] = useState(false);
  return (
    <div className="signup ">
      <IconContext.Provider value={{ className: 'eye' }}>
        <h2 className="sign_titile">快速註冊</h2>
        <div className="mt-3">
          <label htmlFor="name">姓名：</label>
          <input
            className="mt-2 "
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="email">註冊信箱：</label>
          <input
            className="mt-2"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="mt-3 password-group">
          <label htmlFor="password">密碼：</label>
          <input
            className="mt-2"
            type={eye ? 'text' : 'password'}
            name="password"
            id="password"
            onChange={handleChange}
          />
          <div className="eye " onClick={clickEye}>
            {eye ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className="mt-3 password-group">
          <label htmlFor="confirmPassword">再次確認密碼：</label>
          <input
            className="mt-2"
            type={eye ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
          />
          <div className="eye " onClick={clickEye}>
            {eye ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="phone">手機號碼：</label>
          <input
            className="mt-2"
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
          />
        </div>

        <div className="ms-2">
          <input
            type="radio"
            checked={reading}
            onClick={() => {
              return reading ? setreading(false) : setreading(true);
            }}
          />
          <label className="fs-5 ms-1">閱讀服務條款</label>
        </div>
        <div className="mt-5 signBtn">
          <button
            className={reading ? 'active' : ''}
            disabled={!reading}
            onClick={handleSubmit}
          >
            註冊
          </button>
          <Link to="/login">
            <button className="exitbtn">取消 </button>
          </Link>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Signup;
