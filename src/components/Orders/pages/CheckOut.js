import React from 'react';
import { Link } from 'react-router-dom';
import OrderDetail from './CheckPage/OrderDetail';
import RecipientInfo from './CheckPage/RecipientInfo';
import Payment from './CheckPage/Payment';
import { AiOutlineUser } from 'react-icons/ai';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { Formik, Field, Form, ErrorMessage, yupToFormErrors } from 'formik';
import * as yup from 'yup';
import 'yup-phone';

// post {"orders":[{productCart.state.items.id:1, productCart.state.items.quantity:2, name:aaa, email:aaa@test.com, phone:0900000000, address:XXX, delivery: 711, memo:yyy, payment: lp}]}

const initialValues = { name: '', email: '', phone: '' };

const CheckOut = (props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object({
        name: yup
          .string()
          .max(10, '請輸入10個以內的字元')
          .required('必填項目未輸入'),
        email: yup
          .string()
          .email('請輸入正確 Email 格式')
          .required('必填項目未輸入。'),
        phone: yup
          .string()
          .phone('請輸入正確 電話 格式')
          .required('必填項目未輸入'),
      })}
      onSubmit={async (values) => {
        // try {
        //   await axios.post(`${API_URL}/orders`, values);
        // } catch (e) {
        //   console.error('orders', e);
        // }
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <OrderDetail />
          <RecipientInfo />
          <Payment />
          <div className="orderStepBtns gap-3">
            <Link
              to
              className="btn stepBtn prevButton"
              onClick={() => props.updateCurrentStep(props.currentStep - 1)}
            >
              上一步
            </Link>
            <Link
              to
              className="btn stepBtn nextButton"
              type="submit"
              onClick={() => props.updateCurrentStep(props.currentStep + 1)}
            >
              下一步
            </Link>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CheckOut;
