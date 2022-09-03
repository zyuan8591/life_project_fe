import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../public_component/Footer';
import Header from '../public_component/Header';
import BackToTop from '../public_component/BackToTop';
import '../../styles/_recipes.scss';
import RecipeCateBtn from './component/RecipeCateBtn';
import Select from 'react-select';
import { IconContext } from 'react-icons';
import {
  AiOutlineSearch,
  AiOutlinePlusCircle,
  AiOutlineBook,
  AiOutlineHeart,
  AiOutlineQuestionCircle,
  AiOutlineBars,
  AiOutlineAppstore,
} from 'react-icons/ai';
import ProductCategory from '../product/product_list/ProductCategory';
import RecipeListBlockMode from './component/RecipeListBlockMode';
import PaginationBar from '../public_component/PaginationBar';
import RecipeListMode from './component/RecipeListMode';
import RecipeCreateForm from './component/RecipeCreateForm';

const recipeCate = ['所有分類', '烘焙點心', '飲料冰品'];
const sortOption = [
  { value: 1, label: '最新食譜' },
  { value: 2, label: '熱門食譜' },
];
const sortOptionStyle = {};
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#444',
    background: state.isSelected ? '#817161' : '#fff',
    ':active': {
      ...provided[':active'],
      backgroundColor: !state.isDisabled
        ? state.isSelected
          ? '#817161'
          : '#81716180'
        : undefined,
    },
  }),
  control: (base, state) => ({
    ...base,
    border: '1px solid #817161',
    borderColor: state.isFocused ? '#817161' : 'hsl(0, 0%, 80%)',
    boxShadow: 0,
    '&:hover': {
      border: state.isFocused ? '1px solid #817161' : '1px solid #817161',
    },
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

const Recipes = () => {
  const [selectSortOption, setSelectSortOption] = useState(null);
  const [pageNow, setPageNow] = useState(1);
  const [displayMode, setDisplayMode] = useState(1);
  const [createRecipe, setCreateRecipe] = useState(true);

  const recipeCateClickHandler = () => {};

  return (
    <>
      <Header />
      <div className="pageRecipes">
        {/* recipeCategory */}
        <div className="recipesCateBtnGroup mb-3">
          {recipeCate.map((d, i) => {
            return (
              <RecipeCateBtn
                key={i}
                onclick={recipeCateClickHandler}
                content={d}
                active={i === 0 ? true : false}
              />
            );
          })}
        </div>
        <div className="recipeToolBar">
          {/* search Button... */}
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
          {/* add recipe, my recipe ... btn */}
          <div className="recipeFeatureBtn">
            <IconContext.Provider
              value={{ size: '2.5rem', className: 'recipeFeatureSvg' }}
            >
              <div
                className="featureBtn"
                onClick={() => {
                  setCreateRecipe(true);
                }}
              >
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
        <div className="recipeListMain">
          <ProductCategory />
          <div className="recipeList">
            {/* Choose mode and filter */}
            <div className="recipeMainToolBar flexCenter mb-3">
              <IconContext.Provider
                value={{ size: '2rem', className: 'me-1 recipeModeBtn' }}
              >
                <div
                  className={`recipeListMode ${
                    displayMode === 0 ? 'active' : ''
                  }`}
                  onClick={() => setDisplayMode(parseInt(0))}
                >
                  <AiOutlineBars />
                </div>
                <div
                  className={`recipeBlockMode ${
                    displayMode === 1 ? 'active' : ''
                  }`}
                  onClick={() => setDisplayMode(parseInt(1))}
                >
                  <AiOutlineAppstore />
                </div>
              </IconContext.Provider>
              <Select
                defaultValue={sortOption[0]}
                onChange={setSelectSortOption}
                options={sortOption}
                styles={customStyles}
                isSearchable={false}
              />
            </div>
            {displayMode === 1 ? (
              <div className="recipeBlockModeList">
                <RecipeListBlockMode />
                <RecipeListBlockMode />
                <RecipeListBlockMode />
                <RecipeListBlockMode />
              </div>
            ) : (
              <div className="recipeListModeList">
                <RecipeListMode />
                <RecipeListMode />
                <RecipeListMode />
                <RecipeListMode />
              </div>
            )}
            <PaginationBar
              lastPage={12}
              pageNow={pageNow}
              setPageNow={setPageNow}
            />
          </div>
        </div>
        {createRecipe && (
          <section
            className="creatingRecipe flexCenter"
            onClick={() => {
              setCreateRecipe(false);
            }}
          >
            <RecipeCreateForm setCreateRecipe={setCreateRecipe} />
          </section>
        )}
      </div>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Recipes;
