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
  const [data, setData] = useState([
    {
      titele: '露營Fun輕鬆',
      activity_date: '2022-04-18',
      place: '勤美學',
      activity_state: '報名中',
    },
    {
      titele: '露營Fun輕鬆',
      activity_date: '2022-04-18',
      place: '勤美學',
      activity_state: '報名中',
    },
  ]);

  useEffect(() => {
    try {
      let getUser = async () => {
        let response = await axios.get(`${API_URL}/camping?id=${user.id}`, {
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
