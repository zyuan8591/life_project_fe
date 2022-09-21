import React, { useState, useEffect } from 'react';
import classes from '../../styles/moduleCss/contact/contact.module.scss';
import { AiOutlineMinus, AiOutlineClose, AiOutlineSend } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import io from 'socket.io-client';
import { useUserRights } from '../../usecontext/UserRights';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineComment } from 'react-icons/ai';

const Contact = () => {
  // check is chat or not
  const [chat, setChat] = useState(false);
  // const { user, setUser } = useUserRights();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 加上是否已經連線的檢查
    if (!socket) {
      let ws = io('http://localhost:3001');
      setSocket(ws);
      ws.on('chat', (msg) => {
        setMessages(function (prevState, props) {
          return [{ id: uuidv4(), role: 'life', content: msg }, ...prevState];
        });
      });
    }
  }, []);

  function messageSubmit() {
    // 把訊息送到後端去
    if (message) {
      socket.emit('life', message);
      setMessages([
        { id: uuidv4(), role: 'user', content: message },
        ...messages,
      ]);
      setMessage('');
    }
  }

  function buttonSubmit(e) {
    e.preventDefault();
    messageSubmit();
  }
  function enterSubmit(e) {
    if (e.keyCode === 13) {
      messageSubmit();
    }
  }

  const Message = ({ role, msg }) => {
    return (
      <div
        className={`px-3 py-1 mb-2 rounded-pill ${
          role === 'user' ? `align-self-end` : ''
        } bg-white ${classes.myMsg} ${classes.msg}`}
      >
        {msg}
      </div>
    );
  };

  return (
    <>
      <div
        className={`${classes.contactAvator} cursorPointer position-fixed end-0 rounded-circle me-3 flexCenter`}
        onClick={() => setChat(!chat)}
      >
        <IconContext.Provider value={{ color: '#817161', size: '2.5rem' }}>
          <AiOutlineComment />
        </IconContext.Provider>
      </div>
      {/* Chat box */}
      {chat && (
        <div
          className={`${classes.chatBox} position-fixed rounded-top shadow d-flex flex-column`}
        >
          {/* Chat header */}
          <div
            className={`${classes.chatBoxHeader} px-3 py-1 d-flex justify-content-between align-items-center`}
          >
            <span className="life fs-2 text-white userSelectNone">LIFE</span>
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
            {messages.map((m) => {
              return (
                <Message key={m.id} role={m.role} msg={m.content}></Message>
              );
            })}
          </div>

          {/* Chat type msg */}
          <div
            className={`${classes.chatSendMsg} mb-2 position-absolute bottom-0 start-0 d-flex align-items-center justify-content-evenly w-100`}
          >
            <input
              type="text"
              className="rounded-pill px-3 py-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={enterSubmit}
            />
            <IconContext.Provider value={{ color: '#444', size: '1.6rem' }}>
              <button
                className="flexCenter bg-transparent border-0"
                onClick={buttonSubmit}
              >
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
