/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import RecipeIntroMaterial from './RecipeIntroMaterial';

const focusClrY = '#F2AC33';
const subClrBrown = '#817161';

const container = css`
  display: flex;
  gap: 1rem;
  color: #444;
`;
const recipeName = css`
  font-size: 40px;
`;
// Left Section
const introContainer = css`
  flex: 1 0 700px;
  /* max-width: 600px; */
`;

const recipeContainer = css`
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
`;
// Left Section >> author
const authorDetail = css`
  border: 1px solid ${focusClrY};
  border-radius: 3px;
  max-width: 500px;
`;
const avatarContainer = css`
  max-width: 80px;
  border-radius: 50%;
  overflow: hidden;
`;
const btn = css`
  background: ${focusClrY};
  color: #fff;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: 0.2s;
  &:hover {
    color: ${focusClrY};
    background: #fff;
    border-color: ${focusClrY};
  }
`;

const recipeCollectBtn = css`
  width: 100%;
  padding: 0.5rem 0;
`;

// Right Section
const materialContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid ${subClrBrown};
  padding-bottom: 1rem;
`;
const materialTitle = css`
  background: ${subClrBrown};
  color: #fff;
  padding: 0.5rem 0;
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
  &::after {
    content: '';
    border: 5px solid ${subClrBrown};
    transform: translateY(200%) rotate(45deg);
    position: absolute;
  }
`;
const materialMain = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const RecipeIntro = () => {
  return (
    <>
      <div css={recipeName}>高麗菜水餃</div>
      <div css={container}>
        {/* left side */}
        <div className="d-flex flex-column" css={introContainer}>
          {/* recipe Image */}
          <figure css={recipeContainer}>
            <img
              src="/img/recipe/recipe_img/Bagel.jpg"
              alt=""
              className="objectContain"
            />
          </figure>
          {/* author detail */}
          <div css={authorDetail} className="p-3">
            <div
              className="d-flex justify-content-between mb-3 pb-3 align-items-center"
              css={css`
                border-bottom: 1px solid ${focusClrY};
              `}
            >
              {/* author detail left */}
              <div className="d-flex align-items-center gap-3">
                <figure css={avatarContainer}>
                  <img
                    src="/img/user/user_img/aaron.png"
                    alt=""
                    className="objectContain"
                  />
                </figure>
                <div className="d-flex flex-column">
                  <span>Aaron</span>
                  <span>5 食譜 155 粉絲</span>
                </div>
              </div>
              {/* author detail right */}
              <button css={btn} className="py-2 px-3">
                追蹤
              </button>
            </div>
            <button css={[recipeCollectBtn, btn]}>收藏食譜</button>
          </div>
        </div>
        {/* right side */}
        <div>
          {/* recipe content */}
          <p>
            日式炸豆腐是出自日式揚出豆腐，揚出的“揚”字在日本語是油炸的意思，而“出”即湯汁之意，揚出豆腐是日本料理的代表菜色之一，也是造訪日式料理店時餐桌上常見的一道菜；豆腐本身沒什麼味道，但裹上麵包粉油炸後，麵衣吸取了佐上蘿蔔泥的柴魚醬汁，美味瞬間爆表，更增添了豐富的層次感；雖是炸物，吃起來非但一點都不油膩，還很清爽呢。只是一般在家很少做這道料理，原因是油炸食物需要用到大量的油，容易造成浪費。運用氣炸烤箱的氣旋威力，只需少量的油，就能做出相同酥脆口感的日式炸豆腐，只需氣炸10分鐘就能讓你美美上菜。
          </p>
          {/* material section */}
          <div css={materialContainer}>
            <div className="flexCenter" css={materialTitle}>
              食材
            </div>
            <div className="w-100 px-3" css={materialMain}>
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
              <RecipeIntroMaterial />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeIntro;
