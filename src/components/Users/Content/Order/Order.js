import React, { useState, useEffect } from 'react';
import OrderTable from './OrderTable/OrderTable';
import OrderFilter from './OrderFilter/OrderFilter';
import PaginationBar from '../../../public_component/PaginationBar';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';

const Order = () => {
  const { user } = useUserRights();
  const [list, setList] = useState('全部');
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [data, setData] = useState([
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
  ]);
  const [display, setDisplay] = useState(0);
  // const getUser = async (apiurl) => {
  //   let response = await axios.get(apiurl, { withCredentials: true });
  //   setData(response.data.result);
  //   setLastPage(response.data.pagination.lastPage);
  // };
  // useEffect(() => {
  //   let apiurl = '';
  //   (async () => {
  //     switch (display) {
  //       case 1:
  //         apiurl = `${API_URL}/picnic/group/memberJoin?page=${pageNow}`;
  //         break;
  //       case 2:
  //         apiurl = `${API_URL}/picnic/official/memberJoin`;
  //         break;
  //       case 3:
  //         apiurl = `${API_URL}/official/memberCollect`;
  //         break;
  //       default: //0
  //         apiurl = `${API_URL}/picnic/official/memberJoin?page=${pageNow}`;
  //         break;
  //     }
  //     getUser(apiurl);
  //   })();
  // }, [display, pageNow]);

  return (
    <>
      <h3>訂單查詢</h3>
      <div className="order">
        <OrderFilter list={list} setList={setList} setDisplay={setDisplay} />
        <OrderTable data={data} />
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
