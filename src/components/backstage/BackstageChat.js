import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { API_URL, API_URL_IMG } from '../../utils/config';
import axios from 'axios';

const BackstageChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '28d745cb-0038-4aba-9881-5fe123bf7598',
      role: 'life',
      content: '1:456',
    },
    {
      id: 'f3ddea23-e89c-495d-899d-37083997a40c',
      role: 'life',
      content: '1:123',
    },
    {
      id: 'bee46ffb-1635-4776-a997-209980ffc3fb',
      role: 'life',
      content: '1:456',
    },
  ]);
  // cosnt[(user, setUser)] = useState(null);
  const [socket, setSocket] = useState(null);

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
            { id: uuidv4(), role: 'life', content: `${id}:${msg}` },
            ...prevState,
          ];
        });
      });
    }
    (async () => {
      let result = await axios.get(`${API_URL}/user/all`);
      console.log(result);
    })();
  }, []);

  const submitMsg = (e) => {
    e.preventDefault();
    // 把訊息送到後端去
    if (message) {
      socket.emit('user1', { id: 0, msg: message });
      setMessages([
        { id: uuidv4(), role: 'user', content: message },
        ...messages,
      ]);
      setMessage('');
    }
  };
  console.log(messages);
  return (
    <div>
      {/* {messages.map((msg) => (
        <div key={msg.id}>{msg.content}</div>
      ))} */}
      <div className="userList"></div>
    </div>
  );
};

export default BackstageChat;
