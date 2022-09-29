import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCartStep } from '../../../orderContetxt/useCartStep';
import { useUserRights } from '../../../usecontext/UserRights';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../orderContetxt/useCampingCart';

import OrderList from './CartPage/OrderList';
import Summary from './CartPage/Summary';
import Notification from '../../activity/Notification';
import { VscError } from 'react-icons/vsc';

const Cart = () => {
  const { user } = useUserRights();
  const { currentStep, setCurrentStep } = useCartStep();
  const productCart = useProductCart();
  const picnicCart = usePicnicCart();
  const campingCart = useCampingCart();
  const [point, setPoint] = useState(0);
  const [usePoint, setUsePoint] = useState(0);
  const [addToast, setAddToast] = useState(false);
  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    setCurrentStep(1);
  }, []);

  useEffect(() => {
    if (user) {
      // console.log(user);
      setPoint(user.points);
    }
  }, [user]);

  // console.log(point);
  const productItems = productCart.state.items;
  const productTotal = productCart.state.cartTotal;
  const productCount = productCart.state.totalItems;
  const picnicItems = picnicCart.state.items;
  const picnicTotal = picnicCart.state.cartTotal;
  const picnicCount = picnicCart.state.totalItems;
  const campingItems = campingCart.state.items;
  const campingTotal = campingCart.state.cartTotal;
  const campingCount = campingCart.state.totalItems;

  useEffect(() => {
    (() => {
      if (addToast === true) {
        setTimeout(() => {
          setAddToast(false);
        }, 2000);
        console.log('aaa');
      }
    })();
  }, [addToast]);

  return (
    <>
      {addToast && (
        <Notification contaninText="請選擇一個項目" iconSize={2} bottom={30}>
          <VscError />
        </Notification>
      )}
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
        <button
          onClick={() => {
            if (productCount > 0 || picnicCount > 0 || campingCount > 0) {
              navigate('/orderstep/checkout');
            }
            return setAddToast(true);
          }}
          className="btn stepBtn nextButton"
        >
          下一步
        </button>
      </div>
    </>
  );
};

export default Cart;
