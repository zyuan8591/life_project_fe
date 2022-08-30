import React, { useState } from 'react';
import '../../styles/Users/Users.scss';
import Nav from './Nav/Nav';
// import Content from './Content/Content';
import Account from './Content/Account/Account';
import Password from './Content/Password/Password';
import { Routes, Route, Link } from 'react-router-dom';

const index = () => {
  return (
    <div className="users">
      <Nav />
      <div className="content">
        {/* <Account /> */}
        <Routes>
          <Route path="/account" element={<Account />} />
          <Route path="/password" element={<Password />} />
        </Routes>
      </div>

      <div className="box"></div>
    </div>
  );
};

export default index;
