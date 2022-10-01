import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CartDetail from './CheckPage/CartDetail';
import RecipientInfo from './CheckPage/RecipientInfo';
import Summary from './CartPage/Summary';
import Payment from './CheckPage/Payment';

import { useCartStep } from '../../../orderContetxt/useCartStep';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../orderContetxt/useCampingCart';

import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const CheckOut = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = useCartStep();
  const productCart = useProductCart();
  const picnicCart = usePicnicCart();
  const campingCart = useCampingCart();

  const [delivery, setDelivery] = useState([]);

  const [payment, setPayment] = useState([]);
  const [currentPayment, setCurrentPayment] = useState(null);

  const [orderId, setOrderId] = useState('');
  const [orderInfo, setOrderInfo] = useState([]);
  const [isOrder, setIsOrder] = useState(false);

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
    if (orderId) {
      (async () => {
        let orderInfo = await axios.post(
          `${API_URL}/orders/orderinfo`,
          orderId,
          {
            withCredentials: true,
          }
        );
        setOrderInfo(orderInfo.data);
      })();
    }

    // console.log('orderinfo', orderInfo);
  }, [orderId]);

  useEffect(() => {
    if (currentPayment !== 2) {
      (async () => {
        if (isOrder) {
          navigate('/orderstep/ordercheck');
        }
      })();
    }
  }, [isOrder]);

  useEffect(() => {
    if (orderId && currentPayment === 2) {
      (async () => {
        let payResponse = await axios.post(`${API_URL}/orders/pay`, orderInfo, {
          withCredentials: true,
        });
        // console.log('payResponse', payResponse.data);
        window.location.replace(payResponse.data);
      })();
    }
  }, [orderInfo]);

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
    point: '',
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
  const point = localStorage.getItem('usePoint')
    ? -localStorage.getItem('usePoint')
    : 0;
  const addPoint = parseInt(
    (productTotal + picnicTotal + campingTotal - point) * 0.01
  );
  // console.log(addPoint);

  // console.log(point);
  // console.log(orderId);
  // console.log('orderinfo', orderInfo);

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
      <Summary
        productItems={productItems}
        productTotal={productTotal}
        productCount={productCount}
        picnicItems={picnicItems}
        picnicTotal={picnicTotal}
        picnicCount={picnicCount}
        campingItems={campingItems}
        campingTotal={campingTotal}
        campingCount={campingCount}
        currentStep={currentStep}
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
          point,
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
          cityName: yup.mixed().required('必須'),
          areaName: yup.mixed().required('必須'),
          address: yup.string().required('必填'),
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
            // 建立訂單
            let response = await axios.post(`${API_URL}/orders/order`, values, {
              withCredentials: true,
            });

            if (response.data) {
              setOrderId(response.data);
              // console.log(response.data);
              // setTime(response.data.create_time);
              localStorage.setItem('order_id', response.data.order_id);
              // localStorage.setItem('time', response.data.create_time);
              // console.log(orderId);
              setIsOrder(true);
              // window.localStorage.clear();
            }

            if (point) {
              await axios.post(
                `${API_URL}/user/points`,
                {
                  point: point, //新增/扣除點數
                  event: '購物折扣', //名目
                },
                {
                  withCredentials: true,
                }
              );
            }
            await axios.post(
              `${API_URL}/user/points`,
              {
                point: addPoint, //新增/扣除點數
                event: '購物回饋', //名目
              },
              {
                withCredentials: true,
              }
            );
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
