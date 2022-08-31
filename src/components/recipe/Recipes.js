import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../public_component/Footer';
import Header from '../public_component/Header';
import BackToTop from '../public_component/BackToTop';
import '../../styles/_recipes.scss';
import RecipeCateBtn from './component/RecipeCateBtn';
import { IconContext } from 'react-icons';
import {
  AiOutlineSearch,
  AiOutlinePlusCircle,
  AiOutlineBook,
  AiOutlineHeart,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';

const recipeCate = ['所有分類', '烘焙點心', '飲料冰品'];

const Recipes = () => {
  const recipeCateClickHandler = () => {};
  return (
    <>
      <Header />
      <div className="pageRecipes">
        <div className="recipesCateBtnGroup mb-3">
          {recipeCate.map((d, i) => {
            return (
              <RecipeCateBtn
                onclick={recipeCateClickHandler}
                content={d}
                active={i === 0 ? true : false}
              />
            );
          })}
        </div>
        <div className="recipeToolBar">
          <div className="recipeSearchBar">
            <span className="searchFor flexCenter">找食譜</span>
            <input
              type="text"
              className="searchForName"
              placeholder="請輸入食譜名稱"
            />
            <input
              type="text"
              className="searchForMaterial"
              placeholder="請輸入食材名稱"
            />
            <div className="recipesSearchBtn">
              <IconContext.Provider
                value={{ size: '1.5rem', className: 'RecipeSearchBtnSvg' }}
              >
                <AiOutlineSearch />
              </IconContext.Provider>
            </div>
          </div>

          <div className="recipeFeatureBtn">
            <IconContext.Provider
              value={{ size: '2.5rem', className: 'recipeFeatureSvg' }}
            >
              <div className="featureBtn">
                <AiOutlinePlusCircle />
                <span>寫食譜</span>
              </div>
              <Link to="/" className="featureBtn">
                <AiOutlineBook />
                <span>我的食譜</span>
              </Link>
              <Link to="/" className="featureBtn">
                <AiOutlineHeart />
                <span>食譜收藏</span>
              </Link>
              <Link to="/" className="featureBtn">
                <AiOutlineQuestionCircle />
                <span>客服中心</span>
              </Link>
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Recipes;
