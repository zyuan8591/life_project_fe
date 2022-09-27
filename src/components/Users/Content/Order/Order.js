import React, { useState, useEffect } from 'react';
import OrderTable from './OrderTable/OrderTable';
import OrderFilter from './OrderFilter/OrderFilter';
import PaginationBar from '../../../public_component/PaginationBar';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';

const Order = () => {
  const { user } = useUserRights();
  const [status, setStatus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  console.log(orders);
  useEffect(() => {
    // getOrders
    (async () => {
      let ordersResult = await axios.get(
        `${API_URL}/orders?status=${currentStatus}&page=${pageNow}`,
        {
          withCredentials: true,
        }
      );

      setOrders(ordersResult.data.data);
      setLastPage(ordersResult.data.pagination.lastPage);
    })();

    // get status
    (async () => {
      let statusResult = await axios.get(`${API_URL}/orders/status`);
      // console.log(statusResult.data);
      setStatus(statusResult.data);
    })();
  }, [currentStatus, pageNow]);
  // console.log(orders);
  console.log(currentStatus);

  return (
    <>
      <h3>訂單查詢</h3>
      <div className="order">
        <OrderFilter
          status={status}
          setStatus={setStatus}
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
        />
        <OrderTable
          orders={orders}
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
        />
        <PaginationBar
          lastPage={lastPage}
          pageNow={pageNow}
          setPageNow={setPageNow}
        />
      </div>
    </>
  );
};

export default Order;
