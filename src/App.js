import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/public_component/Header';
import './styles/style.css';

function App() {
  const [scrollDown, setScrollDown] = useState(false);

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });

  return (
    <>
      <Header scrollDown={scrollDown} />
      <Routes>{/* <Route path="/" element={<Homepage />} /> */}</Routes>
    </>
  );
}

export default App;
