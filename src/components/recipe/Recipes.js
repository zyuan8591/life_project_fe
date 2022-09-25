import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
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
  AiOutlineDown,
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
import { useUserRights } from '../../usecontext/UserRights';
import Notification from '../activity/Notification';
import { SiFoodpanda } from 'react-icons/si';
import NoDataDisplay from '../public_component/NoDataDisplay';

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
  const { user } = useUserRights();
  const navigate = useNavigate();

  // init data
  const [recipeCate, setRecipeCate] = useState([]);
  const [productCate, setProductCate] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [vw, setVw] = useState(window.innerWidth);
  const [perPage, setPerPage] = useState(12);

  const setViewPortWidth = () => setVw(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', setViewPortWidth);
    return function clean() {
      window.removeEventListener('resize', setViewPortWidth);
    };
  }, []);
  useEffect(() => {
    if (vw < 765) setDisplayMode(1);
  }, [vw]);

  // sql query data
  const [pageNow, setPageNow] = useState(1);
  const [recipeCateNow, setRecipeCateNow] = useState(0);
  const [productCateNow, setProductCateNow] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchMaterial, setSearchMaterial] = useState('');
  const [selectSortOption, setSelectSortOption] = useState(1);

  // close & open
  const [loginBtn, setLoginBtn] = useState(false);
  const [addToast, setAddToast] = useState(false);
  const [recipeCateCollapse, setRecipeCateCollapse] = useState(false);
  const [productCateCollapse, setProductCateCollapse] = useState(false);
  let recipeCollapseStyle = recipeCateCollapse ? { flexWrap: 'wrap' } : {};
  let productCollapseStyle = productCateCollapse ? { flexWrap: 'wrap' } : {};

  useEffect(() => {
    (async () => {
      // get all recipe cate name
      let recipeCateResult = await axios.get(`${API_URL}/recipes/category`);
      let recipeCateData = recipeCateResult.data;
      setRecipeCate([{ id: 0, name: '所有分類' }, ...recipeCateData]);
      let productCateResult = await axios.get(`${API_URL}/products/category`);
      let productCateData = productCateResult.data;
      setProductCate([{ id: 0, name: '所有分類' }, ...productCateData]);
    })();
    searchParams.get('searchName') &&
      setSearchName(searchParams.get('searchName'));
    searchParams.get('searchMaterial') &&
      setSearchMaterial(searchParams.get('searchMaterial'));
  }, []);

  // Handle query string
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

  // const set product category for component
  const setProductCateNowFunc = (id) => {
    const params = Object.fromEntries([...searchParams]);
    params['productCate'] = id;
    setSearchParams(params);
  };

  // set page to 1
  useEffect(() => {
    setPageNow(1);
    setPerPage(12);
  }, [recipeCateNow, searchMaterial, searchName]);

  // get recipe list data
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/recipes?perPage=${perPage}&recipeCate=${recipeCateNow}&name=${searchName}&materialName=${searchMaterial}&sort=${selectSortOption}&page=${pageNow}&productCate=${productCateNow}`
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
    perPage,
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

  // handle add recipe form
  const addRecipeHandler = () => {
    if (!user) return setLoginBtn(true);
    const params = Object.fromEntries([...searchParams]);
    params['add'] = 'true';
    setSearchParams(params);
  };
  const closeRecipeHandler = () => {
    const params = Object.fromEntries([...searchParams]);
    delete params.add;
    setSearchParams(params);
  };
  // link to user page
  const linkToUserPage = (url) => {
    if (!user) return setLoginBtn(true);
    navigate(url);
  };
  // toast message
  const showToast = () => {
    setAddToast(true);
    setTimeout(() => {
      setAddToast(false);
    }, 2000);
  };

  return (
    <>
      {loginBtn && (
        <Notification
          contaninText="請先登入會員"
          linkTo="/signin?p=1"
          linkToText="登入"
          setLoginBtn={setLoginBtn}
        />
      )}
      {addToast && (
        <Notification contaninText="新增食譜成功" iconSize={2} bottom={30}>
          <SiFoodpanda />
        </Notification>
      )}
      <div className="pageRecipes">
        <BreadCrumb />
        <IndexRecipeActivity />
        {/* recipeCategory */}
        <div className="cateBtnContainer pb-3 mb-3">
          <div className={`recipesCateBtnGroup`} style={recipeCollapseStyle}>
            {recipeCate.map((d, i) => {
              return (
                <RecipeCateBtn
                  key={d.id}
                  cateNum={d.id}
                  content={d.name}
                  active={i === parseInt(recipeCateNow) ? true : false}
                  type="recipeCate"
                ></RecipeCateBtn>
              );
            })}
          </div>
          <div
            className="position-absolute top-0 end-0 bg-white h-100 cursorPointer pt-1"
            onClick={() => setRecipeCateCollapse(!recipeCateCollapse)}
          >
            <IconContext.Provider
              value={{
                color: '#444',
                size: '1rem',
                className: `transition ${recipeCateCollapse && 'rotate180'}`,
              }}
            >
              <AiOutlineDown />
            </IconContext.Provider>
          </div>
        </div>
        {/* productCategory */}
        {vw < 1000 && (
          <div className="cateBtnContainer pb-3 mb-3">
            <div className={`recipesCateBtnGroup`} style={productCollapseStyle}>
              {productCate.map((d, i) => {
                return (
                  <div key={d.id}>
                    <RecipeCateBtn
                      cateNum={d.id}
                      content={d.name}
                      active={i === parseInt(productCateNow) ? true : false}
                      type="productCate"
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="position-absolute top-0 end-0 bg-white h-100 cursorPointer pt-1"
              onClick={() => setProductCateCollapse(!productCateCollapse)}
            >
              <IconContext.Provider
                value={{
                  color: '#444',
                  size: '1rem',
                  className: `transition ${productCateCollapse && 'rotate180'}`,
                }}
              >
                <AiOutlineDown />
              </IconContext.Provider>
            </div>
          </div>
        )}
        <div className="recipeToolBar">
          {/* search Button... */}
          <div className="recipeSearchBar">
            <span className="searchFor flexCenter text-nowrap">找食譜</span>
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
          {/* add recipe, my recipe ... btn */}
          <div className="recipeFeatureBtn">
            <IconContext.Provider
              value={{ size: '2.5rem', className: 'recipeFeatureSvg' }}
            >
              <div className="featureBtn" onClick={() => addRecipeHandler()}>
                <AiOutlinePlusCircle />
                <span>寫食譜</span>
              </div>
              <button
                onClick={() => linkToUserPage('/users/recipe?p=1')}
                className="featureBtn border-0 bg-white"
              >
                <AiOutlineBook />
                <span>我的食譜</span>
              </button>
              <button
                onClick={() => linkToUserPage('/users/recipe?p=2')}
                className="featureBtn border-0 bg-white"
              >
                <AiOutlineHeart />
                <span>食譜收藏</span>
              </button>
            </IconContext.Provider>
          </div>
        </div>
        {/* Main Section */}
        <div className="recipeListMain">
          {vw > 1000 && (
            <div className="position-sticky top-0 align-self-start">
              <ProductCategory setProductCateNow={setProductCateNowFunc} />
            </div>
          )}
          <div className="recipeList">
            {/* Choose mode and filter */}
            <div className="recipeMainToolBar flexCenter mb-3">
              <IconContext.Provider
                value={{ size: '2rem', className: 'me-1 recipeModeBtn' }}
              >
                {vw > 765 && (
                  <>
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
                  </>
                )}
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
            {recipeList.length === 0 ? (
              <NoDataDisplay
                noDataText="食譜"
                linkFunc={addRecipeHandler}
                linkText="立即上傳食譜"
              />
            ) : displayMode === 1 ? (
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
            {recipeList.length === 0 || (
              <PaginationBar
                lastPage={lastPage}
                pageNow={pageNow}
                perPage={perPage}
                setPageNow={setPageNow}
                setPerPage={setPerPage}
              />
            )}
          </div>
        </div>
        {/* Create Recipe Form */}
        {searchParams.get('add') === 'true' && (
          <section className="creatingRecipe flexCenter">
            <RecipeCreateForm
              closeCreateRecipe={closeRecipeHandler}
              showToast={showToast}
            />
          </section>
        )}
      </div>
    </>
  );
};

export default Recipes;
