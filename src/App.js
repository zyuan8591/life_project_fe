import 'normalize.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import News from './components/news/News';
import './styles/style.scss';
import Users from './components/Users';
import Login from './components/Login/loginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/news" element={<News />} />
        <Route path="/Users/*" element={<Users />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
