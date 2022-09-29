import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineCheck } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useCartStep } from '../../../orderContetxt/useCartStep';

function OrderCheck() {
  const { setCurrentStep } = useCartStep();

  useEffect(() => {
    setCurrentStep(3);
  }, []);

  const order_id = localStorage.getItem('order_id');
  // console.log(order_id);

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
        <p className="">您的訂單編號為： {order_id}</p>

        <div className="orderStepBtns gap-3">
          <Link
            to="/products"
            className="btn stepBtn prevButton"
            onClick={() => {
              localStorage.clear();
            }}
          >
            繼續購買
          </Link>
          <Link
            to="/users/order"
            className="btn stepBtn nextButton"
            onClick={() => {
              localStorage.clear();
            }}
          >
            查看訂單
          </Link>
        </div>
      </div>
    </>
  );
}

export default OrderCheck;
