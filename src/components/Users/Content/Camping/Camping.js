import React, { useState, useEffect } from 'react';
import PaginationBar from '../../../public_component/PaginationBar';
import CampingTable from './CampingTable/CampingTable';
import CapmingFilter from './CapmingFilter/CapmingFilter';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';

const Camping = () => {
  const { user } = useUserRights();
  const [list, setList] = useState('官方活動');
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      let getUser = async () => {
        let response = await axios.get(`${API_URL}/getUserJoin`, {
          withCredentials: true,
        });
        // setData(response.data);]
        console.log(response.data);
      };
      getUser();
    } catch (e) {
      console.error(e.response.data.msg);
    }
  }, []);

  return (
    <>
      <h3>露營活動</h3>
      <div className="user_activity">
        <CapmingFilter list={list} setList={setList} />
        <CampingTable data={data} />
        <PaginationBar />
      </div>
    </>
  );
};

export default Camping;
