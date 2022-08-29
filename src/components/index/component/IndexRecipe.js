import React from 'react';
import Slider from 'react-slick';
import CardSm from '../../public_component/CardSm';
import { Link } from 'react-router-dom';

const IndexRecipe = () => {
  const settings = {
    className: 'center',
    infinite: true,
    slidesToShow: 5,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
    slide: 'a',
  };
  return (
    <div className="recipeCard">
      <Slider {...settings}>
        <Link to="/">
          <CardSm
            img="/img/recipe/recipe/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </Link>
        <Link to="/">
          <CardSm
            img="/img/recipe/recipe/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </Link>
        <Link to="/">
          <CardSm
            img="/img/recipe/recipe/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </Link>
        <Link to="/">
          <CardSm
            img="/img/recipe/recipe/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </Link>
        <Link to="/">
          <CardSm
            img="/img/recipe/recipe/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </Link>
        <Link to="/">
          <CardSm
            img="/img/recipe/recipe/ApplePie.jpeg"
            type="烘焙點心"
            name="曲奇餅乾"
            link="/"
          />
        </Link>
      </Slider>
    </div>
  );
};

export default IndexRecipe;
