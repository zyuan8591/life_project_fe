import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCartStep } from '../../../orderContetxt/useCartStep';
import { useUserRights } from '../../../usecontext/UserRights';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../orderContetxt/useCampingCart';

import OrderList from './CartPage/OrderList';
import Summary from './CartPage/Summary';

const Cart = () => {
  const { user } = useUserRights();
  const { currentStep, setCurrentStep } = useCartStep();
  const productCart = useProductCart();
  const picnicCart = usePicnicCart();
  const campingCart = useCampingCart();
  const [point, setPoint] = useState(0);
  const [usePoint, setUsePoint] = useState(0);
  // console.log(user);

  useEffect(() => {
    setCurrentStep(1);
  }, []);

  useEffect(() => {
    if (user) {
      setPoint(user.points);
    }
  }, [user]);

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
      <OrderList
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
        point={point}
        usePoint={usePoint}
        setUsePoint={setUsePoint}
        productTotal={productTotal}
        picnicTotal={picnicTotal}
        campingTotal={campingTotal}
        productCount={productCount}
        picnicCount={picnicCount}
        campingCount={campingCount}
        currentStep={currentStep}
      />
      <div className="orderStepBtns gap-3">
        <Link to="/products" className="btn stepBtn prevButton">
          繼續購買
        </Link>
        <Link to="/orderstep/checkout" className="btn stepBtn nextButton">
          下一步
        </Link>
      </div>
    </>
  );
};

export default Cart;
