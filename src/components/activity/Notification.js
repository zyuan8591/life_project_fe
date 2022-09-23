import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/activity/_notification.scss';
import { IconContext } from 'react-icons';
import { AiFillCloseCircle } from 'react-icons/ai';

function Notification({
  contaninText,
  linkTo = '',
  linkToText = '登入',
  setLoginBtn,
  left = 30,
  bottom = 0,
  right = '',
  top = '',
  iconSize = 2.5,
  children,
}) {
  const [show, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(true);
  }, []);

  // console.log(position);
  return linkTo !== '' ? (
    <div className="notificationContainer">
      <div
        className={`contain textBox opacity-0 ${
          show && 'opacity-100'
        } transition`}
      >
        <div className="msgText">{contaninText}</div>
        <div className="btns">
          <Link to={linkTo} className="confirmBtn">
            {linkToText}
          </Link>
          <button
            className="cancelBtn"
            onClick={() => {
              setLoginBtn(false);
            }}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`flexCenter noTextBox opacity-0 ${
        show && 'opacity-100 active'
      } transition `}
      style={{
        left: `${left}px`,
        bottom: `${bottom}px`,
        right: `${right}px`,
        top: `${top}px`,
      }}
    >
      <IconContext.Provider value={{ color: '#1F9998', size: `${iconSize}em` }}>
        {children}
      </IconContext.Provider>
      <div className="message">{contaninText}</div>
      <div
        className="position-absolute top-0 start-100 translate-middle cursorPointer"
        onClick={() => setIsShow(false)}
      >
        <IconContext.Provider
          value={{
            color: '#1F9998',
            size: `1.25rem`,
            className: 'toastClose',
          }}
        >
          <AiFillCloseCircle />
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Notification;
