import 'normalize.css';
import ActivityMain from './components/activity/ActivityMain';
import CampingMain from './components/camping/camping_main/CampingMain';
import CampingDetailPage from './components/camping/camping_detail/CampingDetailPage';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import News from './components/news/News';
import Signin from './components/Login/Signin';
import Users from './components/Users';
import './styles/style.scss';
import PicnicIndex from './components/picnic/picnic_main/PicnicIndex';
import PicnicOffical from './components/picnic/picnic_official/PicnicOffical';
import PicnicOfficalDetail from './components/picnic/picnic_official/picnic_offical_detail/IndexOfficalDetail';
import IndexPrivateDetail from './components/picnic/private_pincnic/private_pincnic_detail/IndexPrivateDetail';
import CreatePincnic from './components/picnic/private_pincnic/CreatePincnic';
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
import Login from './components/Login/Login';
import { UserRights } from './usecontext/UserRights';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config';
import Contact from './components/contact/Contact';
import ScrollToTop from './components/public_component/ScrollToTop';
import OrderStep from './components/Orders/OrderStep';

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
  //如果user有資料代表登入，如果為null代表未登入
  const [user, setUser] = useState(null);
  useEffect(() => {
    let getUser = async () => {
      let response = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      setUser(response.data);
    };
    getUser();
  }, []);

  return (
    <>
      <UserRights.Provider value={{ user, setUser }}>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<HeaderFooter />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/orderstep" element={<OrderStep />} />
              <Route path="/news" element={<News />} />
            </Route>
            {/* <Route path="/recipes/:recipeId" element={<RecipeDetail />} /> */}
            <Route path="/recipeDetail" element={<RecipeDetail />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/activity/picnic" element={<PicnicIndex />} />
            <Route
              path="/activity/picnic/official"
              element={<PicnicOffical />}
            />
            <Route
              path="/activity/picnic/official/:id"
              element={<PicnicOfficalDetail />}
            />
            <Route
              path="/activity/picnic/group/:id"
              element={<IndexPrivateDetail />}
            />
            <Route path="/activity/picnic/create" element={<CreatePincnic />} />
            <Route path="/Users/*" element={<Users />} />
            <Route path="/users/" element={<Users />}>
              <Route path="/users/account" element={<Account />} />
              <Route path="/users/password" element={<Password />} />
              <Route path="/users/order" element={<Order />} />
              <Route path="/users/points" element={<Points />} />
              <Route path="/users/pinic" element={<Pinic />} />
              <Route path="/users/recipe" element={<Recipe />} />
            </Route>
            <Route path="/signin/" element={<Signin />}>
              <Route path="/signin/login" element={<Login />} />
              <Route path="/signin/signup" element={<Signup />} />
            </Route>
            <Route path="/activity" element={<ActivityMain />} />
            <Route path="/activity/camping" element={<CampingMain />} />
            <Route
              path="/activity/camping/:id"
              element={<CampingDetailPage />}
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </ScrollToTop>
      </UserRights.Provider>
    </>
  );
}

export default App;
