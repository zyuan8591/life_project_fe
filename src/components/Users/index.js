import React from 'react';
import '../../styles/Users/Users.scss';
import Header from '../public_component/Header';
import Nav from './Nav/Nav';
// import Content from './Content/Content';

import { Outlet } from 'react-router-dom';

const index = () => {
  return (
    <>
      <Header />
      <div className="users">
        <Nav />
        <div className="content">
          <Outlet />
        </div>
        <div className="box"></div>
      </div>
    </>
  );
};

export default index;
