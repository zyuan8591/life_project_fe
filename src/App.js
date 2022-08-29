import 'normalize.css';
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/public_component/Header';
import Footer from './components/public_component/Footer';
import Homepage from './components/index/Homepage';
import BackToTop from './components/public_component/BackToTop';
import './styles/style.scss';
import PicnicIndex from './components/picnic/picnic_main/PicnicIndex';

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
      <Routes>
        <Route path="/picnic" element={<PicnicIndex />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
