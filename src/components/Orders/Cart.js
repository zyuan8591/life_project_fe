import React, { useState } from 'react';
import OrderList from './component/OrderList';
import Summary from './component/Summary';
import './styles/cart.scss';
import Headers from '../public_component/Header';
import Footer from '../public_component/Footer';
import BackToTop from '../public_component/BackToTop';
import StepNavigation from './component/StepNavigation';
import { IconContext } from 'react-icons';

const Cart = (props) => {
  const labelArray = ['確認購物車', '填寫資料', '訂單完成'];
  const [currentStep, updateCurrentStep] = useState(1);

  const updateStep = (step) => {
    updateCurrentStep(step);
  };

  return (
    <>
      <Headers />

      <div className="cartpageContainer">
        <div className="cartpage">
          <IconContext.Provider value={{ color: '#444', size: '2rem' }}>
            {/* <FiShoppingBag /> */}
            <StepNavigation
              currentStep={currentStep}
              labelArray={labelArray}
              updateStep={updateStep}
            />

            <OrderList />
            <Summary />

            <div className="text-center stepbtn">
              <button
                className="prevButton me-5"
                onClick={() => updateCurrentStep(currentStep - 1)}
              >
                上一步
              </button>
              <button
                className="nextButton"
                onClick={() => updateCurrentStep(currentStep + 1)}
              >
                下一步
              </button>
            </div>
          </IconContext.Provider>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default Cart;
