import 'normalize.css';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import News from './components/news/News';
import './styles/style.scss';
import Users from './components/Users';
import LoginPage from './components/Login/loginPage';
import Recipes from './components/recipe/Recipes';
import ProductList from './components/product/product_list/ProductList';
import ProductDetail from './components/product/product_detail/ProductDetail';
import RecipeDetail from './components/recipe_detail/RecipeDetail';
import Footer from './components/public_component/Footer';
import Header from './components/public_component/Header';
import BackToTop from './components/public_component/BackToTop';
import Account from './components/Users/Content/Account/Account';
import Password from './components/Users/Content/Password/Password';
import Order from './components/Users/Content/Order/Order';
import Points from './components/Users/Content/Points/Points';
import Pinic from './components/Users/Content/Picnic/Pinic';
import Recipe from './components/Users/Content/Recipe/Recipe';
import Signup from './components/Login/Signup';
import Login from './components/Login/login';
import Contact from './components/contact/Contact';

function HeaderFooter() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Contact />
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
        <Route path="/users/" element={<Users />}>
          <Route path="/users/account" element={<Account />} />
          <Route path="/users/password" element={<Password />} />
          <Route path="/users/order" element={<Order />} />
          <Route path="/users/points" element={<Points />} />
          <Route path="/users/pinic" element={<Pinic />} />
          <Route path="/users/recipe" element={<Recipe />} />
        </Route>
        <Route path="/login/" element={<LoginPage />}>
          <Route path="/login/" element=<Login /> />
          <Route path="/login/signup" element={<Signup />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
