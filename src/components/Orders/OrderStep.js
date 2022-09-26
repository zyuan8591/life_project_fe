import React, { useEffect } from 'react';
import '../../styles/Order/orderstep.scss';
import StepNavigation from './component/StepNavigation';
import { Link, Outlet } from 'react-router-dom';
import { useCartStep } from '../../orderContetxt/useCartStep';

import { useProductCart } from '../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../orderContetxt/useCampingCart';

import { RiShoppingCartLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';

const OrderStep = () => {
  const productCart = useProductCart();
  const picnicCart = usePicnicCart();
  const campingCart = useCampingCart();

  const productCount = productCart.state.items.length;
  const picnicCount = picnicCart.state.items.length;
  const campingCount = campingCart.state.items.length;
  // console.log(productCount, picnicCount, campingCount);

  useEffect(() => {});

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
        {(productCount < 1 && picnicCount < 1 && campingCount < 1 && (
          <>
            <div className="flexCenter flex-column gap-2 cartNull">
              <IconContext.Provider value={{ color: '#444', size: '4rem' }}>
                <RiShoppingCartLine />
              </IconContext.Provider>
              <h2 className="h1">您的購物車目前為空</h2>
              <Link to="/products" className="goShop mt-3">
                前往購物
              </Link>
            </div>
          </>
        )) || (
          <>
            {/* {stepPages(currentStep)} */}
            <StepNavigation stepLabel={stepLabel} currentStep={currentStep} />
            <Outlet />
          </>
        )}
      </div>
    </>
  );
};

export default OrderStep;
