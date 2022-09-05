import React from 'react';
import classes from '../../../styles/moduleCss/recipes/RecipeListBlockMode.module.scss';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const RecipeListBlockMode = () => {
  return (
    <>
      <Link to="/recipes/5" className={classes.container}>
        <figure className={classes.imgContainer}>
          <img
            src="/img/recipe/recipe_img/Bagel.jpg"
            alt="Bagel"
            className="objectContain"
          />
        </figure>
        <span className={classes.title}>起司貝果</span>
        <span>作者：Aaron</span>
        <div className={classes.about}>
          <div className={classes.like}>
            <AiOutlineHeart />
            <span>666</span>
          </div>
          <div className={classes.comment}>
            <AiOutlineComment />
            <span>666</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecipeListBlockMode;
