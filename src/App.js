import 'normalize.css';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
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
import Footer from './components/public_component/Footer';
import Header from './components/public_component/Header';
import BackToTop from './components/public_component/BackToTop';

function HeaderFooter() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderFooter />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/recipes" element={<Recipes />} />
        </Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/login/*" element={<Login />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
