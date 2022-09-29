// global style =======================================================================
import 'normalize.css';
import './styles/style.scss';
// package =======================================================================
import axios from 'axios';
// import { DragDropContext } from 'react-beautiful-dnd';
// react hooks / context =======================================================================
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { UserRights } from './usecontext/UserRights';
import { useEffect, useState } from 'react';
import { ProductCartProvider } from './orderContetxt/useProductCart';
import { PicnicCartProvider } from './orderContetxt/usePicnicCart';
import { CampingCartProvider } from './orderContetxt/useCampingCart';
import { CartStepProvider } from './orderContetxt/useCartStep';
// other utils =======================================================================
import { API_URL } from './utils/config';
// index =======================================================================
import Homepage from './components/index/Homepage';
import Footer from './components/public_component/Footer';
import Header from './components/public_component/Header';
import Contact from './components/contact/Contact';
import BackToTop from './components/public_component/BackToTop';
import ScrollToTop from './components/public_component/ScrollToTop';
// product =======================================================================
import ProductList from './components/product/product_list/ProductList';
import ProductDetail from './components/product/product_detail/ProductDetail';
import Backstage from './components/backstage/BackstageProduct';
// recipe & news =======================================================================
import Recipes from './components/recipe/Recipes';
import RecipeDetail from './components/recipe_detail/RecipeDetail';
import News from './components/news/News';
import BackstageChat from './components/backstage/BackstageChat';
// activity =======================================================================
import ActivityMain from './components/activity/ActivityMain';
import SetMap from './components/map/SetMap';
import BackstageCamping from './components/backstage/BackstageCamping';
import Calendar from './components/activity/Calendar';
// activity picnic =======================================================================
import PicnicIndex from './components/picnic/picnic_main/PicnicIndex';
import PicnicOfficalList from './components/picnic/picnic_official/picnic_offical_list/PicnicList';
import PicnicOfficalDetail from './components/picnic/picnic_official/picnic_offical_detail/IndexOfficalDetail';
import PicnicPrivateList from './components/picnic/private_pincnic/private_list/PicnicPrivateList';
import IndexPrivateDetail from './components/picnic/private_pincnic/private_pincnic_detail/IndexPrivateDetail';
import CreatePincnic from './components/picnic/private_pincnic/CreatePincnic';
// activity camping =======================================================================
import CampingMain from './components/camping/camping_main/CampingMain';
import CampingDetailPage from './components/camping/camping_detail/CampingDetailPage';
// users =======================================================================
import Users from './components/Users';
import Account from './components/Users/Content/Account/Account';
import Password from './components/Users/Content/Password/Password';
import Order from './components/Users/Content/Order/Order';
import OrderDetail from './components/Users/Content/Order/OrderDetail';
import Points from './components/Users/Content/Points/Points';
import MyRecipe from './components/Users/Content/Recipe/MyRecipe';
import Camping from './components/Users/Content/Camping/Camping';
import Picnic from './components/Users/Content/Picnic/Picnic';
import Product from './components/Users/Content/Product/Product';
// signin =======================================================================

import Signin from './components/Login/Signin';

// cart =======================================================================
import Cart from './components/Orders/pages/Cart';
import OrderStep from './components/Orders/OrderStep';
import CheckOut from './components/Orders/pages/CheckOut';
import OrderCheck from './components/Orders/pages/OrderCheck';
import ForgotPassword from './components/Users/Content/Password/ForgotPassword';
import ForgotPasswordEmail from './components/Users/Content/Password/ForgotPasswordEmail';
// Layout
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
    try {
      let getUser = async () => {
        let response = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });
        setUser(response.data);
      };
      getUser();
    } catch (e) {
      console.error(e.response.data.msg);
    }
  }, [setUser]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    console.log(result);
  };

  return (
    <>
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
      <UserRights.Provider value={{ user, setUser }}>
        <ScrollToTop>
          <ProductCartProvider>
            <PicnicCartProvider>
              <CampingCartProvider>
                <CartStepProvider>
                  <Routes>
                    <Route path="/" element={<HeaderFooter />}>
                      <Route path="/" element={<Homepage />} />
                      <Route path="/recipes" element={<Recipes />} />
                      <Route path="/orderstep/" element={<OrderStep />}>
                        <Route path="/orderstep/cart" element={<Cart />} />
                        <Route
                          path="/orderstep/checkout"
                          element={<CheckOut />}
                        />
                        <Route
                          path="/orderstep/ordercheck"
                          element={<OrderCheck />}
                        />
                      </Route>
                      <Route path="/news" element={<News />} />
                      {/* activity */}
                      <Route path="/activity" element={<ActivityMain />} />
                      {/* activity camping */}
                      <Route
                        path="/activity/camping"
                        element={<CampingMain />}
                      />
                      <Route
                        path="/activity/camping/:campingId"
                        element={<CampingDetailPage />}
                      />
                    </Route>
                    <Route path="/map" element={<SetMap />} />
                    <Route path="/calendar" element={<Calendar />} />
                    {/* recipe */}
                    <Route path="/recipeDetail" element={<RecipeDetail />} />
                    {/* product */}
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/products/backstage" element={<Backstage />} />
                    {/* activity picnic */}
                    <Route path="/activity/picnic" element={<PicnicIndex />} />
                    <Route
                      path="/activity/picnic/official"
                      element={<PicnicOfficalList />}
                    />
                    <Route
                      path="/activity/picnic/official/:officialId"
                      element={<PicnicOfficalDetail />}
                    />
                    <Route
                      path="/activity/picnic/group"
                      element={<PicnicPrivateList />}
                    />
                    <Route
                      path="/activity/picnic/group/:groupId"
                      element={<IndexPrivateDetail />}
                    />
                    <Route
                      path="/activity/picnic/create"
                      element={<CreatePincnic />}
                    />
                    {/* activity camping */}
                    <Route path="/activity" element={<ActivityMain />} />
                    <Route path="/activity/camping" element={<CampingMain />} />
                    <Route
                      path="/activity/camping/:id"
                      element={<CampingDetailPage />}
                    />
                    <Route path="/map" element={<SetMap />} />
                    <Route
                      path="/camping/backstage"
                      element={<BackstageCamping />}
                    />
                    {/* user */}
                    <Route path="/users/" element={<Users />}>
                      <Route path="/users/account" element={<Account />} />
                      <Route path="/users/password" element={<Password />} />
                      <Route path="/users/order/" element={<Order />} />
                      <Route
                        path="/users/order/:orderId"
                        element={<OrderDetail />}
                      />

                      <Route path="/users/points" element={<Points />} />
                      <Route path="/users/picnic" element={<Picnic />} />
                      <Route path="/users/recipe" element={<MyRecipe />} />
                      <Route path="/users/caping" element={<Camping />} />
                      <Route path="/users/product" element={<Product />} />
                    </Route>
                    {/* login / signup */}
                    <Route path="/signin" element={<Signin />} />
                    <Route
                      path="/forgot/password"
                      element={<ForgotPassword />}
                    />
                    <Route
                      path="/forgot/email"
                      element={<ForgotPasswordEmail />}
                    />
                    <Route path="/backstage/chat" element={<BackstageChat />} />
                  </Routes>
                </CartStepProvider>
              </CampingCartProvider>
            </PicnicCartProvider>
          </ProductCartProvider>
        </ScrollToTop>
      </UserRights.Provider>
      {/* </DragDropContext> */}
    </>
  );
}

export default App;
