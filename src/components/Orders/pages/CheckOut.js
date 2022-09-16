import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderDetail from './CheckPage/OrderDetail';
import CreditCard from './CheckPage/CreditCard';
import jsondata from '../../../utils/CityCountyData.json';
import { useProductCart } from '../../../orderContetxt/useProductCart';

import { AiOutlineUser } from 'react-icons/ai';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

// post {"orders":[{productCart.state.items.id:1, productCart.state.items.quantity:2, name:aaa, email:aaa@test.com, phone:0900000000, address:XXX, delivery: 711, memo:yyy, payment: lp}]}

const initialValues = {
  // product: ProductCartProvider.state.items.id,
  // quantity: ProductCartProvider.state.items.quantity,
  name: '',
  email: '',
  phone: '',
  delivery: '',
  cityName: '',
  areaName: '',
  address: '',
  memo: '',
};

const CheckOut = (props) => {
  const [payment, setPayment] = useState('');
  const paymentOptions = ['ATM/銀行臨櫃匯款', 'LinePay', '綠界', '信用卡'];
  // const [delivery, setDelivery] = useState('');
  const deliveryOption = ['宅配到府', '超商取貨', '無'];
  const [isVisa, setIsVisa] = useState(false);
  const [isAtm, setIsAtm] = useState(false);
  const productCart = useProductCart();

  useEffect(() => {
    if (payment === 'ATM/銀行臨櫃匯款') {
      setIsAtm(true);
      setIsVisa(false);
    } else if (payment === '信用卡') {
      setIsVisa(true);
      setIsAtm(false);
    } else {
      setIsAtm(false);
      setIsVisa(false);
    }
  }, [payment]);

  return (
    <Formik
      initialValues={{
        ...initialValues,
        // productId: productCart.state.items.id,
        // quantity: productCart.state.items.quantity,
      }}
      validationSchema={yup.object({
        name: yup
          .string()
          .max(10, '請輸入10個以內的字元')
          .required('必填項目未輸入'),
        phone: yup.string().required('必填項目未輸入'),
        email: yup
          .string()
          .email('請輸入正確 Email 格式')
          .required('必填項目未輸入。'),
        delivery: yup.mixed().required('必須').oneOf(deliveryOption),
        cityName: yup.mixed().required('必須1'),
        areaName: yup.mixed().required('必須2'),
        address: yup.string().required('必填3'),
      })}
      onSubmit={async (values) => {
        // try {
        //   await axios.post(`${API_URL}/orders`, values);
        // } catch (e) {
        //   console.error('orders', e);
        // }
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <OrderDetail />

          <h2 className="mb-3">
            <AiOutlineUser /> 收件者資訊
          </h2>

          <div className="recipient">
            <div className="row recipientInfo">
              <Field name="name">
                {({ field, meta }) => (
                  <>
                    <div className="col-6 mb-2">
                      <label className="mb-2">姓名</label>
                      <input type="text" maxLength={10} {...field} />
                      <ErrorMessage name="name">
                        {(err) => (
                          <>
                            <p className="text-danger">{err}</p>
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
                    <div className="col-6 mb-2">
                      <label className="mb-2">電話</label>
                      <input type="text" {...field} />
                      <ErrorMessage name="phone">
                        {(err) => (
                          <>
                            <p className="text-danger">{err}</p>
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
                    <div className="col-12 mb-2">
                      <label className="mb-2">Email</label>
                      <input type="text" {...field} />
                      <ErrorMessage name="email">
                        {(err) => (
                          <>
                            <p className="text-danger">{err}</p>
                          </>
                        )}
                      </ErrorMessage>
                    </div>
                  </>
                )}
              </Field>
              {/* <select
                        value={delivery}
                        {...field}
                        onChange={(e) => {
                          setDelivery(e.target.value);
                        }}
                      > 
               </select> */}
              <div className="col-12 mb-2">
                <label className="mb-2">運送方式</label>
                <Field name="delivery" as="select">
                  <option value="">--請選擇--</option>
                  {deliveryOption.map((v, i) => {
                    return (
                      <>
                        <option
                          key={Math.random().toString(36).replace('0.', '')}
                          value={v}
                        >
                          {v}
                        </option>
                      </>
                    );
                  })}
                  ;
                </Field>
                <ErrorMessage name="delivery">
                  {(err) => (
                    <>
                      <p className="text-danger">{err}</p>
                    </>
                  )}
                </ErrorMessage>
              </div>
              <div className="col-12 mb-2 address">
                <label className="mb-2">地址</label>
                <div className="row gap-2">
                  <div className="col">
                    <div className="row gap-2">
                      <div className="col">
                        <Field name="cityName" as="select">
                          <option value="">請選擇</option>
                          {jsondata.map((v, i) => {
                            return (
                              <option
                                key={Math.random()
                                  .toString(36)
                                  .replace('0.', '')}
                                value={v.CityName}
                              >
                                {v.CityName}
                              </option>
                            );
                          })}
                        </Field>
                        <ErrorMessage name="cityName">
                          {(err) => (
                            <>
                              <p className="text-danger">{err}</p>
                            </>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className="col">
                        <Field name="areaName" as="select">
                          <option value="">請選擇</option>
                          {jsondata
                            .filter((v) => v.CityName === values.cityName)
                            .map((v, i) => {
                              <option
                                key={Math.random()
                                  .toString(36)
                                  .replace('0.', '')}
                              ></option>;
                              return v.AreaList.map((v2, i2) => {
                                return (
                                  <option key={i2} value={v2.AreaName}>
                                    {v2.AreaName}
                                  </option>
                                );
                              });
                            })}
                        </Field>

                        <ErrorMessage name="areaName">
                          {(err) => (
                            <>
                              <p className="text-danger">{err}</p>
                            </>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <Field name="address">
                      {({ field, meta }) => (
                        <>
                          <input type="text" {...field} />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="address">
                      {(err) => (
                        <>
                          <p className="text-danger">{err}</p>
                        </>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-2">
                <label className="mb-2">備註</label>
                <Field name="memo" as="textarea" />
              </div>
            </div>
          </div>

          <h2 className="mb-3">付款方式</h2>

          <div className="payment">
            {paymentOptions.map((v, i) => {
              return (
                <>
                  <div
                    className="mb-2 px-2"
                    key={Math.random().toString(36).replace('0.', '')}
                  >
                    <label>
                      <Field
                        className="me-3"
                        type="radio"
                        name="payment"
                        value={v}
                        checked={payment === v}
                        onChange={(e) => {
                          setPayment(e.target.value);
                        }}
                      />
                      {v}
                    </label>
                    {(i === 0 && isAtm && (
                      <>
                        <p className="px-5">
                          1、選擇"ATM付款"即生成供本次使用的銀行虛擬帳號與唯一的訂單編號（轉帳時請務必輸入正確帳號，避免轉錯帳號造成損失）
                          <br />
                          2、虛擬帳號從生成之時起在24小時內有效，超時則無法付款成功
                        </p>
                      </>
                    )) ||
                      (i === 3 && isVisa && (
                        <>
                          <CreditCard />
                        </>
                      ))}
                  </div>
                </>
              );
            })}
          </div>

          <div className="orderStepBtns gap-3">
            <Link
              to
              className="btn stepBtn prevButton"
              onClick={() => props.updateCurrentStep(props.currentStep - 1)}
            >
              上一步
            </Link>
            <button
              className="btn stepBtn nextButton"
              type="submit"
              // onClick={() => props.updateCurrentStep(props.currentStep + 1)}
            >
              下一步
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CheckOut;
