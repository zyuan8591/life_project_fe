import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/activity/_notification.scss';
import { IconContext } from 'react-icons';

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
  // console.log(position);
  return linkTo !== '' ? (
    <div className="notificationContainer">
      <div className={`contain textBox`}>
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
    <IconContext.Provider value={{ color: '#1F9998', size: `${iconSize}em` }}>
      <div className="notificationContainer">
        <div
          className="contain noTextBox"
          style={{
            left: `${left}px`,
            bottom: `${bottom}px`,
            right: `${right}px`,
            top: `${top}px`,
          }}
        >
          {children}
          <div className="message">{contaninText}</div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Notification;
