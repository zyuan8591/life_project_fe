import 'normalize.css';
import ActivityMain from './components/activity/ActivityMain';
import CampingMain from './components/camping/camping_main/CampingMain';
import CampingDetailPage from './components/camping/camping_detail/CampingDetailPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import News from './components/news/News';
import './styles/style.scss';
import Users from './components/Users';
import Login from './components/Login/loginPage';
import Signup from './components/Login/Signup';
import Recipes from './components/recipe/Recipes';
import ProductList from './components/product/product_list/ProductList';
import ProductDetail from './components/product/product_detail/ProductDetail';
import RecipeDetail from './components/recipe_detail/RecipeDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/activity" element={<ActivityMain />} />
        <Route path="/activity/camping" element={<CampingMain />} />
        <Route path="/activity/camping/1" element={<CampingDetailPage />} />
        <Route path="/news" element={<News />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
