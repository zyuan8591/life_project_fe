import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import classes from '../../../styles/moduleCss/recipeDetail/recipeSlide.module.scss';

const RecipeSlide = ({ width, item }) => {
  return (
    <IconContext.Provider value={{ color: '#444', size: '2rem' }}>
      <div className={`${classes.slide} mx-auto px-1 flexCenter`}>
        <div className={classes.slideLeft}>
          <FaAngleLeft />
        </div>
        <div className="d-flex gap-5">
          {Array(5)
            .fill('')
            .map((d) => {
              return (
                <figure className={` ${classes.imgContainer} m-0`}>
                  <img
                    src="/img/recipe/recipe_img/BandW.jpg"
                    alt=""
                    className="objectContain"
                  />
                </figure>
              );
            })}
        </div>
        <div className={classes.slideRight}>
          <FaAngleRight />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default RecipeSlide;
