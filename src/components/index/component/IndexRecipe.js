import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import CardSm from '../../public_component/CardSm';
import { API_URL_IMG } from '../../../utils/config';

const IndexRecipe = ({ data = [] }) => {
  const [vw, setVw] = useState(window.innerWidth);
  const [slidesToShow, setSlideToShow] = useState(5);

  useEffect(() => {
    if (vw > 1550) setSlideToShow(5);
    if (vw < 1550) setSlideToShow(4.5);
    if (vw < 1400) setSlideToShow(4);
    if (vw < 1250) setSlideToShow(3.5);
    if (vw < 1100) setSlideToShow(3);
    if (vw < 950) setSlideToShow(2.5);
    if (vw < 800) setSlideToShow(2.2);
    if (vw < 765) setSlideToShow(2.5);
    if (vw < 700) setSlideToShow(2.2);
    if (vw < 600) setSlideToShow(1.8);
    if (vw < 500) setSlideToShow(1.5);
    if (vw < 430) setSlideToShow(1.07);
  }, [vw]);

  const setViewportWidth = () => setVw(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', setViewportWidth);
    return function cleanUp() {
      window.removeEventListener('resize', setViewportWidth);
    };
  }, []);

  const settings = {
    infinite: true,
    slidesToShow,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
  };

  return (
    <div className="recipeCard">
      <Slider {...settings}>
        {data.map((d) => {
          return (
            <div key={d.id}>
              <CardSm
                img={`${API_URL_IMG}${d.image}`}
                type={d.recipe_category_name}
                name={d.name}
                link={`/recipeDetail?id=${d.id}`}
                className="rounded-1"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default IndexRecipe;
