import React, { useState } from 'react';
import classes from '../../styles/moduleCss/contact/contact.module.scss';
import { AiOutlineMinus, AiOutlineClose, AiOutlineSend } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const Contact = () => {
  const [chat, setChat] = useState(false);

  const Message = ({ person, msg }) => {
    return (
      <div
        className={`px-3 py-1 mb-2 rounded-pill ${
          person === 'user' ? `align-self-end` : ''
        } bg-white ${classes.myMsg} ${classes.msg}`}
      >
        {msg}
      </div>
    );
  };

  return (
    <>
      <div
        className={`${classes.contactAvator} cursorPointer position-fixed end-0 rounded-circle me-3`}
        onClick={() => setChat(true)}
      >
        <img
          src="/img/index/chatRoomImg.png"
          alt="chatRoomImg"
          className="objectContain"
        />
      </div>
      {/* Chat box */}
      {chat && (
        <div
          className={`${classes.chatBox} position-fixed bottom-0 rounded-top shadow d-flex flex-column`}
        >
          {/* Chat header */}
          <div
            className={`${classes.chatBoxHeader} px-3 py-1 d-flex justify-content-between align-items-center`}
          >
            <span className="life fs-2 text-white">LIFE</span>
            <div className={`${classes.chatBoxControl} d-flex gap-2`}>
              <IconContext.Provider value={{ color: 'white', size: '1.5rem' }}>
                <button
                  className="flexCenter bg-transparent border-0"
                  onClick={() => setChat(false)}
                >
                  <AiOutlineMinus />
                </button>
                <button
                  className="flexCenter bg-transparent border-0"
                  onClick={() => setChat(false)}
                >
                  <AiOutlineClose />
                </button>
              </IconContext.Provider>
            </div>
          </div>
          {/* Display Msg */}
          <div
            className={`${classes.chatDisplay} mw-100 ms-4 d-flex flex-column-reverse py-3 pe-3 overflow-auto`}
          >
            <Message person="user" msg="456" />
            <Message person="user" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
            <Message person="life" msg="123" />
          </div>

          {/* Chat type msg */}
          <div
            className={`${classes.chatSendMsg} mb-2 position-absolute bottom-0 start-0 d-flex align-items-center justify-content-evenly w-100`}
          >
            <input type="text" className="rounded-pill px-3 py-1" />
            <IconContext.Provider value={{ color: '#444', size: '1.6rem' }}>
              <button className="flexCenter bg-transparent border-0">
                <AiOutlineSend />
              </button>
            </IconContext.Provider>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
