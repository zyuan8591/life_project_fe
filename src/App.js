import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/public_component/Header';
import Footer from './components/public_component/Footer';
import './styles/style.scss';

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
      <div className="temp"></div>
      <Footer />
    </>
  );
}

export default App;
