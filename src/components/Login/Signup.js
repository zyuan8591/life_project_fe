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
      phone: '',
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
      phone: yup.string().required('必填項目未輸入。'),
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
  const [reading, setreading] = useState(false);

  return (
    <div className="signup ">
      <form onSubmit={formik.handleSubmit}>
        <IconContext.Provider value={{ className: 'eye' }}>
          <h2 className="sign_titile">快速註冊</h2>
          <div className="mt-3">
            <label htmlFor="name">姓名：</label>
            <input
              className={
                formik.touched.name && formik.errors.name ? 'is-error' : ''
              }
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
          <div className="mt-3">
            <label htmlFor="email">註冊信箱：</label>
            <input
              className={
                formik.touched.email && formik.errors.email ? 'is-error' : ''
              }
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

          <div className="mt-3 password-group">
            <label htmlFor="password">密碼：</label>
            <input
              className={
                formik.touched.password && formik.errors.password
                  ? 'is-error'
                  : ''
              }
              type={eye ? 'text' : 'password'}
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="8-16個半形英文及數字，請注意大小寫"
              maxLength="16"
            />
            <div className="eye " onClick={clickEye}>
              {eye ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          <p className="error-text">
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null}
          </p>
          <div className="mt-3 password-group">
            <label htmlFor="confirmPassword">再次確認密碼：</label>
            <input
              className={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'is-error'
                  : ''
              }
              type={eye ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="8-16個半形英文及數字，請注意大小寫"
              maxLength="16"
            />
            <div className="eye " onClick={clickEye}>
              {eye ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          <p className="error-text">
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : null}
          </p>
          <div className="mt-3">
            <label htmlFor="phone">手機號碼：</label>
            <input
              className={
                formik.touched.phone && formik.errors.phone ? 'is-error' : ''
              }
              type="text"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder="請輸入手機號碼"
              maxLength="10"
            />
          </div>
          <p className="error-text">
            {formik.touched.phone && formik.errors.phone
              ? formik.errors.phone
              : null}
          </p>
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
              type="submit"
            >
              註冊
            </button>
            <Link to="/login">
              <button className="exitbtn">取消 </button>
            </Link>
          </div>
        </IconContext.Provider>
      </form>
    </div>
  );
};

export default Signup;
