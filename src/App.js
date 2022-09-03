import 'normalize.css';
import ActivityMain from './components/activity/ActivityMain';
import CampingMain from './components/camping/camping_main/CampingMain';
import CampingDetailPage from './components/camping/camping_detail/CampingDetailPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import './styles/style.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/activity" element={<ActivityMain />} />
        <Route path="/activity/camping" element={<CampingMain />} />
        <Route path="/activity/camping/1" element={<CampingDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
