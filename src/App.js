import 'normalize.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import './styles/style.scss';
import PicnicIndex from './components/picnic/picnic_main/PicnicIndex';
import PicnicOffical from './components/picnic/picnic_official/PicnicOffical';
import Users from './components/Users';
import Login from './components/Login/loginPage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/activity/picnic" element={<PicnicIndex />} />
        <Route path="/activity/picnic/official" element={<PicnicOffical />} />
        <Route path="/Users/*" element={<Users />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
