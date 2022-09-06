import 'normalize.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import News from './components/news/News';
import Login from './components/Login/loginPage';
import Users from './components/Users';
import './styles/style.scss';
import Recipes from './components/recipe/Recipes';
import ProductList from './components/product/product-list/ProductList';
import OrderStep from './components/Orders/OrderStep';

function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/orderstep" element={<OrderStep />} />
        <Route path="/news" element={<News />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </>
  );
}

export default App;
