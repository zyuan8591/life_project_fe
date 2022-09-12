import React from 'react';
import '../../styles/Users/Users.scss';
import Header from '../public_component/Header';
import Nav from './Nav/Nav';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const index = () => {
  return (
    <div className="users">
      <Header />
      <div className="users_container">
        <Nav />
        <div className="content ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default index;
