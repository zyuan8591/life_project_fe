import React, { useEffect, useState } from 'react';
import SliderComponent from './component/SliderComponent';
import '../../styles/_homepage.scss';
import IndexTitle from './component/IndexTitle';
import IndexNews from './component/IndexNews';
import IndexProducts from './component/IndexProducts';
import IndexActivity from './component/IndexActivity';
import IndexJoinUs from './component/IndexJoinUs';
import IndexRecipe from './component/IndexRecipe';
import IndexRecipeActivity from './component/IndexRecipeActivity';
import { API_URL } from '../../utils/config';
import axios from 'axios';

const Homepage = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/recipes?sort=2&page=1&perPage=12`
      );
      let data = result.data.data;
      setRecipeData(data);

      let newsResulte = await axios.get(`${API_URL}/news`);
      let newsData = newsResulte.data;
      setNewsData(newsData);
    })();
  }, []);

  return (
    <>
      <SliderComponent />
      <div className="homepageContainer">
        <div className="homepage">
          {/* NEWS */}
          <div className="hPnewsContainer">
            <IndexTitle title="最新資訊" subtitle="News" route="/news" />
            <IndexNews data={newsData} />
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
          <IndexRecipe data={recipeData} />
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
