import React from 'react';
import SliderComponent from './component/SliderComponent';
import '../../styles/_homepage.scss';
import IndexTitle from './component/IndexTitle';
import IndexNews from './component/IndexNews';

const Homepage = () => {
  return (
    <>
      <SliderComponent />
      <div className="homepageContainer">
        <div className="homepage">
          <IndexTitle title="最新資訊" subtitle="News" route="/news" />
          <IndexNews />
          <IndexTitle
            title="最新商品"
            subtitle="New Products"
            route="/products"
          />
          <IndexTitle
            title="熱門食譜"
            subtitle="Popular Recipes"
            route="/recipes"
          />
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
