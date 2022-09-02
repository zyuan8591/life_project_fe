import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const ShowPassword = () => {
  const [eye, setEye] = useState(false);
  function clickEye() {
    setEye(eye ? false : true);
  }
  return (
    <>
      <input type={eye ? 'text' : 'password'} />
      <div className="eye " onClick={clickEye}>
        <IconContext.Provider value={{ className: 'eye' }}>
          {eye ? <FaRegEye /> : <FaRegEyeSlash />}
        </IconContext.Provider>
      </div>
    </>
  );
};

export default ShowPassword;
