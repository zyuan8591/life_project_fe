import React, { useEffect, useState } from 'react';
import '../../styles/Order/orderstep.scss';
import StepNavigation from './component/StepNavigation';
import { Outlet } from 'react-router-dom';
import { useCartStep } from '../../orderContetxt/useCartStep';

const OrderStep = () => {
  // stepNavigation state
  const stepLabel = ['確認購物車', '填寫資料', '訂單完成'];
  // const [currentStep, updateCurrentStep] = useState(1);
  const { currentStep } = useCartStep();

  // const stepPages = (s) => {
  //   switch (s) {
  //     case 1:
  //       return (
  //         <Cart
  //           updateCurrentStep={updateCurrentStep}
  //           currentStep={currentStep}
  //         />
  //       );
  //     case 2:
  //       return (
  //         <CheckOut
  //           updateCurrentStep={updateCurrentStep}
  //           currentStep={currentStep}
  //         />
  //       );
  //     case 3:
  //       return (
  //         <OrderCheck
  //           updateCurrentStep={updateCurrentStep}
  //           currentStep={currentStep}
  //         />
  //       );

  //     default:
  //       break;
  //   }
  // };

  return (
    <>
      <div className="cartPage">
        <StepNavigation stepLabel={stepLabel} currentStep={currentStep} />

        {/* {stepPages(currentStep)} */}
        <Outlet />
      </div>
    </>
  );
};

export default OrderStep;
