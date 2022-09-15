import React, { useState } from 'react';
import ShowPassword from '../../user_Component/ShowPassword';
import '../../../../styles/Users/password.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';

const Password = () => {
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
        confirmPassword: '',
      }}
      validationSchema={yup.object({
        password: yup
          .string()
          .required('必填項目未輸入。')
          .max(16, '請輸入8-16個半形英文和數字')
          .min(8, '請輸入8-16個半形英文和數字'),
        newPassword: yup
          .string()
          .required('必填項目未輸入。')
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
          let response = await axios.put(
            `${API_URL}/userUpdata/password`,
            values,
            {
              withCredentials: true,
            }
          );
        } catch (e) {
          console.error('register', e);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <>
          <h3>修改密碼</h3>
          <div className="password ">
            <Form>
              <Field name="password">
                {({ field, meta }) => (
                  <div className="password-group ">
                    <label htmlFor="passwword">　　　舊密碼：</label>
                    <input
                      type={eye.eye1 ? 'text' : 'password'}
                      id="passwword"
                      placeholder="請輸入舊密碼"
                      maxLength="16"
                      {...field}
                    />
                    <ShowPassword eye={eye} setEye={setEye} name="eye1" />
                    <ErrorMessage name="password">
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
              <div>
                <label>　信箱驗證碼：</label>
                <input value="" type="text" name="" id="" />
                <a href="#/">重新發送驗證碼</a>
              </div>
              <button>確認</button>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
};

export default Password;
