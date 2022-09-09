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
  const formik = useFormik({
    //表單value(state,useSuate)
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    //表單驗證規則
    validationSchema: yup.object({
      name: yup
        .string()
        .max(10, '請輸入10個以內的文字')
        .required('必填項目未輸入。'),
      email: yup
        .string()
        .email('請輸入正確 Email 格式')
        .required('必填項目未輸入。'),
      password: yup
        .string()
        .required('必填項目未輸入。')
        .max(16, '請輸入8-16個半形英文和數字')
        .min(8, '請輸入8-16個半形英文和數字'),
      confirmPassword: yup
        .string()
        .required('必填項目未輸入。')
        .max(16, '請輸入8-16個半形英文和數字')
        .min(8, '請輸入8-16個半形英文和數字')
        .when('password', (password, schema) => {
          return password ? schema.oneOf([password], '密碼不一致') : schema;
        }),
    }),
    //提交表單後要做的事
    onSubmit: async (values) => {
      try {
        let response = await axios.post(`${API_URL}/signup`, values);
        console.log(response.data);
      } catch (e) {
        console.error('register', e);
      }
    },
  });

  //顯示密碼
  const [eye, setEye] = useState(false);
  function clickEye() {
    setEye(eye ? false : true);
  }
  // const [reading, setreading] = useState(false)  閱讀服務條款
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="signup">
        <div className="signup-input signup-group signup-name">
          <i className="fa-regular fa-user"></i>
          <input
            className={`input ${
              formik.touched.name && formik.errors.name ? 'is-error' : ''
            }`}
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="請輸入姓名"
            maxLength="10"
          />
        </div>
        <p className="error-text">
          {formik.touched.name && formik.errors.name
            ? formik.errors.name
            : null}
        </p>
        <div className="signup-input signup-group signup-email">
          <i className="fa-regular fa-envelope"></i>
          <input
            className={`input ${
              formik.touched.email && formik.errors.email ? 'is-error' : ''
            }`}
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="請輸入電子郵件信箱"
          />
        </div>
        <p className="error-text">
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null}
        </p>
        <div className="signup-input signup-group signup-psaaword">
          <i className="fa-solid fa-unlock-keyhole"></i>
          <input
            className={`input ${
              formik.touched.password && formik.errors.password
                ? 'is-error'
                : ''
            }`}
            type={eye ? 'text' : 'password'}
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="8-16個半形英文及數字，請注意大小寫"
            maxLength="16"
          />
        </div>
        <p className="error-text">
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null}
        </p>
        <div className="signup-input signup-group signup-psaaword">
          <i className="fa-solid fa-lock"></i>
          <input
            className={`input ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? 'is-error'
                : ''
            }`}
            type={eye ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder="8-16個半形英文及數字，請注意大小寫"
            maxLength="16"
          />
        </div>
        <p className="error-text">
          {formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : null}
        </p>
        <div className="siginupBtn">
          <button type="submit">註冊</button>
        </div>
      </div>
    </form>
  );
};
export default Signup;
// Xmark
// <i class="fa-solid fa-circle-xmark"></i>
