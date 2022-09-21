import React, { useState, useEffect } from 'react';
import PaginationBar from '../../../public_component/PaginationBar';
import PicnicTable from './PicnicTable/PicnicTable';
import PicnicFilter from './PicnicFilter/PicnicFilter';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';

const Picnic = () => {
  const { user } = useUserRights();
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [list, setList] = useState('官方活動');
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(0);

  const getUser = async (apiurl) => {
    let response = await axios.get(apiurl, { withCredentials: true });
    setData(response.data.result);
    setLastPage(response.data.pagination.lastPage);
  };

  useEffect(() => {
    let apiurl = '';
    (async () => {
      if (display === 1) {
        apiurl = `${API_URL}/camping/userJoin?page=${pageNow}`;
      } else if (display === 2) {
        apiurl = `${API_URL}/camping/userCollect?page=${pageNow}`;
      } else {
        apiurl = `${API_URL}/picnic/official/memberCollect`;
      }
      getUser(apiurl);
    })();
  }, [display, pageNow]);

  return (
    <>
      <h3>野餐活動</h3>
      <div className="user_activity">
        <PicnicFilter list={list} setList={setList} />
        <PicnicTable />
        <PaginationBar />
      </div>
    </>
  );
};

export default Picnic;
