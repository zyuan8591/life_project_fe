import React, { useState } from 'react';
import PaginationBar from '../../../public_component/PaginationBar';
import PicnicTable from './PicnicTable/PicnicTable';
import PicnicFilter from './PicnicFilter/PicnicFilter';

const Picnic = () => {
  const [list, setList] = useState('官方活動');

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
