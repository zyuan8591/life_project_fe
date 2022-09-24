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
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(0);
  const getUser = async (apiurl) => {
    let response = await axios.get(apiurl, { withCredentials: true });
    setData(response.data.result);
    setLastPage(response.data.pagination.lastPage);
  };
  console.log(data);
  // useEffect(() => {
  //   let apiurl = '';
  //   (async () => {
  //     switch (display) {
  //       case 1:
  //         apiurl = `${API_URL}/orders/group/memberJoin?page=${pageNow}`;
  //         break;
  //       case 2:
  //         apiurl = `${API_URL}/orders/official/memberJoin`;
  //         break;
  //       case 3:
  //         apiurl = `${API_URL}/orders/memberCollect`;
  //         break;
  //       default: //0
  //         apiurl = `${API_URL}/orders`;
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
