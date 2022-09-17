import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';

const ShowPassword = ({ eye, setEye, name }) => {
  function clickEye() {
    let newEye = { ...eye };
    newEye[name] = newEye[name] ? false : true;
    setEye(newEye);
  }

  return (
    <>
      <div className="eyegroup" onClick={clickEye}>
        <IconContext.Provider value={{ className: 'eye' }}>
          {eye[name] ? <FaRegEye /> : <RiEyeCloseLine />}
        </IconContext.Provider>
      </div>
    </>
  );
};

export default ShowPassword;
