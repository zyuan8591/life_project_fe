import React, { useState, useEffect } from 'react';
import ShowPassword from '../../user_Component/ShowPassword';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import emailjs from '@emailjs/browser';
import { useUserRights } from '../../../../usecontext/UserRights';
import Countdown from './Countdown';
import PopWindow from './PopWindow';

const Password = () => {
  const { user } = useUserRights();
  //顯示寄信倒數計時
  const [timeStemp, setTimeStemp] = useState(false);
  //驗證碼
  const [verificationCode, setverificationCode] = useState(null);
  //如果驗證碼不是空才寄出信件
  //彈跳視窗
  const [popWindow, setPopWindow] = useState(false);

  //發送Email
  const sendEmail = () => {
    var templateParams = {
      user_email: user.email,
      user_name: user.name,
      verification: verificationCode,
    };
    console.log(templateParams.verification); //TODO:正式將驗證碼拿掉
    emailjs
      .send(
        'service_4dxhhdy',
        'template_vkxlzri',
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

  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function sendEmailVerify() {
    setverificationCode(String(randomNum(100000, 999999)));
    setTimeStemp(true);
    setTimeout(() => {
      setverificationCode(null);
      setTimeStemp(false);
    }, 180000);
  }

  //顯示密碼
  const [eye, setEye] = useState({
    eye1: false,
    eye2: false,
    eye3: false,
  });
  // 認證碼有值才寄出信件
  if (verificationCode !== null) {
    sendEmail();
  }
  return (
    <Formik
      initialValues={{
        password: '',
        newPassword: '',
        confirmPassword: '',
        authentication: '',
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
        authentication: yup
          .string()
          .required('必填項目未輸入。')
          .test('verify', '驗證碼不正確', function (authentication) {
            if (authentication === verificationCode) {
              return true;
            }
          }),
      })}
      onSubmit={async (values) => {
        try {
          await axios.put(`${API_URL}/user/password`, values, {
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

              <Field name="authentication" type="text">
                {({ field, meta }) => (
                  <div className="d-flex password-group">
                    <label htmlFor="authentication">　信箱驗證碼：</label>
                    <input id="authentication" maxLength="6" {...field} />
                    <p
                      className={`sendText ${timeStemp ? 'noClick' : ''}`}
                      onClick={sendEmailVerify}
                    >
                      發送驗證碼
                    </p>
                    {timeStemp && <Countdown />}
                    <ErrorMessage name="authentication">
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
              <button type="sunmit">確認</button>
            </Form>
          </div>
          <PopWindow
            popWindow={popWindow}
            setPopWindow={setPopWindow}
            linkTo="/users/account"
          />
        </>
      )}
    </Formik>
  );
};

export default Password;
