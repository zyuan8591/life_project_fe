import React from 'react';
import Slider from 'react-slick';
import CardSm from '../../public_component/CardSm';
import { Link } from 'react-router-dom';

const IndexRecipe = () => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
  };
  return (
    <div className="recipeCard">
      <Slider {...settings}>
        <div>
          <CardSm
            img="/img/recipe/recipe_img/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </div>
        <div>
          <CardSm
            img="/img/recipe/recipe_img/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </div>
        <div>
          <CardSm
            img="/img/recipe/recipe_img/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </div>
        <div>
          <CardSm
            img="/img/recipe/recipe_img/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </div>
        <div>
          <CardSm
            img="/img/recipe/recipe_img/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </div>
        <div>
          <CardSm
            img="/img/recipe/recipe_img/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </div>
      </Slider>
    </div>
  );
};

export default IndexRecipe;
