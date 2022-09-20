import React, { useState } from 'react';
import ShowPassword from '../../user_Component/ShowPassword';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';

import PopWindow from './PopWindow';
import '../../../../styles/Users/ForgotPassword/ForgotPassword.scss';

const ForgotPassword = () => {
  //彈跳視窗
  const [popWindow, setPopWindow] = useState(false);

  //顯示密碼
  const [eye, setEye] = useState({
    eye1: false,
    eye2: false,
    eye3: false,
  });

  return (
    <Formik
      initialValues={{
        password: '',
        newPassword: '',
      }}
      validationSchema={yup.object({
        newPassword: yup
          .string()
          .required('必填。')
          .max(16, '請輸入8-16個半形英文和數字')
          .min(8, '請輸入8-16個半形英文和數字'),
        confirmPassword: yup
          .string()
          .required('必填項目未輸入。')
          .max(16, '請輸入8-16個半形英文和數字')
          .min(8, '請輸入8-16個半形英文和數字')
          .when('newPassword', (newPassword, schema) => {
            return newPassword
              ? schema.oneOf([newPassword], '密碼不一致')
              : schema;
          }),
      })}
      onSubmit={async (values) => {
        try {
          await axios.put(`${API_URL}/user/forgotpassword`, values, {
            withCredentials: true,
          });
          setPopWindow(true);
        } catch (e) {
          console.error(e.response.data.message);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <>
          <div className="forgot">
            <div className="inner">
              <h1>LIFE</h1>
              <h3>請再次設定密碼</h3>

              <Form>
                <Field name="newPassword">
                  {({ field, meta }) => (
                    <div className="password-group">
                      <label htmlFor="newPassword">　　　新密碼：</label>

                      <input
                        type={eye.eye2 ? 'text' : 'password'}
                        id="newPassword"
                        placeholder="8-16個半形英文及數字"
                        maxLength="16"
                        {...field}
                      />
                      <ShowPassword eye={eye} setEye={setEye} name="eye2" />
                      <ErrorMessage name="newPassword">
                        {(err) => (
                          <>
                            <i className="fa-regular fa-circle-xmark"></i>
                            <p className="error-text">{err}</p>
                          </>
                        )}
                      </ErrorMessage>
                    </div>
                  )}
                </Field>
                <Field name="confirmPassword">
                  {({ field, meta }) => (
                    <div className="password-group">
                      <label htmlFor="confirmPassword">再次確認密碼：</label>
                      <input
                        type={eye.eye3 ? 'text' : 'password'}
                        id="confirmPassword"
                        placeholder="再次確認密碼"
                        maxLength="16"
                        {...field}
                      />
                      <ShowPassword eye={eye} setEye={setEye} name="eye3" />
                      <ErrorMessage name="confirmPassword">
                        {(err) => (
                          <>
                            <i className="fa-regular fa-circle-xmark"></i>
                            <p className="error-text">{err}</p>
                          </>
                        )}
                      </ErrorMessage>
                    </div>
                  )}
                </Field>
                <div className="forgotbtn">
                  <button className="exitBtn">取消</button>
                  <button type="sunmit">確認</button>
                </div>
              </Form>
            </div>
            <PopWindow
              popWindow={popWindow}
              setPopWindow={setPopWindow}
              linkTo="/signin/login"
            />
          </div>
        </>
      )}
    </Formik>
  );
};

export default ForgotPassword;
