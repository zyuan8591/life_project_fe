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
import Caping from './components/Users/Content/Caping/Caping';
import Signup from './components/Login/Signup';
import Login from './components/Login/login';
import { UserRights } from './usecontext/UserRights';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config';

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
  //如果user有資料代表登入，如果為null代表未登入
  const [user, setUser] = useState(null);
  useEffect(() => {
    let getUser = async () => {
      let response = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      setUser(response.data);
      console.log('user', response.data);
    };
    getUser();
  }, []);

  return (
    <>
      <UserRights.Provider value={{ user, setUser }}>
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
            <Route path="account" element={<Account />} />
            <Route path="password" element={<Password />} />
            <Route path="order" element={<Order />} />
            <Route path="points" element={<Points />} />
            <Route path="pinic" element={<Pinic />} />
            <Route path="recipe" element={<Recipe />} />
            <Route path="Caping" element={<Caping />} />
          </Route>
          <Route path="/login/" element={<LoginPage />}>
            <Route path="" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </UserRights.Provider>
    </>
  );
}

export default App;
