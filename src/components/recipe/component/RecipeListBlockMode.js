import React, { useEffect, useState } from 'react';
import classes from '../../../styles/moduleCss/recipes/RecipeListBlockMode.module.scss';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../utils/config';
import axios from 'axios';

const RecipeListBlockMode = ({ data }) => {
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/recipes/${data.id}/material`);
      let materialArr = result.data.map((d) => d.name);
      setMaterial(materialArr.join('、'));
    })();
  }, []);
  return (
    <>
      <Link to={`/recipeDetail?id=${data.id}`} className={classes.container}>
        <figure className={classes.imgContainer}>
          <img
            src={`/img/recipe/recipe_img/${data.image}`}
            alt={data.name}
            className="objectContain"
          />
        </figure>
        <span className={classes.title}>{data.name}</span>
        <span>作者：{data.user_name}</span>
        <span className={classes.material}>食材：{material}</span>
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
