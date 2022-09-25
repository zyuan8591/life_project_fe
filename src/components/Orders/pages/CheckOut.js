import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CartDetail from './CheckPage/CartDetail';
import RecipientInfo from './CheckPage/RecipientInfo';
import Payment from './CheckPage/Payment';
// import CreditCard from './CheckPage/CreditCard';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../orderContetxt/useCampingCart';

import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useCartStep } from '../../../orderContetxt/useCartStep';

const CheckOut = () => {
  const { currentStep, setCurrentStep, setOrderId } = useCartStep();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState([]);

  const [payment, setPayment] = useState([]);
  const [currentPayment, setCurrentPayment] = useState(null);

  const [isOrder, setIsOrder] = useState(false);

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
      // console.log(paymentData);
      setPayment(paymentData);
    })();
    setCurrentStep(2);
  }, []);

  useEffect(() => {
    if (isOrder) {
      // <Navigate to="/orderstep/ordercheck" />;
      navigate('/orderstep/ordercheck');
    }
  }, [isOrder]);

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
    cardNumber: '',
    cardName: '',
    cardMonth: '',
    cardYear: '',
    cardCvc: '',
    // productItems:[{}]
    // productTotal:10000
  };

  const productItems = productCart.state.items;
  const productTotal = productCart.state.cartTotal;
  const productCount = productCart.state.totalItems;
  const picnicItems = picnicCart.state.items;
  const picnicTotal = picnicCart.state.cartTotal;
  const picnicCount = picnicCart.state.totalItems;
  const campingItems = campingCart.state.items;
  const campingTotal = campingCart.state.cartTotal;
  const campingCount = campingCart.state.totalItems;

  return (
    <>
      <CartDetail
        productItems={productItems}
        productTotal={productTotal}
        productCount={productCount}
        picnicItems={picnicItems}
        picnicTotal={picnicTotal}
        picnicCount={picnicCount}
        campingItems={campingItems}
        campingTotal={campingTotal}
        campingCount={campingCount}
      />
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
          // cardNumber: yup.string().when('payment', {
          //   is: 'payment' === 4,
          //   then: yup.string().required('87'),
          // }),
          // cardName:yup.string().required(),

          // cardMonth: yup.string().when('payment', {
          //   is: 4,
          //   then: yup.string().required,
          // }),
          // cardYear: yup.string().when('payment', {
          //   is: 4,
          //   then: yup.string().required('87'),
          // }),
          // cardCvc: yup.string().when('payment', {
          //   is: 'payment' === 4,
          //   then: yup.string().required('sdfas'),
          // }),
        })}
        onSubmit={async (values) => {
          try {
            let response = await axios.post(`${API_URL}/orders/order`, values, {
              withCredentials: true,
            });
            // console.log(response);
            if (response.data) {
              setIsOrder(true);
              setOrderId(response.data);
              window.localStorage.clear();
            }
          } catch (e) {
            console.error('order', e);
          }
          // console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <RecipientInfo values={values} delivery={delivery} />
            <Payment
              values={values}
              payment={payment}
              setFieldValue={setFieldValue}
              currentPayment={currentPayment}
              setCurrentPayment={setCurrentPayment}
            />

            <div className="orderStepBtns gap-3">
              <Link
                to="/orderstep/cart"
                className="btn stepBtn prevButton"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                上一步
              </Link>
              <button className="btn stepBtn nextButton" type="submit">
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
