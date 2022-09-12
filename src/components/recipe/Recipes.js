import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import BreadCrumb from '../public_component/BreadCrumb';
import IndexRecipeActivity from '../index/component/IndexRecipeActivity';
import { API_URL } from '../../utils/config';
import { useEffect } from 'react';
import axios from 'axios';

// const recipeCate = ['所有分類', '烘焙點心', '飲料冰品'];
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
  const [displayMode, setDisplayMode] = useState(0);
  const [createRecipe, setCreateRecipe] = useState(false);

  // init data
  const [recipeCate, setRecipeCate] = useState([]);
  const [recipeList, setRecipeList] = useState([]);

  // sql query data
  const [pageNow, setPageNow] = useState(1);
  const [recipeCateNow, setRecipeCateNow] = useState(0);

  // http://localhost:3001/api/1.0/recipes?page=1&perPage=12
  const getRecipeData = async (url = '') => {
    let result = await axios.get(`${API_URL}/recipes${url}?perPage=12`);
    let data = result.data;
    return data;
  };

  useEffect(() => {
    (async () => {
      let recipeCateResult = await axios.get(`${API_URL}/recipes/category`);
      let recipeCateData = recipeCateResult.data;
      setRecipeCate([{ id: 0, name: '所有分類' }, ...recipeCateData]);
      let recipeListData = await getRecipeData();
      console.log(recipeListData.data);
      setRecipeList(recipeListData.data);
    })();
  }, []);

  return (
    <>
      <div className="pageRecipes">
        <BreadCrumb />
        <IndexRecipeActivity />
        {/* recipeCategory */}
        <div className="recipesCateBtnGroup mb-3">
          {recipeCate.map((d, i) => {
            return (
              <div key={d.id}>
                <RecipeCateBtn
                  cateNum={d.id}
                  onclick={setRecipeCateNow}
                  content={d.name}
                  active={i === recipeCateNow ? true : false}
                />
              </div>
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
              <div className="featureBtn" onClick={() => setCreateRecipe(true)}>
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
        {/* Main Section */}
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
                {recipeList.map((d, i) => {
                  return (
                    <div key={d.id}>
                      <RecipeListBlockMode data={d} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="recipeListModeList">
                {recipeList.map((d, i) => {
                  return <RecipeListMode data={d} />;
                })}
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
    </>
  );
};

export default Recipes;
