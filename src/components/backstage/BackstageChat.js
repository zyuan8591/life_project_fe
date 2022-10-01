import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { API_URL, API_URL_IMG } from '../../utils/config';
import axios from 'axios';
import classes from '../../styles/moduleCss/backstage/backstageChat.module.scss';
import { Input } from 'antd';
import { IconContext } from 'react-icons';
import { AiOutlineSend, AiOutlineClose } from 'react-icons/ai';
import BackstageHeader from '../public_component/BackstageHeader';
import moment from 'moment';
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
    let msg = [];
    if (userNow === 0) {
      msg = messages.filter((msg) => {
        return msg.user_id === 0 && msg.target_id === 1;
      });
    }
    if (userNow !== 0) {
      msg = messages.filter((msg) => {
        return msg.user_id === userNow || msg.target_id === userNow;
      });
    }
    setDisplayMsg(msg);
  }, [userNow, messages]);

  // SET DISPLAY USER & MESSAGE
  useEffect(() => {
    let tmp = [];
    let newDisplayUser = [];
    if (messages) {
      messages.filter((d) => {
        if (tmp.includes(d.user_id) || tmp.includes(d.target_id)) return false;
        if (d.user_id === 0) {
          newDisplayUser.push({
            ...userData[d.target_id - 1],
            msg: d.content,
            time: d.time,
          });
          tmp.push(d.target_id);
        }
        if (d.target_id === 0) {
          newDisplayUser.push({
            ...userData[d.user_id - 1],
            msg: d.content,
            time: d.time,
          });
          tmp.push(d.user_id);
        }
      });
      setDisplayUser([
        { id: 0, name: 'LIFE', photo: '/img/user/user_img/life.png' },
        ...newDisplayUser,
      ]);
    }
  }, [messages]);

  // CONNECT & GET MSG FROM USER
  useEffect(() => {
    if (!socket) {
      let ws = io('http://localhost:3001');
      setSocket(ws);
      // listen to life - msg from user
      ws.on('life', (message) => {
        let { id, msg, time } = message;
        setMessages(function (prevState, props) {
          return [
            { id: uuidv4(), user_id: id, target_id: 0, content: msg, time },
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

  // SEND MSG TO USER
  const submitMsg = (e) => {
    e.preventDefault();
    let time = moment().format('HH:mm');
    if (message) {
      socket.emit('life', { id: userNow, msg: message, time });
      setMessages([
        {
          id: uuidv4(),
          user_id: 0,
          target_id: userNow,
          content: message,
          time,
        },
        ...messages,
      ]);
      setMessage('');
    }
  };

  // Broadcast Msg to Every User
  const broadcastSubmit = (e) => {
    e.preventDefault();
    let newMessages = [...messages];
    let time = moment().format('HH:mm');
    if (message) {
      for (let i = 1; i < userData.length; i++) {
        socket.emit('life', { id: i, msg: message, time });
        newMessages.unshift({
          id: uuidv4(),
          user_id: 0,
          target_id: i,
          content: message,
          time,
        });
      }
    }
    setMessages(newMessages);
    setMessage('');
  };

  return (
    <>
      <BackstageHeader />
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
              {console.log(user)}
              {/* user avatar */}
              <figure
                className={`${classes.userAvatarContainer}
                ${parseInt(user.id) === 0 && 'p-2'}
                `}
              >
                <img
                  src={
                    parseInt(user.id) === 0
                      ? user.photo
                      : `${API_URL_IMG}${user.photo}`
                  }
                  alt={user.name}
                  className="objectContain"
                />
              </figure>
              {/* userName & userMsg */}
              <div className={classes.msgInfo}>
                <div>{user.name}</div>
                <div className={classes.msg}>{user.msg}</div>
                <div className={classes.msgInfoTime}>{user.time}</div>
              </div>
            </div>
          ))}
        </section>
        {/* msg box section ===============================================*/}
        <section className={classes.msgBox}>
          <>
            {/* chatroom title */}
            <div className={classes.title}>
              {!!userNow && userData[userNow - 1].name}
            </div>
            {/* chatroom */}
            <ul className={`d-flex flex-column-reverse ${classes.msgList}`}>
              {displayMsg.map((msg) => (
                <li
                  key={msg.id}
                  className={`${
                    msg.user_id === 0 ? `align-self-end` : classes.bgMsg
                  } `}
                >
                  <span>{msg.content}</span>
                  <span
                    className={`${
                      msg.user_id === 0
                        ? classes.msgListTimeAdmin
                        : classes.msgListTime
                    }`}
                  >
                    {msg.time}
                  </span>
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (userNow !== 0) submitMsg(e);
                    if (userNow === 0) broadcastSubmit(e);
                  }
                }}
              />
              <IconContext.Provider value={{ color: '#444', size: '1.6rem' }}>
                <button
                  className="flexCenter bg-transparent border-0"
                  onClick={(e) => {
                    if (userNow !== 0) submitMsg(e);
                    if (userNow === 0) broadcastSubmit(e);
                  }}
                >
                  <AiOutlineSend />
                </button>
              </IconContext.Provider>
            </div>
          </>
        </section>
      </div>
    </>
  );
};

export default BackstageChat;
