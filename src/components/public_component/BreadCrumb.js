import React from 'react';
import { useLocation } from 'react-router-dom';

const BreadCrumb = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return <div>BreadCrumb</div>;
};

export default BreadCrumb;
