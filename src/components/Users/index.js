import React, { useState } from 'react';
import '../../styles/Users/Users.scss';
import Header from '../public_component/Header';
import Nav from './Nav/Nav';
// import Content from './Content/Content';
import Account from './Content/Account/Account';
import Password from './Content/Password/Password';
import Order from './Content/Order/Order';
import Points from './Content/Points/Points';
import Pinic from './Content/Picnic/Pinic';
import { Routes, Route, Link } from 'react-router-dom';

const index = () => {
  return (
    <>
      <Header />
      <div className="users">
        <Nav />
        <div className="content">
          {/* <Account /> */}
          <Routes>
            <Route path="/account" element={<Account />} />
            <Route path="/password" element={<Password />} />
            <Route path="/order" element={<Order />} />
            <Route path="/points" element={<Points />} />
            <Route path="/pinic" element={<Pinic />} />
          </Routes>
        </div>

        <div className="box"></div>
      </div>
    </>
  );
};

export default index;
