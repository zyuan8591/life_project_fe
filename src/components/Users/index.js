import React, { useState } from 'react';
import '../../styles/Users/Users.scss';
import Header from '../public_component/Header';
import Nav from './Nav/Nav';
// import Content from './Content/Content';

import { Routes, Route, Outlet } from 'react-router-dom';

const index = () => {
  return (
    <>
      <Header />
      <div className="users">
        <Nav />
        <div className="content">S
          {/* <Account /> */}
          <Outlet />
        </div>

        <div className="box"></div>
      </div>
    </>
  );
};

export default index;
