import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import '../../../../styles/Users/ForgotPassword/ForgotPassword.scss';
import emailjs from '@emailjs/browser';

const PopForgotPassword = () => {
  const [user, setUser] = useState(null);
  const [loginUser, setLoginUser] = useState({
    email: '',
  });
  const [err, setErr] = useState(null);

  function handleChange(e) {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let response = await axios.post(`${API_URL}/forgetpassword`, loginUser, {
        withCredentials: true,
      });

      setUser(response.data);
    } catch (e) {
      setErr(e.response.data.message);
    }
  }

  const sendEmail = () => {
    var templateParams = {
      user_email: user.email,
      user_name: user.name,
    };
    emailjs
      .send(
        'service_4dxhhdy',
        'template_hkszg09',
        templateParams,
        '9DyK9oc27L4mFT8eX'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  if (user !== null) {
    sendEmail();
  }
  return (
    <div className="forgot">
      <div className="inner">
        <h1>LIFE</h1>
        <h3>忘記密碼</h3>
        <p>請輸入您登錄的電子郵件信箱。</p>
        <p>將寄送設定密碼的郵件。</p>
        <div className="group">
          <form className="">
            <input
              type="email"
              name="email"
              value={loginUser.email}
              onChange={handleChange}
              className="form-control"
              placeholder="電子郵件信箱"
            />
            <button onClick={handleSubmit}>送出</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopForgotPassword;
