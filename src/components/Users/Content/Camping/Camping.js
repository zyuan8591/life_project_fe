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
  const [display, setDisplay] = useState(0);

  const getUser = async (apiurl) => {
    let response = await axios.get(apiurl, { withCredentials: true });
    console.log(response.data.result);
    setData(response.data.result);
    setLastPage(response.data.pagination.lastPage);
  };

  useEffect(() => {
    let apiurl = '';
    (async () => {
      if (display === 0) {
        apiurl = `${API_URL}/camping/getUserJoin/${user.id}?page=${pageNow}`;
      } else if (display === 2) {
        apiurl = `${API_URL}/camping/userCollect?page=${pageNow}`;
      }
      getUser(apiurl);
    })();
  }, [display, pageNow]);

  return (
    <>
      <h3>露營活動</h3>
      <div className="user_activity">
        <CapmingFilter list={list} setList={setList} setDisplay={setDisplay} />
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
