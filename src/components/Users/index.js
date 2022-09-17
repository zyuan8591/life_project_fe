import React, { useState } from 'react';
import '../../styles/Users/Users.scss';
import Header from '../public_component/Header';
import Nav from './Nav/Nav';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useUserRights } from '../../usecontext/UserRights';

const Index = () => {
  //TODO:排版結束改成跳轉回首頁
  const { user, setUser } = useUserRights();
  if (!user) {
    return <Navigate to="/" />;
  }
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

export default Index;
