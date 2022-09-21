import React, { useState, useEffect } from 'react';
import PointGroup from './PointGroup/PointGroup';
import List from './List/List';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';
import PaginationBar from '../../../public_component/PaginationBar';

const Points = () => {
  const { user } = useUserRights();
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    try {
      let getdata = async () => {
        let response = await axios.get(
          `${API_URL}/user/points?page=${pageNow}`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.data);
        setLastPage(response.data.pagination.lastPage);
      };
      getdata();
    } catch (e) {
      console.error(e.response.data.msg);
    }
  }, [pageNow]);
  return (
    <>
      <h3>我的點數</h3>
      <PointGroup />
      <List data={data} />
      <PaginationBar
        lastPage={lastPage}
        pageNow={pageNow}
        setPageNow={setPageNow}
      />
    </>
  );
};

export default Points;
