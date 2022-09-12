import React from 'react';
import classes from '../../../styles/moduleCss/recipes/RecipeListBlockMode.module.scss';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const RecipeListBlockMode = ({ data }) => {
  return (
    <>
      <Link to={`/recipes?id=${data.id}`} className={classes.container}>
        <figure className={classes.imgContainer}>
          <img
            src={`/img/recipe/recipe_img/${data.image}`}
            alt={data.name}
            className="objectContain"
          />
        </figure>
        <span className={classes.title}>{data.name}</span>
        <span>作者：{data.user_id}</span>
        <div className={classes.about}>
          <div className={classes.like}>
            <AiOutlineHeart />
            <span>{data.likes}</span>
          </div>
          <div className={classes.comment}>
            <AiOutlineComment />
            <span>{data.comments}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecipeListBlockMode;
