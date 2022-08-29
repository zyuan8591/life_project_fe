import React from 'react';
import SliderComponent from './component/SliderComponent';
import '../../styles/_homepage.scss';
import IndexTitle from './component/IndexTitle';
import IndexNews from './component/IndexNews';
import IndexProducts from './component/IndexProducts';

const Homepage = () => {
  return (
    <>
      <SliderComponent />
      <div className="homepageContainer">
        <div className="homepage">
          {/* NEWS */}
          <IndexTitle title="最新資訊" subtitle="News" route="/news" />
          <IndexNews />
          {/* NEW PRODUCTS */}
          <IndexTitle
            title="最新商品"
            subtitle="New Products"
            route="/products"
          />
          <IndexProducts />
          {/* NEW RECIPES */}
          <IndexTitle
            title="熱門食譜"
            subtitle="Popular Recipes"
            route="/recipes"
          />
          {/* ACTIVITIES */}
          <IndexTitle
            title="活動專區"
            subtitle="Activities"
            route="/activity"
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
