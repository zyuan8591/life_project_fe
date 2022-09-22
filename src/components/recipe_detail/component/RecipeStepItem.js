/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { API_URL_IMG } from '../../../utils/config';

const container = css`
  .eggIcon {
    filter: invert(46%) sepia(26%) saturate(296%) hue-rotate(349deg)
      brightness(93%) contrast(90%);
  }
  &:hover,
  &.active {
    .eggIcon {
      filter: invert(77%) sepia(56%) saturate(864%) hue-rotate(333deg)
        brightness(98%) contrast(93%);
    }
    .recipeStepImgContainer {
      border-color: #f2ac33;
      z-index: 30;
    }
  }
`;
const iconContainer = css`
  width: 80px;
  transform: translateX(-20%);
`;
const recipeImgContainer = css`
  max-width: 300px;
  overflow: hidden;
  border: 3px solid transparent;
  @media (max-width: 1024px) {
    max-width: 250px;
  }
`;
const eggIcon = css``;
const textContainer = css`
  max-width: 300px;
  border: 1px solid #444;
  background: url('/img/recipe/other/stepContentBg.jpg');
  transform: translate(10%, 10%);
`;
const textContent = css`
  border: 2px solid #444;
`;

const RecipeStepItem = ({ i, img, content, position, stepNow, setStepNow }) => {
  let align = ['align-slef-center', 'align-self-start'];
  return (
    <div
      className={`d-flex flex-column px-3 position-relative flex-shrink-0 ${
        align[position]
      } ${stepNow === i ? 'active' : ''}`}
      css={container}
      onClick={() => setStepNow(i)}
    >
      <figure className="m-0 position-relative" css={iconContainer}>
        <img
          src="/img/recipe/other/recipe_egg.svg"
          alt=""
          css={eggIcon}
          className="objectContain eggIcon "
        />
        <span className="position-absolute top-50 start-50 translate-middle fs-3">
          {i}
        </span>
      </figure>
      <figure
        className="m-0 rounded-1 recipeStepImgContainer transition"
        css={recipeImgContainer}
      >
        <img
          src={`${API_URL_IMG}${img}`}
          alt=""
          css={eggIcon}
          className="objectContain"
        />
      </figure>
      <div css={textContainer} className="p-1">
        <p css={textContent} className="p-3 m-0">
          {content}
        </p>
      </div>
    </div>
  );
};

export default RecipeStepItem;
