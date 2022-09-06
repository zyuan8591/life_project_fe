import React from 'react';
import { Link } from 'react-router-dom';
import OrderList from './CartPage/OrderList';
import Summary from './CartPage/Summary';

const Cart = (props) => {
  return (
    <>
      <OrderList />
      <Summary />
      <div className="orderStepBtns gap-3">
        <Link to="/products" className="btn stepBtn prevButton">
          繼續購買
        </Link>
        <Link
          to
          onClick={() => props.updateCurrentStep(props.currentStep + 1)}
          className="btn stepBtn nextButton"
        >
          下一步
        </Link>
      </div>
    </>
  );
};

export default Cart;
