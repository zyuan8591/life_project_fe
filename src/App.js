import 'normalize.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import News from './components/news/News';
import './styles/style.scss';
import Users from './components/Users';
import Login from './components/Login/loginPage';
import Recipes from './components/recipe/Recipes';
import ProductList from './components/product/product_list/ProductList';
import ProductDetail from './components/product/product_detail/ProductDetail';
function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/news" element={<News />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </>
  );
}

export default App;
