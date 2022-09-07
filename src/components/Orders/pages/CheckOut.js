import React from 'react';
import { Link } from 'react-router-dom';
import OrderDetail from './CheckPage/OrderDetail';
import RecipientInfo from './CheckPage/RecipientInfo';
import Payment from './CheckPage/Payment';

const CheckOut = (props) => {
  return (
    <>
      <OrderDetail />
      <form>
        <RecipientInfo />
        <Payment />
      </form>

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
          onClick={() => props.updateCurrentStep(props.currentStep + 1)}
        >
          下一步
        </Link>
      </div>
    </>
  );
};

export default CheckOut;
