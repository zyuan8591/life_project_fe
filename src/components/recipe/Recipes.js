import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

// const recipeCate = ['所有分類', '烘焙點心', '飲料冰品'];
const sortOption = [
  { value: 2, label: '最新食譜' },
  { value: 3, label: '熱門食譜' },
];
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
  const [displayMode, setDisplayMode] = useState(0);
  const [createRecipe, setCreateRecipe] = useState(false);

  // init data
  const [recipeCate, setRecipeCate] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [lastPage, setLastPage] = useState(0);

  // sql query data
  const [pageNow, setPageNow] = useState(1);
  const [recipeCateNow, setRecipeCateNow] = useState(0);
  const [productCateNow, setProductCateNow] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchMaterial, setSearchMaterial] = useState('');
  const [selectSortOption, setSelectSortOption] = useState(1);

  useEffect(() => {
    (async () => {
      let recipeCateResult = await axios.get(`${API_URL}/recipes/category`);
      let recipeCateData = recipeCateResult.data;
      setRecipeCate([{ id: 0, name: '所有分類' }, ...recipeCateData]);
    })();
  }, []);

  useEffect(() => {
    setPageNow(1);
  }, [recipeCateNow, searchMaterial, searchName]);

  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/recipes?perPage=12&recipeCate=${recipeCateNow}&name=${searchName}&materialName=${searchMaterial}&sort=${selectSortOption}&page=${pageNow}`
      );
      console.log(result.data.pagination);
      setRecipeList(result.data.data);
      setLastPage(result.data.pagination.lastPage);
    })();
  }, [recipeCateNow, selectSortOption, searchMaterial, searchName, pageNow]);

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
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              className="searchForMaterial"
              placeholder="請輸入食材名稱"
              value={searchMaterial}
              onChange={(e) => setSearchMaterial(e.target.value)}
            />
            <div className="recipesSearchBtn">
              <IconContext.Provider
                value={{ size: '1.5rem', className: 'RecipeSearchBtnSvg' }}
              >
                <AiOutlineSearch />
              </IconContext.Provider>
            </div>
          </div>
          {/* TODO: add recipe, my recipe ... btn */}
          <div className="recipeFeatureBtn">
            <IconContext.Provider
              value={{ size: '2.5rem', className: 'recipeFeatureSvg' }}
            >
              <div className="featureBtn" onClick={() => setCreateRecipe(true)}>
                <AiOutlinePlusCircle />
                <span>寫食譜</span>
              </div>
              <Link to="/users/recipe" className="featureBtn">
                <AiOutlineBook />
                <span>我的食譜</span>
              </Link>
              <Link to="/users/recipe" className="featureBtn">
                <AiOutlineHeart />
                <span>食譜收藏</span>
              </Link>
            </IconContext.Provider>
          </div>
        </div>
        {/* Main Section */}
        <div className="recipeListMain">
          <div className="">
            <ProductCategory />
          </div>
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
                onChange={(e) => setSelectSortOption(e.value)}
                options={sortOption}
                styles={customStyles}
                isSearchable={false}
              />
            </div>
            {/* Main Content */}
            {displayMode === 1 ? (
              <div className="recipeBlockModeList">
                {recipeList.map((d, i) => {
                  return (
                    <RecipeListBlockMode
                      data={d}
                      key={d.id}
                    ></RecipeListBlockMode>
                  );
                })}
              </div>
            ) : (
              <div className="recipeListModeList">
                {recipeList.map((d) => {
                  return <RecipeListMode data={d} key={d.id}></RecipeListMode>;
                })}
              </div>
            )}
            <PaginationBar
              lastPage={lastPage}
              pageNow={pageNow}
              setPageNow={setPageNow}
            />
          </div>
        </div>
        {/* TODO: Create Recipe Form */}
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
