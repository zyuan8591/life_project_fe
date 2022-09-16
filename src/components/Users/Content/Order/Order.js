import React from 'react';
import Table from './Table/Table';
import OrderFilter from './OrderFilter/OrderFilter';


const Order = () => {
  return (
    <>
      <h3>訂單查詢</h3>{' '}
      <div className="order">
        <OrderFilter />
        <Table />
      </div>
    </>
  );
};

export default Order;
