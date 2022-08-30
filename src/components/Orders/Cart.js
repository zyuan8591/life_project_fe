import React from 'react';
import Step from './component/Step';
import OrderList from './component/OrderList';
import Summary from './component/Summary';
import './styles/Cart.scss';

const Cart = (props) => {
  return (
    <div className="cartpagecontainer">
      <div className="cartpage">
        <Step />
        {/* <OrderList /> */}
        {/* <Summary /> */}
      </div>
    </div>
  );
};

export default Cart;
