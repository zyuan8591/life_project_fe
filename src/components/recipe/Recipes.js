import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
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
  { value: 1, label: '最新食譜' },
  { value: 2, label: '熱門食譜' },
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
  const [searchParams, setSearchParams] = useSearchParams();

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
      // get all recipe cate name
      let recipeCateResult = await axios.get(`${API_URL}/recipes/category`);
      let recipeCateData = recipeCateResult.data;
      setRecipeCate([{ id: 0, name: '所有分類' }, ...recipeCateData]);
    })();
    searchParams.get('searchName') &&
      setSearchName(searchParams.get('searchName'));
    searchParams.get('searchMaterial') &&
      setSearchMaterial(searchParams.get('searchMaterial'));
  }, []);

  // Handle query
  useEffect(() => {
    // recipe category
    let recipeCateQuery = searchParams.get('recipeCate');
    if (!recipeCateQuery) recipeCateQuery = 0;
    setRecipeCateNow(recipeCateQuery);
    // product category
    let productCateQuery = searchParams.get('productCate');
    if (!productCateQuery) productCateQuery = 0;
    setProductCateNow(productCateQuery);
  }, [searchParams]);

  // set page to 1
  useEffect(() => {
    setPageNow(1);
  }, [recipeCateNow, searchMaterial, searchName]);

  // get recipe list data
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/recipes?perPage=12&recipeCate=${recipeCateNow}&name=${searchName}&materialName=${searchMaterial}&sort=${selectSortOption}&page=${pageNow}&productCate=${productCateNow}`
      );
      setRecipeList(result.data.data);
      setLastPage(result.data.pagination.lastPage);
    })();
  }, [
    recipeCateNow,
    selectSortOption,
    searchMaterial,
    searchName,
    pageNow,
    productCateNow,
    searchParams,
  ]);

  const searchNameHandler = (e) => {
    setSearchName(e.target.value);
    const params = Object.fromEntries([...searchParams]);
    params['searchName'] = e.target.value;
    setSearchParams(params);
  };
  const searchMaterialHandler = (e) => {
    setSearchMaterial(e.target.value);
    const params = Object.fromEntries([...searchParams]);
    params['searchMaterial'] = e.target.value;
    setSearchParams(params);
  };

  // handle add recipe
  const addRecipeHandler = () => {
    const params = Object.fromEntries([...searchParams]);
    params['add'] = 'true';
    setSearchParams(params);
  };
  const closeRecipeHandler = () => {
    const params = Object.fromEntries([...searchParams]);
    delete params.add;
    setSearchParams(params);
  };

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
                  content={d.name}
                  active={i === parseInt(recipeCateNow) ? true : false}
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
              onChange={(e) => searchNameHandler(e)}
            />
            <input
              type="text"
              className="searchForMaterial"
              placeholder="請輸入食材名稱"
              value={searchMaterial}
              onChange={(e) => searchMaterialHandler(e)}
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
              <div className="featureBtn" onClick={() => addRecipeHandler()}>
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
          <div className="position-sticky top-0 align-self-start">
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
        {/* Create Recipe Form */}
        {searchParams.get('add') === 'true' && (
          <section className="creatingRecipe flexCenter">
            <RecipeCreateForm
              closeCreateRecipe={closeRecipeHandler}
              recipeCate={recipeCate}
            />
          </section>
        )}
      </div>
    </>
  );
};

export default Recipes;
