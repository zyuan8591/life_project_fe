import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { API_URL, API_URL_IMG } from '../../utils/config';
import axios from 'axios';
import classes from '../../styles/moduleCss/backstage/backstageChat.module.scss';
import { Input } from 'antd';
import { IconContext } from 'react-icons';
import { AiOutlineSend } from 'react-icons/ai';

const BackstageChat = () => {
  const { TextArea } = Input;
  const [userNow, setUserNow] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '28d745cb-0038-4aba-9881-5fe123bf7598',
      user_id: 1,
      content: '你好 1',
    },
    {
      id: 'f3ddea23-e89c-495d-899d-37083997a40c',
      user_id: 1,
      content: '你好 2',
    },
    {
      id: 'bee46ffb-1635-4776-a997-209980ffc3fb',
      user_id: 3,
      content: '你好 3',
    },
    {
      id: 'bee46ffb-1635-4776-a997-209980ffc3fb',
      user_id: 0,
      // target_id: 5,
      content: '你好 4',
    },
  ]);
  const [displayMsg, setDisplayMsg] = useState([]);
  useEffect(() => {
    let msg = messages.filter((msg) => {
      return msg.user_id === parseInt(userNow) || msg.user_id === 0;
    });
    setDisplayMsg(msg);
  }, [userNow, messages]);

  // cosnt[(user, setUser)] = useState(null);
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // 加上是否已經連線的檢查
    if (!socket) {
      let ws = io('http://localhost:3001');
      setSocket(ws);
      ws.on('life', (message) => {
        console.log(message);
        let { id, msg } = message;
        setMessages(function (prevState, props) {
          return [
            { id: uuidv4(), user_id: 'life', content: `${id}:${msg}` },
            ...prevState,
          ];
        });
      });
    }
    (async () => {
      let result = await axios.get(`${API_URL}/user/all`);
      console.log(result.data);
      setUserData(result.data);
    })();
  }, []);

  const submitMsg = (e) => {
    e.preventDefault();
    // 把訊息送到後端去
    if (message) {
      // socket.emit('user1', { id: 0, msg: message });
      setMessages([
        { id: uuidv4(), user_id: 0, content: message },
        ...messages,
      ]);
      setMessage('');
    }
  };

  return (
    <div className={classes.container}>
      {/* chatroom list ================================================*/}
      <section className={classes.userList}>
        {userData.map((user) => (
          <div className={classes.userMsg} onClick={() => setUserNow(user.id)}>
            {/* user avatar */}
            <figure className={classes.userAvatarContainer}>
              <img
                src={`${API_URL_IMG}${user.photo}`}
                alt={user.name}
                className="objectContain"
              />
            </figure>
            {/* userName & userMsg */}
            <div className={classes.msgInfo}>
              <div>{user.name}</div>
              <div>123456</div>
            </div>
          </div>
        ))}
      </section>
      {/* msg box section ===============================================*/}
      <section className={classes.msgBox}>
        {/* chatroom title */}
        <div className={classes.title}>皮卡啾 {userNow}</div>
        <div>
          {/* chatroom */}
          <ul className={`d-flex flex-column-reverse ${classes.msgList}`}>
            {displayMsg.map((msg) => (
              <li
                className={`${
                  msg.user_id === 0 ? `align-self-end` : classes.bgMsg
                } `}
              >
                {msg.content}
              </li>
            ))}
          </ul>
          {/* chat msg box */}
          <div className={classes.msgSendBox}>
            <TextArea
              placeholder="輸入訊息"
              value={message}
              autoSize={{ minRows: 1, maxRows: 3 }}
              onChange={(e) => setMessage(e.target.value)}
              className="w-100"
            />
            <IconContext.Provider value={{ color: '#444', size: '1.6rem' }}>
              <button
                className="flexCenter bg-transparent border-0"
                onClick={(e) => submitMsg(e)}
              >
                <AiOutlineSend />
              </button>
            </IconContext.Provider>
          </div>
        </div>
      </section>
      {/* ))} */}
    </div>
  );
};

export default BackstageChat;
