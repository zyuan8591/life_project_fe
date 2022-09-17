import React, { useState } from 'react';
import OrderTable from './OrderTable/OrderTable';
import OrderFilter from './OrderFilter/OrderFilter';
import PaginationBar from '../../../public_component/PaginationBar';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';

const Order = () => {
  const { user } = useUserRights();
  const [list, setList] = useState('全部');
  const data = [
    {
      orderNumber: 123456,
      total: 800,
      orderState: '運送中',
      date: '2022-04-18',
      payment: '信用卡',
      method: '貨到付款',
    },
    {
      orderNumber: 1615616,
      total: 1600,
      orderState: '備貨中',
      date: '2022-05-18',
      payment: '綠界',
      method: '超商取貨',
    },
  ];
  return (
    <>
      <h3>訂單查詢</h3>{' '}
      <div className="order">
        <OrderFilter list={list} setList={setList} />
        <OrderTable data={data} />
        <PaginationBar />
      </div>
    </>
  );
};

export default Order;
