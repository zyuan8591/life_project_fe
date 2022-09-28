import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { API_URL, API_URL_IMG } from '../../utils/config';
import axios from 'axios';
import classes from '../../styles/moduleCss/backstage/backstageChat.module.scss';
import { Input } from 'antd';
import { IconContext } from 'react-icons';
import { AiOutlineSend } from 'react-icons/ai';
const { TextArea } = Input;

const BackstageChat = () => {
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState([]);

  const [userNow, setUserNow] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [displayMsg, setDisplayMsg] = useState([]);
  const [displayUser, setDisplayUser] = useState([]);

  // UPDATE DISPLAY CHATROOM at RIGHT SECTION
  useEffect(() => {
    let msg = messages.filter((msg) => {
      return msg.user_id === userNow || msg.target_id === userNow;
    });
    setDisplayMsg(msg);
  }, [userNow, messages]);

  useEffect(() => {
    console.log(messages);
    let tmp = [];
    let newDisplayUser = [];
    if (messages) {
      messages.filter((d) => {
        if (tmp.includes(d.user_id) || d.user_id === 0) return false;
        newDisplayUser.push({ ...userData[d.user_id - 1], msg: d.content });
        tmp.push(d.user_id);
      });
      console.log(newDisplayUser);
      setDisplayUser(newDisplayUser);
    }
  }, [messages]);

  const setUser = (id) => {
    let newUserDisplay = [...displayUser];
    if (newUserDisplay.length === 0) {
      newUserDisplay.push(userData[id - 1]);
      console.log(newUserDisplay);
      return setDisplayUser(newUserDisplay);
    }
    userData.map((user) => {});
  };

  // connect & get msg from user
  useEffect(() => {
    // connect with socket io
    if (!socket) {
      let ws = io('http://localhost:3001');
      setSocket(ws);
      // listen to life - msg from user
      ws.on('life', (message) => {
        console.log(message);
        let { id, msg } = message;
        setMessages(function (prevState, props) {
          return [
            { id: uuidv4(), user_id: id, target_id: 0, content: msg },
            ...prevState,
          ];
        });
      });
    }
    (async () => {
      let result = await axios.get(`${API_URL}/user/all`);
      setUserData(result.data);
    })();
  }, []);
  // send msg to user
  const submitMsg = (e) => {
    e.preventDefault();
    // 把訊息送到後端去
    if (message) {
      socket.emit('life', { id: userNow, msg: message });
      setMessages([
        { id: uuidv4(), user_id: 0, target_id: userNow, content: message },
        ...messages,
      ]);
      setMessage('');
    }
  };

  return (
    <div className={classes.container}>
      {/* chatroom list ================================================*/}
      <section className={classes.userList}>
        {displayUser.map((user) => (
          <div
            key={user.user_id}
            className={`${classes.userMsg} ${
              userNow === user.id && classes.active
            }`}
            onClick={() => setUserNow(user.id)}
          >
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
              <div>{user.msg}</div>
            </div>
          </div>
        ))}
      </section>
      {/* msg box section ===============================================*/}
      <section className={classes.msgBox}>
        {!!userNow && (
          <>
            {/* chatroom title */}
            <div className={classes.title}>
              {!!userNow && userData[userNow - 1].name}
            </div>
            {/* <div> */}
            {/* chatroom */}
            <ul className={`d-flex flex-column-reverse ${classes.msgList}`}>
              {displayMsg.map((msg) => (
                <li
                  key={msg.id}
                  className={`${
                    msg.user_id === 0 ? `align-self-end` : classes.bgMsg
                  } `}
                >
                  {msg.content}
                </li>
              ))}
            </ul>
            {/* </div> */}
            {/* chat msg box */}
            <div className={classes.msgSendBox}>
              <TextArea
                placeholder="輸入訊息"
                value={message}
                autoSize={{ minRows: 1, maxRows: 3 }}
                onChange={(e) => setMessage(e.target.value)}
                className="w-100"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    submitMsg(e);
                  }
                }}
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
          </>
        )}
      </section>
      {/* ))} */}
    </div>
  );
};

export default BackstageChat;
