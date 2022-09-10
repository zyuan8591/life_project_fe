import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseLine,RiEyeLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';

const ShowPassword = ({ eye, setEye }) => {
  function clickEye() {
    setEye(eye ? false : true);
  }
  return (
    <>
      <div className="eyegroup" onClick={clickEye}>
        <IconContext.Provider value={{ className: 'eye' }}>
          {eye ? <FaRegEye /> : <RiEyeCloseLine />}
        </IconContext.Provider>
      </div>
    </>
  );
};

export default ShowPassword;
