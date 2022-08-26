import 'normalize.css';
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/public_component/Header';
import Footer from './components/public_component/Footer';
import BackToTop from './components/public_component/BackToTop';
import './styles/style.scss';
import ProductList from './components/product/product-list/ProductList';

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
      <Routes>
        <Route path="/products" element={<ProductList />} />
      </Routes>
      <div className="temp"></div>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
