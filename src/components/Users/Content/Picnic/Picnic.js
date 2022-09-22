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
    setData(response.data.joinResult);
    setLastPage(response.data.pagination.lastPage);
  };
  console.log('data', data);
  useEffect(() => {
    let apiurl = '';
    (async () => {
      switch (display) {
        case 1:
          apiurl = `${API_URL}/picnic/official/memberJoin`;
          break;
        case 2:
          apiurl = `${API_URL}/picnic/official/memberJoin`;
          break;
        case 3:
          apiurl = `${API_URL}/picnic/official/memberJoin`;
          break;
        case 4:
          apiurl = `${API_URL}/official/memberCollect`;
          break;
        default:
          apiurl = `${API_URL}/picnic/official/memberJoin??page=${pageNow}`;
          break;
      }
      getUser(apiurl);
    })();
  }, [display, pageNow]);

  return (
    <>
      <h3>野餐活動</h3>
      <div className="user_activity">
        <PicnicFilter list={list} setList={setList} setDisplay={setDisplay} />
        <PicnicTable data={data} display={display} />
        <PaginationBar
          lastPage={lastPage}
          pageNow={pageNow}
          setPageNow={setPageNow}
        />
      </div>
    </>
  );
};

export default Picnic;
