import 'normalize.css';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import News from './components/news/News';
import './styles/style.scss';
import Users from './components/Users';
import Login from './components/Login/loginPage';
import PicnicIndex from './components/picnic/picnic_main/PicnicIndex';
import PicnicOffical from './components/picnic/picnic_official/PicnicOffical';
import PicnicOfficalDetail from './components/picnic/picnic_official/picnic_offical_detail/IndexOfficalDetail';
import IndexPrivateDetail from './components/picnic/private_pincnic/private_pincnic_detail/IndexPrivateDetail';
import CreatePincnic from './components/picnic/private_pincnic/CreatePincnic';
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
        <Route path="/" element={<Homepage />} />

        <Route path="/activity/picnic" element={<PicnicIndex />} />
        <Route path="/activity/picnic/official" element={<PicnicOffical />} />
        <Route path="/activity/picnic/official/:id" element={<PicnicOfficalDetail />} />
        <Route path="/activity/picnic/group/:id" element={<IndexPrivateDetail />} />
        <Route path="/activity/picnic/create" element={<CreatePincnic />} />
        <Route path="/Users/*" element={<Users />} />
        <Route path="/login" element={<Login />} />

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
