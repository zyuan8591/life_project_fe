import React from 'react';
import SliderComponent from './component/SliderComponent';
import '../../styles/_homepage.scss';
import IndexTitle from './component/IndexTitle';
import IndexNews from './component/IndexNews';
import IndexProducts from './component/IndexProducts';
import IndexActivity from './component/IndexActivity';
import IndexJoinUs from './component/IndexJoinUs';
import IndexRecipe from './component/IndexRecipe';
import Footer from '../public_component/Footer';
import Header from '../public_component/Header';
import BackToTop from '../public_component/BackToTop';

const Homepage = () => {
  return (
    <>
      <Header />
      <SliderComponent />
      <div className="homepageContainer">
        <div className="homepage">
          {/* NEWS */}
          <div className="newsContainer">
            <IndexTitle title="最新資訊" subtitle="News" route="/news" />
            <IndexNews />
          </div>
          {/* NEW PRODUCTS */}
          <div className="productContainer">
            <IndexTitle
              title="最新商品"
              subtitle="New Products"
              route="/products"
            />
          </div>
          <IndexProducts />
          {/* NEW RECIPES */}
          <div className="recipeContainer">
            <IndexTitle
              title="熱門食譜"
              subtitle="Popular Recipes"
              route="/recipes"
            />
          </div>
          <IndexRecipe />

          {/* ACTIVITIES */}
          <div className="activityContainer">
            <IndexTitle
              title="活動專區"
              subtitle="Activities"
              route="/activity"
            />
            <IndexActivity />
          </div>
          {/* JOIN US */}
        </div>
        <div className="joinUsContainer">
          <IndexJoinUs />
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Homepage;
