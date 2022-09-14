import React from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineCheck } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function OrderCheck(props) {
  return (
    <>
      <div className="orderCheck gap-2 ">
        <div className="stepWrapper">
          <div className="stepBlock selected ">
            <div className="circleWrapper">
              <div className="circle">
                <IconContext.Provider value={{ color: '#444', size: '2rem' }}>
                  <AiOutlineCheck />
                </IconContext.Provider>
              </div>
            </div>
            <span>完成訂單</span>
          </div>
        </div>
        <p className="">您的訂單編號為： 1</p>

        <div className="orderStepBtns gap-3">
          <Link to="/products" className="btn stepBtn prevButton">
            繼續購買
          </Link>
          <Link
            to="/users/order"
            onClick={() => props.updateCurrentStep(props.currentStep + 1)}
            className="btn stepBtn nextButton"
          >
            查看訂單
          </Link>
        </div>
      </div>
    </>
  );
}

export default OrderCheck;
