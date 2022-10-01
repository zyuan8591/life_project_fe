import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import '../../styles/Users/signup.scss';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import ShowPassword from '../Users/user_Component/ShowPassword';
import { Navigate } from 'react-router-dom';

const Signup = ({ showSignupOK = () => {} }) => {
  const [eye, setEye] = useState({
    eye1: false,
    eye2: false,
  });
  const [sign, setSign] = useState(false);
  const [error, setError] = useState(null);
  const [points, setPoints] = useState({
    event: '',
    point: 0,
  });

  if (sign) {
    return <Navigate to="/signin?p=1" />;
  }
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
          setSign(true);
          showSignupOK();
        } catch (e) {
          setError(e.response.data.message);
        }
      }}
    >
      {(props) => (
        <Form>
          <div className="signup">
            <Field name="name">
              {({ field, meta }) => (
                <>
                  <div className="signup-input signup-group signup-name">
                    <i
                      className="fa-regular fa-user"
                      onClick={() => {
                        props.setValues({
                          name: '圓陸鯊',
                          email: 'cat814051@gmail.com',
                          password: 'a12345678',
                          confirmPassword: 'a1234567',
                        });
                      }}
                    ></i>
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
                          <i className="fa-regular fa-circle-xmark"></i>
                          <p className="error-text">{err}</p>
                        </>
                      )}
                    </ErrorMessage>
                  </div>
                </>
              )}
            </Field>

            <Field name="email">
              {({ field, meta }) => (
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
                    {error && ( //後端驗證
                      <>
                        <i className="fa-regular fa-circle-xmark"></i>
                        <p className="error-text">{error}</p>
                      </>
                    )}
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
            </Field>

            <Field name="password">
              {({ field, meta }) => (
                <>
                  <div className="signup-input signup-group signup-psaaword">
                    <i className="fa-solid fa-unlock-keyhole"></i>
                    <input
                      type={eye.eye1 ? 'text' : 'password'}
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
                    <ShowPassword eye={eye} setEye={setEye} name="eye1" />
                  </div>
                </>
              )}
            </Field>

            <Field name="confirmPassword">
              {({ field, meta }) => (
                <>
                  <div
                    className={`signup-input signup-group signup-psaaword  ${
                      meta.error ? 'is-error' : ''
                    }`}
                  >
                    <i className="fa-solid fa-lock"></i>
                    <input
                      type={eye.eye2 ? 'text' : 'password'}
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
                    <ShowPassword eye={eye} setEye={setEye} name="eye2" />
                  </div>
                </>
              )}
            </Field>

            <div className="siginupBtn">
              <button type="submit">註冊</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
// Xmark
// <i class="fa-solid fa-circle-xmark"></i>
