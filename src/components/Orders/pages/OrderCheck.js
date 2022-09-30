import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineCheck } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useCartStep } from '../../../orderContetxt/useCartStep';
import { useProductCart } from '../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../orderContetxt/useCampingCart';
import moment from 'moment';

function OrderCheck() {
  const { setCurrentStep } = useCartStep();
  const [orderId, setOrderId] = useState('');
  const productCart = useProductCart();
  const picnicCart = usePicnicCart();
  const campingCart = useCampingCart();

  useEffect(() => {
    setCurrentStep(3);
    setOrderId(localStorage.getItem('order_id'));

    return function clean() {
      productCart.clearCart();
      picnicCart.clearCart();
      campingCart.clearCart();
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    if (!orderId) {
      // productCart.clearCart();
    }
  }, [orderId]);
  const time = moment().format('YYYYMMDD');
  const toOrderId = (time, id) => {
    let timeString = time.replaceAll('-', '');
    let orderTime = timeString.replace('20', '');
    let orderId = id.toString().padStart(3, '0');
    return orderTime + orderId;
  };
  // console.log(time);
  // setOrderId(order_id);
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
        <p className="">您的訂單編號為： {toOrderId(time, orderId)}</p>

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
