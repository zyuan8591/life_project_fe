import React, { useState, useRef } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
// import InputGender from './component/InputGender';
// import InputAddress from './component/inputAddress';
import WarnWindow from './component/WarnWindow';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';
import jsondata from './CityCountyData.json';
import PreviewImage from './PreviewImage';

const Account = ({ setEdit }) => {
  const { user, setUser } = useUserRights();
  const [newUser, serNewUser] = useState(user);

  //彈跳視窗
  const [warn, setWarn] = useState(false);
  function pop(e) {
    e.preventDefault();
    setWarn(true);
  }

  return (
    <>
      <Formik
        initialValues={{
          photo: null,
          name: `${user.name}`,
          gender: `${user.gender}`,
          birth: `${user.birth}`,
          phone: `${user.phone}`,
          cityName: `${user.cityName}`,
          areaName: `${user.areaName}`,
          intro: `${user.intro}`,
        }}
        onSubmit={async (values) => {
          // try {
          //   await axios.post(`${API_URL}/signup`, values);
          //   setSign(true);
          // } catch (e) {
          //   console.error('register', e);
          // }
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="account_Edit">
              <label htmlFor="photo">
                <figure className="avata ">
                  <span>點擊更換圖片</span>
                  {values.photo && <PreviewImage file={values.photo} />}
                </figure>
              </label>
              <input
                type="file"
                id="photo"
                className="photo"
                onChange={(e) => {
                  setFieldValue('photo', e.target.files[0]);
                }}
              />

              <Field name="name">
                {({ field, meta }) => (
                  <>
                    <div className="userData ">
                      <label>信箱：</label>
                      <input type="text" value={user.email} readOnly />
                    </div>
                    <div className="signup-input signup-group signup-name">
                      <label>姓名：</label>
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
              </Field>

              <div className="userData ">
                <label htmlFor="gender">性別：</label>
                <label htmlFor="man">
                  <Field type="radio" id="man" name="gender" value="男" />男
                </label>
                <label htmlFor="woman">
                  <Field type="radio" id="woman" name="gender" value="女" />女
                </label>
              </div>
              <Field name="birth">
                {({ field, meta }) => (
                  <>
                    <div className="signup-input signup-group signup-name">
                      <label>生日：</label>
                      <input
                        type="date"
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
              </Field>

              <Field name="phone">
                {({ field, meta }) => (
                  <>
                    <div className="signup-input signup-group signup-name">
                      <label>電話：</label>
                      <input
                        type="text"
                        placeholder="請輸入電話號碼"
                        maxLength="10"
                        {...field}
                        className={`input ${meta.error ? 'is-error' : ''}`}
                      />
                      <ErrorMessage name="phone">
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
              </Field>

              <div className="addressGroup d-flex">
                <label className="userData" htmlFor="address">
                  地址：
                </label>

                <Field name="cityName" as="select">
                  <option value="">請選擇</option>
                  {jsondata.map((v, i) => {
                    return (
                      <option key={i} value={v.CityName}>
                        {v.CityName}
                      </option>
                    );
                  })}
                </Field>
                <Field name="areaName" as="select">
                  <option value="">請選擇</option>
                  {jsondata
                    .filter((v) => v.CityName === values.cityName)
                    .map((v, i) => {
                      <option key={i}></option>;
                      return v.AreaList.map((v2, i2) => {
                        return (
                          <option key={i2} value={v2.AreaName}>
                            {v2.AreaName}
                          </option>
                        );
                      });
                    })}
                </Field>
              </div>
              <div className="userData row">
                <label htmlFor="intro" className="col">
                  簡介:
                </label>
                <Field
                  name="intro"
                  as="textarea"
                  cols="30"
                  rows="10"
                  id="intro"
                ></Field>
              </div>
            </div>
            <div className="reviseBtn">
              <button type="submit">儲存</button>
              <button
                onClick={() => {
                  setEdit(false);
                }}
              >
                取消
              </button>
            </div>
            <WarnWindow warn={warn} setWarn={setWarn} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Account;
