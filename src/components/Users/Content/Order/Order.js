import React from 'react';
import Table from './Table/Table';
import OrderFilter from './OrderFilter/OrderFilter';
import '../../../../styles/Users/order.modle.scss';

const Order = () => {
  return (
    <div className="order">
      <h3>訂單查詢</h3>
      <OrderFilter />
      <Table />
    </div>
  );
};

export default Order;
