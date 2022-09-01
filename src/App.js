import 'normalize.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import News from './components/news/News';
import './styles/style.scss';
import Users from './components/Users';
import Login from './components/Login/loginPage';
import Recipes from './components/recipe/Recipes';
import ProductList from './components/product/product-list/ProductList';
import RecipeDetail from './components/recipe/RecipeDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/news" element={<News />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
