import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/public_component/Header';
import './styles/style.css';

function App() {
  return (
    <>
      <Header />
      <Routes>{/* <Route path="/" element={<Homepage />} /> */}</Routes>
    </>
  );
}

export default App;
