import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import OrderDetail from './CheckPage/OrderDetail';
import RecipientInfo from './CheckPage/RecipientInfo';
import Payment from './CheckPage/Payment';
import CreditCard from './CheckPage/CreditCard';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../orderContetxt/useCampingCart';

import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useCartStep } from '../../../orderContetxt/useCartStep';

const CheckOut = () => {
  const { currentStep, setCurrentStep } = useCartStep();

  const [delivery, setDelivery] = useState([]);

  const [payment, setPayment] = useState([]);

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
    setCurrentStep(2);
  }, []);

  // post {"orders":[{productCart.state.items.id:1, productCart.state.items.quantity:2, name:aaa, email:aaa@test.com, phone:0900000000, address:XXX, delivery: 2, memo:yyy, payment: lp}]}

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    delivery: '',
    cityName: '',
    areaName: '',
    address: '',
    memo: '',
    payment: '',
    // productItems:[{}]
    // productTotal:10000
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
            <Payment
              values={values}
              payment={payment}
              setPayment={setPayment}
              setFieldValue={setFieldValue}
            />

            <div className="orderStepBtns gap-3">
              <Link
                to="/orderstep/cart"
                className="btn stepBtn prevButton"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                上一步
              </Link>
              <button
                className="btn stepBtn nextButton"
                type="submit"
                // onClick={() => setCurrentStep(currentStep + 1)}
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
