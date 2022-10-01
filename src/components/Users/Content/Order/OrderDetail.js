import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';
import CartDetail from '../../../Orders/pages/CheckPage/CartDetail';
import { useState } from 'react';
import Summary from '../../../Orders/pages/CartPage/Summary';

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
  const [usePoint, setUsePoint] = useState(0);

  const [Detail] = orderDetail;
  // console.log(orderDetail[0].discount);
  // console.log(usePoint);
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

      setUsePoint(-orderDetailData[0].discount);
    })();
    // setProductItems();
  }, []);
  console.log('orderDetail', orderDetail);
  console.log(usePoint);

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
    return total + item.itemTotal;
  }, 0);

  let picnicTotal = picnicItems.reduce((total, item) => {
    // console.log(total, item);
    return total + item.itemTotal;
  }, 0);
  // console.log(picnicTotal);
  // console.log(picnicItems, picnicCount, picnicTotal);
  // console.log(picnicTotal, campingTotal);

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
        <Summary
          usePoint={usePoint}
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
        <h2 className="orderData-title text-center mt-3">訂單資訊</h2>
        <div className="orderData row py-3 ">
          <div className="userData col-lg ">
            <div>收件人：{Detail ? Detail.name : null}</div>
            <div>電話：{Detail ? Detail.phone : null}</div>
            <div>Email：{Detail ? Detail.email : null}</div>
            <div>住址：{Detail ? Detail.address : null}</div>
          </div>
          <div className="memo col-lg">
            <div>備註：{Detail ? Detail.memo : null}</div>
          </div>
        </div>
      </div>
    </>
  );
}
