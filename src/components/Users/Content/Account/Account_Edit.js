import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import WarnWindow from './component/WarnWindow';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';
import jsondata from '../../../../utils/CityCountyData.json';
import PreviewImage from './component/PreviewImage';

const Account = ({ setEdit }) => {
  const { user, setUser } = useUserRights();

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
          cityName: `${user.city}`,
          areaName: `${user.area}`,
          intro: `${user.intro}`,
        }}
        validationSchema={yup.object({
          name: yup.string().max(10, '請輸入10個以內的文字').required('必填。'),
        })}
        onSubmit={async (values) => {
          try {
            let formData = new FormData();
            formData.append('photo', values.photo);
            formData.append('name', values.name);
            formData.append('birth', values.birth);
            formData.append('gender', values.gender);
            formData.append('phone', values.phone);
            formData.append('cityName', values.cityName);
            formData.append('areaName', values.areaName);
            formData.append('intro', values.intro);
            let response = await axios.put(`${API_URL}/user`, formData, {
              withCredentials: true,
            });
            setUser(response.data);
            setWarn(false);
            setEdit(false);

            // setEdit(false);
          } catch (e) {
            console.error('register', e);
          }
          // console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="account_Edit ">
              <div className="dateGroup">
                <Field name="name">
                  {({ field, meta }) => (
                    <>
                      <div className="userData d-flex">
                        <label>信箱：</label>
                        <p>{user.email}</p>
                      </div>
                      <div className="userData namegroup">
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
                              <i className="fa-regular fa-circle-xmark"></i>
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
                      <div className="userData">
                        <label>生日：</label>
                        <input type="date" {...field} />
                      </div>
                    </>
                  )}
                </Field>

                <Field name="phone">
                  {({ field, meta }) => (
                    <>
                      <div className="userData">
                        <label>電話：</label>
                        <input
                          type="text"
                          placeholder="請輸入電話號碼"
                          maxLength="10"
                          {...field}
                        />
                      </div>
                    </>
                  )}
                </Field>

                <div className="userData">
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
                <div className="userData">
                  <label htmlFor="intro" className="">
                    簡介:
                  </label>
                  <Field
                    name="intro"
                    as="textarea"
                    cols="30"
                    rows="10"
                    id="intro"
                    className="intro"
                  ></Field>
                </div>
              </div>
              <div className="avatarGroup">
                <label htmlFor="photo">
                  <figure className="avata ">
                    <span>點擊更換圖片</span>
                    {values.photo ? (
                      <PreviewImage file={values.photo} />
                    ) : (
                      <img src={`${API_URL_IMG}${user.photo}`} alt="" />
                    )}
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
                <div className="btnGroup ">
                  <button className="saveBtn editbtn" onClick={pop}>
                    儲存
                  </button>
                  <button
                    onClick={() => {
                      setEdit(false);
                    }}
                    className="exitBtn editbtn"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>

            <WarnWindow warn={warn} setWarn={setWarn} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Account;
