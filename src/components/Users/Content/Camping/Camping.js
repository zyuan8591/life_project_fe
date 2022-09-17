import React, { useState } from 'react';
import PaginationBar from '../../../public_component/PaginationBar';
import CampingTable from './CampingTable/CampingTable';
import CapmingFilter from './CapmingFilter/CapmingFilter';

const Camping = () => {
  const [list, setList] = useState('官方活動');

  return (
    <>
      <h3>露營活動</h3>
      <div className="user_activity">
        <CapmingFilter list={list} setList={setList} />
        <CampingTable />
        <PaginationBar />
      </div>
    </>
  );
};

export default Camping;
