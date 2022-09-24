import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';
import CartDetail from '../../../Orders/pages/CheckPage/CartDetail';
import { useState } from 'react';

export default function OrderDetail() {
  const { user } = useUserRights();
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [productItems, setProductItems] = useState([]);
  const [campingCount, setCampingCount] = useState(0);
  const [campingItems, setCampingItems] = useState([]);
  const [picnicCount, setPicnicCount] = useState(0);
  const [picnicItems, setPicnicItems] = useState([]);

  useEffect(() => {
    // get orderDetail
    (async () => {
      let orderDetailResult = await axios.get(`${API_URL}/orders/${orderId}`, {
        withCredentials: true,
      });
      let orderDetailData = orderDetailResult.data.data;
      setOrderDetail(orderDetailData);

      let product = orderDetailData[0].product.filter((v) => v.id !== 0);
      setProductItems(product);
      setProductCount(product.length);

      let camping = orderDetailData[0].camping.filter((v) => v.id !== 0);
      setCampingItems(camping);
      setCampingCount(camping.length);

      let picnic = orderDetailData[0].picnic.filter((v) => v.id !== 0);
      setPicnicItems(picnic);
      setPicnicCount(picnic.length);
    })();
    // setProductItems();
  }, []);
  // console.log('orderDetail', orderDetail);

  let productTotal = productItems.reduce((total, item) => {
    // console.log('total', total);
    // console.log('items', item);
    return total + item.itemTotal;
  }, 0);
  // console.log(productItems);
  // console.log('productTotal', productTotal);
  // console.log(productCount);

  // console.log(campingItems);
  let campingTotal = campingItems.reduce((total, item) => {
    // console.log('camping', total, item);
    // return total + item.price;
  }, 0);

  let picnicTotal = picnicItems.reduce((total, item) => {
    // console.log(total, item);
    return total + item.itemTotal;
  }, 0);
  // console.log(picnicTotal);
  // console.log(picnicItems, picnicCount, picnicTotal);

  return (
    <>
      <div className="orderDetail">
        <CartDetail
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
        <div>
          <h2>訂單資訊</h2>
          <div>收件人：</div>
          <div>電話：</div>
          <div>Email：</div>
          <div></div>
        </div>
      </div>
    </>
  );
}
