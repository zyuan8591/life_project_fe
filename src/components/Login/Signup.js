import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import '../../styles/Users/signup.scss';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import ShowPassword from '../Users/user_Component/ShowPassword';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object({
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
      })}
      onSubmit={async (values) => {
        try {
          await axios.post(`${API_URL}/signup`, values);
        } catch (e) {
          console.error('register', e);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="signup">
            <Field
              name="name"
              render={({ field, meta }) => (
                <>
                  <div className="signup-input signup-group signup-name">
                    <i className="fa-regular fa-user"></i>
                    <input
                      type="text"
                      placeholder="請輸入姓名"
                      maxLength="10"
                      {...field}
                      className={`input ${meta.error ? 'is-error' : ''}`}
                    />
                    <ErrorMessage name="name">
                      {(err) => (
                        <>
                          <i class="fa-regular fa-circle-xmark"></i>
                          <p className="error-text">{err}</p>
                        </>
                      )}
                    </ErrorMessage>
                  </div>
                </>
              )}
            />

            <Field
              name="email"
              render={({ field, meta }) => (
                <>
                  <div className="signup-input signup-group signup-email">
                    <i className="fa-regular fa-envelope"></i>
                    <input
                      type="email"
                      placeholder="請輸入電子郵件信箱"
                      maxLength="30"
                      {...field}
                      className={`input ${meta.error ? 'is-error' : ''}`}
                    />
                    <ErrorMessage name="email">
                      {(err) => (
                        <>
                          <i className="fa-regular fa-circle-xmark"></i>
                          <p className="error-text">{err}</p>
                        </>
                      )}
                    </ErrorMessage>
                  </div>
                </>
              )}
            />

            <Field
              name="password"
              render={({ field, meta }) => (
                <>
                  <div className="signup-input signup-group signup-psaaword">
                    <i className="fa-solid fa-unlock-keyhole"></i>
                    <input
                      type={eye ? 'text' : 'password'}
                      placeholder="8-16個半形英文及數字，請注意大小寫"
                      maxLength="16"
                      {...field}
                      className={`input ${meta.error ? 'is-error' : ''}`}
                    />
                    <ErrorMessage name="password">
                      {(err) => (
                        <>
                          <i className="fa-regular fa-circle-xmark"></i>
                          <p className="error-text">{err}</p>
                        </>
                      )}
                    </ErrorMessage>
                    <ShowPassword eye={eye} setEye={setEye} />
                  </div>
                </>
              )}
            />

            <Field
              name="confirmPassword"
              render={({ field, meta }) => (
                <>
                  <div
                    className={`signup-input signup-group signup-psaaword  ${
                      meta.error ? 'is-error' : ''
                    }`}
                  >
                    <i className="fa-solid fa-lock"></i>
                    <input
                      type={eye1 ? 'text' : 'password'}
                      placeholder="再次確認密碼"
                      maxLength="16"
                      {...field}
                      className="input"
                    />
                    <ErrorMessage name="confirmPassword">
                      {(err) => (
                        <>
                          <i class="fa-regular fa-circle-xmark"></i>
                          <p className="error-text">{err}</p>
                        </>
                      )}
                    </ErrorMessage>
                    <ShowPassword eye={eye1} setEye={setEye1} />
                  </div>
                </>
              )}
            />

            <div className="siginupBtn">
              <button type="submit">註冊</button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Signup;
// Xmark
// <i class="fa-solid fa-circle-xmark"></i>
