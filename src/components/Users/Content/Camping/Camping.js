import React, { useState, useEffect } from 'react';
import PaginationBar from '../../../public_component/PaginationBar';
import CampingTable from './CampingTable/CampingTable';
import CapmingFilter from './CapmingFilter/CapmingFilter';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';

const Camping = () => {
  const { user } = useUserRights();
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [list, setList] = useState('官方活動');
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      let getUser = async () => {
        //撈會員全部活動
        // let response = await axios.get(
        //   `${API_URL}/camping/getUserJoin/${user.id}?page=${pageNow}`,
        //   {
        //     withCredentials: true,
        //   }
        // );
        //撈會員收藏活動
        let response = await axios.get(
          `${API_URL}/camping/userCollect?page=${pageNow}`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.result);
        setLastPage(response.data.pagination.lastPage);
      };
      getUser();
    } catch (e) {
      console.error(e.response.data.messag);
    }
  }, [pageNow, user]);

  return (
    <>
      <h3>露營活動</h3>
      <div className="user_activity">
        <CapmingFilter list={list} setList={setList} />
        <CampingTable data={data} />
        <PaginationBar
          lastPage={lastPage}
          pageNow={pageNow}
          setPageNow={setPageNow}
        />
      </div>
    </>
  );
};

export default Camping;
