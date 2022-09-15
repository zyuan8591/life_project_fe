/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../../utils/config';

const hoverClr = '#eee';
const subClrBrown = '#817161';

const container = css`
  padding: 1rem;
  border-bottom: 1px solid ${hoverClr};
  display: flex;
  gap: 1rem;
  transition: 0.3s;
  cursor: pointer;
  &:hover figure {
    opacity: 0.7;
  }
`;
const imgContainer = css`
  max-width: 250px;
  min-width: 250px;
  border-radius: 3px;
  overflow: hidden;
`;
const recipeContainer = css`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;
const title = css`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;
const tag = css`
  background: ${subClrBrown};
  color: #fff;
  padding: 0 0.5rem;
  font-size: 0.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const recipeContent = css``;
const recipeMaterial = css``;
const about = css`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const icon = css`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const RecipeListMode = ({ data }) => {
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/recipes/${data.id}/material`);
      let materialArr = result.data.map((d) => d.name);
      setMaterial(materialArr.join('、'));
    })();
  }, []);

  return (
    <Link to={`/recipeDetail?id=${data.id}`} css={container}>
      <figure css={imgContainer}>
        <img
          src={`${API_URL_IMG}${data.image}`}
          alt="Bagel"
          className="objectContain"
        />
      </figure>
      <div css={recipeContainer}>
        <div css={title}>
          <span css={tag}>{data.recipe_category_name}</span>
          <span css={tag}>{data.product_category_name}</span>
          <span>{data.name}</span>
        </div>
        <div>作者: {data.user_name}</div>
        <div css={recipeContent}>{data.content}</div>
        <div css={recipeMaterial}>食材：{material}</div>
        <div css={about}>
          <div css={icon}>
            <AiOutlineHeart />
            <span>{data.likes}</span>
          </div>
          <div css={icon}>
            <AiOutlineComment />
            <span>{data.comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeListMode;
