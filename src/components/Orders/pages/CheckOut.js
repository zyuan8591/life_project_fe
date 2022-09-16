import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import OrderDetail from './CheckPage/OrderDetail';
import RecipientInfo from './CheckPage/RecipientInfo';
import CreditCard from './CheckPage/CreditCard';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../orderContetxt/useCampingCart';

import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const CheckOut = (props) => {
  const [delivery, setDelivery] = useState([]);

  const [payment, setPayment] = useState([]);
  const [isVisa, setIsVisa] = useState(false);
  const [isAtm, setIsAtm] = useState(false);

  const productCart = useProductCart();
  const picnicCart = usePicnicCart();
  const campingCart = useCampingCart();

  useEffect(() => {
    // get delivery
    (async () => {
      let deliveryResult = await axios.get(`${API_URL}/orders/delivery`);
      let deliveryData = deliveryResult.data;
      setDelivery(deliveryData);
    })();

    // get payment
    (async () => {
      let paymentResult = await axios.get(`${API_URL}/orders/payment`);
      let paymentData = paymentResult.data;
      console.log(paymentData);
      setPayment(paymentData);
    })();
  }, []);

  useEffect(() => {
    if (payment === 0) {
      setIsAtm(true);
      setIsVisa(false);
    } else if (payment === 3) {
      setIsVisa(true);
      setIsAtm(false);
    } else {
      setIsAtm(false);
      setIsVisa(false);
    }
  }, [payment]);

  // post {"orders":[{productCart.state.items.id:1, productCart.state.items.quantity:2, name:aaa, email:aaa@test.com, phone:0900000000, address:XXX, delivery: 2, memo:yyy, payment: lp}]}

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
    payment: '',
  };

  const productItems = productCart.state.items;
  const productTotal = productCart.state.cartTotal;
  const picnicItems = picnicCart.state.items;
  const picnicTotal = picnicCart.state.cartTotal;
  const campingItems = campingCart.state.items;
  const campingTotal = campingCart.state.cartTotal;
  return (
    <>
      <OrderDetail />
      <Formik
        initialValues={{
          ...initialValues,
          productItems,
          picnicItems,
          campingItems,
          productTotal,
          picnicTotal,
          campingTotal,
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
          delivery: yup.string().required('必須'),
          cityName: yup.mixed().required('必須1'),
          areaName: yup.mixed().required('必須2'),
          address: yup.string().required('必填3'),
          payment: yup.string().required('必須'),
        })}
        onSubmit={async (values, product) => {
          // try {
          //   await axios.post(`${API_URL}/order`, values);
          // } catch (e) {
          //   console.error('order', e);
          // }
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <RecipientInfo
              values={values}
              setDelivery={setDelivery}
              delivery={delivery}
            />

            <h2 className="mb-3">付款方式</h2>

            <div className="payment">
              {payment.map((v, i) => {
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
                          value={v.id}
                          // checked={(payment = v)}
                          onChange={(e) => {
                            // setPayment();
                            // console.log(e);
                            setFieldValue('payment', v.id);
                          }}
                        />
                        {v.order_payment}
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
              <ErrorMessage name="payment">
                {(err) => (
                  <>
                    <p className="text-danger px-2">{err}</p>
                  </>
                )}
              </ErrorMessage>
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
    </>
  );
};

export default CheckOut;
