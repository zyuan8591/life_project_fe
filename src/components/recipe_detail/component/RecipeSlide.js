import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import classes from '../../../styles/moduleCss/recipeDetail/recipeSlide.module.scss';
import { Link } from 'react-router-dom';

const testData = [
  { id: 1, img: '/img/recipe/recipe_img/BandW.jpg', link: '/recipes/5' },
  { id: 2, img: '/img/recipe/recipe_img/BandW.jpg', link: '/recipes/5' },
  { id: 3, img: '/img/recipe/recipe_img/BandW.jpg', link: '/recipes/5' },
  { id: 4, img: '/img/recipe/recipe_img/BandW.jpg', link: '/recipes/5' },
  { id: 5, img: '/img/recipe/recipe_img/BandW.jpg', link: '/recipes/5' },
  { id: 6, img: '/img/recipe/recipe_img/BandW.jpg', link: '/recipes/5' },
  { id: 7, img: '/img/recipe/recipe_img/BandW.jpg', link: '/recipes/5' },
  { id: 8, img: '/img/recipe/recipe_img/BandW.jpg', link: '/recipes/5' },
  { id: 9, img: '/img/recipe/recipe_img/BandW.jpg', link: '/recipes/5' },
];

const RecipeSlide = ({ data = testData }) => {
  const slideRef = useRef(null);
  const [slideLeft, setSlideLeft] = useState(0);

  // slide event
  const SlideHandler = (dir) => {
    const scrollWidth =
      slideRef.current.scrollWidth - slideRef.current.offsetWidth;
    const itemWidth = slideRef.current.scrollWidth / data.length;
    let left = slideLeft;
    switch (dir) {
      case 'left':
        left -= itemWidth;
        break;
      case 'right':
        left += itemWidth;
        break;
      default:
        break;
    }
    console.log(left);
    if (left < 0) left = 0;
    if (left > scrollWidth) left = scrollWidth;
    slideRef.current.scrollTo({ left: left });
    setSlideLeft(left);
  };

  return (
    <IconContext.Provider value={{ color: '#444', size: '2rem' }}>
      <div
        className={`${classes.slide} mx-auto px-5 flexCenter position-relative`}
      >
        {/* left arrow */}
        <div
          className={`${classes.slideLeft} flexCenter start-0`}
          onClick={() => SlideHandler('left')}
        >
          <FaAngleLeft />
        </div>
        {/* slide  */}
        <div
          className={`d-flex gap-4 ${classes.slideContainer}`}
          ref={slideRef}
        >
          {data.map((d) => {
            return (
              <Link to={d.link} key={d.id} className={classes.slideItem}>
                <figure
                  className={` ${classes.imgContainer} m-0 transition rounded-1 overflow-hidden`}
                >
                  <img src={d.img} alt="" className="objectContain" />
                </figure>
              </Link>
            );
          })}
        </div>
        {/* right arrow */}
        <div
          className={`flexCenter end-0 ${classes.slideRight}`}
          onClick={() => SlideHandler('right')}
        >
          <FaAngleRight />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default RecipeSlide;
