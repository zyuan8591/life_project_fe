/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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

const RecipeListMode = () => {
  return (
    <Link to="/recipes/5" css={container}>
      <figure css={imgContainer}>
        <img
          src="/img/recipe/recipe_img/Bagel.jpg"
          alt="Bagel"
          className="objectContain"
        />
      </figure>
      <div css={recipeContainer}>
        <div css={title}>
          <span css={tag}>台式料理</span>
          <span css={tag}>氣炸鍋</span>
          <span>高麗菜水餃</span>
        </div>
        <div>Author: LIFE</div>
        <div css={recipeContent}>
          　　我以為我了解水餃，但我真的了解水餃嗎？仔細想想，我對水餃的理解只是皮毛而已。這必定是個前衛大膽的想法。對水餃進行深入研究，在現今時代已經無法避免了。亞伯拉罕·林肯講過，你活了多少歲不算什麼，重要的是你是如何度過這些歲月的。他會這麼說是有理由的。
        </div>
        <div css={recipeMaterial}>食材：高麗菜、水、水餃皮</div>
        <div css={about}>
          <div css={icon}>
            <AiOutlineHeart />
            <span>666</span>
          </div>
          <div css={icon}>
            <AiOutlineComment />
            <span>666</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeListMode;
