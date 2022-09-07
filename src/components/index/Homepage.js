import React from 'react';
import SliderComponent from './component/SliderComponent';
import '../../styles/_homepage.scss';
import IndexTitle from './component/IndexTitle';
import IndexNews from './component/IndexNews';
import IndexProducts from './component/IndexProducts';
import IndexActivity from './component/IndexActivity';
import IndexJoinUs from './component/IndexJoinUs';
import IndexRecipe from './component/IndexRecipe';
import IndexRecipeActivity from './component/IndexRecipeActivity';

const Homepage = () => {
  return (
    <>
      <SliderComponent />
      <div className="homepageContainer">
        <div className="homepage">
          {/* NEWS */}
          <div className="hPnewsContainer">
            <IndexTitle title="最新資訊" subtitle="News" route="/news" />
            <IndexNews />
          </div>
          <div className="separateLine"></div>
          {/* NEW PRODUCTS */}
          <div className="hPproductContainer">
            <IndexTitle
              title="最新商品"
              subtitle="New Products"
              route="/products"
            />
          </div>
          <IndexProducts />
          <div className="separateLine"></div>
          {/* NEW RECIPES */}
          <div className="hPrecipeContainer">
            <IndexTitle
              title="熱門食譜"
              subtitle="Popular Recipes"
              route="/recipes"
            />
          </div>
          <IndexRecipe />
          <div className="hPrecipeActivity">
            <IndexRecipeActivity />
          </div>
          <div className="separateLine"></div>
          {/* ACTIVITIES */}
          <div className="hPactivityContainer">
            <IndexTitle
              title="活動專區"
              subtitle="Activities"
              route="/activity"
            />
            <IndexActivity />
          </div>
          <div className="separateLine"></div>
          {/* JOIN US */}
        </div>
        <div className="joinUsContainer">
          <IndexJoinUs />
        </div>
      </div>
    </>
  );
};

export default Homepage;
