import 'normalize.css';
// import ActivityMain from './components/activity/ActivityMain';
import CampingMain from './components/camping/CampingMain';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import './styles/style.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/activity/camping" element={<CampingMain />} />
      </Routes>
    </>
  );
}

export default App;
