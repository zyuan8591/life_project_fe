import React, { useState } from 'react';
import BackToTop from '../public_component/BackToTop';
import '../../styles/Order/orderstep.scss';
import StepNavigation from './component/StepNavigation';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import OrderCheck from './pages/OrderCheck';

const OrderStep = () => {
  // stepNavigation state
  const stepLabel = ['確認購物車', '填寫資料', '訂單完成'];
  const [currentStep, updateCurrentStep] = useState(1);

  const stepPages = (s) => {
    switch (s) {
      case 1:
        return (
          <Cart
            updateCurrentStep={updateCurrentStep}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <CheckOut
            updateCurrentStep={updateCurrentStep}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <OrderCheck
            updateCurrentStep={updateCurrentStep}
            currentStep={currentStep}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      <div className="cartPage">
        <StepNavigation currentStep={currentStep} stepLabel={stepLabel} />

        {stepPages(currentStep)}
      </div>

      <BackToTop />
    </>
  );
};

export default OrderStep;
