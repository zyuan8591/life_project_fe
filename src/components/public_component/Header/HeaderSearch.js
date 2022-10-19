import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineSearch } from 'react-icons/ai';
import '../../../styles/_headerSearch.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../utils/config';

const HeaderSearch = ({ setSearch }) => {
  const [searchKey, setSearchKey] = useState('');
  const [searchRecipeData, setRecipeSearchData] = useState([]);
  const [searchProductData, setProductSearchData] = useState([]);
  const [searchPicnicOfficialData, setPicnicOfficialSearchData] = useState([]);
  const [searchPicnicPrivateData, setPicnicPrivateSearchData] = useState([]);
  const [searchCampingData, setCampingSearchData] = useState([]);

  // search bar key handler
  useEffect(() => {
    if (!searchKey || searchKey === '') {
      setProductSearchData([]);
      setRecipeSearchData([]);
      setCampingSearchData([]);
      setPicnicPrivateSearchData([]);
      setPicnicOfficialSearchData([]);
      return;
    }
    (async () => {
      // Product
      let productResult = await axios.get(
        `${API_URL}/products?productName=${searchKey}`
      );
      let productData = productResult.data.data.map((d) => {
        return { id: d.id, name: d.name };
      });
      setProductSearchData(productData);
      // Recipe
      let result = await axios.get(`${API_URL}/recipes?name=${searchKey}`);
      let recipeData = result.data.data.map((d) => {
        return { id: d.id, name: d.name };
      });
      setRecipeSearchData(recipeData);
      // PICNIC official
      let picnicResult = await axios.get(
        `${API_URL}/picnic/official?searchWord=${searchKey}`
      );
      let picnicData = picnicResult.data.data.map((d) => {
        return { id: d.id, name: d.picnic_title };
      });
      setPicnicOfficialSearchData(picnicData);
      // PICNIC private
      let picnicGroupResult = await axios.get(
        `${API_URL}/picnic/group?searchWord=${searchKey}`
      );
      let picnicGroupData = picnicGroupResult.data.data.map((d) => {
        return { id: d.id, name: d.picnic_title };
      });
      setPicnicPrivateSearchData(picnicGroupData);
      // Camping
      let campingResult = await axios.get(
        `${API_URL}/camping?search=${searchKey}`
      );
      let campingData = campingResult.data.result.map((d) => {
        return { id: d.id, name: d.title };
      });
      setCampingSearchData(campingData);
    })();
  }, [searchKey]);

  const inputHandler = (e) => {
    setSearchKey(e.target.value);
  };
  return (
    <div
      className="headerSearchSection position-absolute top-0 start-0"
      onClick={() => setSearch(false)}
    >
      <div
        className="headerSearch bg-white rounded-2 pb-3 mx-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="headerSearchInput position-sticky top-0 bg-white px-3 py-3 rounded-2">
          <input
            value={searchKey}
            type="text"
            placeholder="搜尋"
            className="w-100 rounded-2 "
            onChange={(e) => inputHandler(e)}
          />
          <IconContext.Provider
            value={{
              color: '#817161',
              size: '1.75rem',
              className:
                'position-absolute top-50 translate-middle-y headerSearchIcon',
            }}
          >
            <AiOutlineSearch />
          </IconContext.Provider>
        </div>
        <div className="searchResultContainer px-3 me-1">
          {searchRecipeData.length === 0 &&
          searchProductData.length === 0 &&
          searchPicnicOfficialData.length === 0 &&
          searchPicnicPrivateData.length === 0 &&
          searchCampingData.length === 0 ? (
            <div className="flexCenter">目前無搜尋結果</div>
          ) : (
            <>
              {/* product */}
              {searchProductData.length !== 0 && (
                <>
                  <p className="fs-6 mb-2 headerSearchResultTitle">商品</p>
                  <ul className="headerSearchResult w-100 mb-3 ps-0 d-flex flex-column rounded-2">
                    {searchProductData.map((d, i) => {
                      return (
                        <Link to={`/products/${d.id}`} key={d.id}>
                          {d.name}
                        </Link>
                      );
                    })}
                  </ul>
                </>
              )}
              {/* recipe */}
              {searchRecipeData.length !== 0 && (
                <>
                  <p className="fs-6 mb-2 headerSearchResultTitle">食譜</p>
                  <ul className="headerSearchResult w-100 mb-3 ps-0 d-flex flex-column rounded-2">
                    {searchRecipeData.map((d, i) => {
                      return (
                        <Link to={`/recipeDetail?id=${d.id}`} key={d.id}>
                          {d.name}
                        </Link>
                      );
                    })}
                  </ul>
                </>
              )}
              {/* picnic official */}
              {searchPicnicOfficialData.length !== 0 && (
                <>
                  <p className="fs-6 mb-2 headerSearchResultTitle">野餐活動</p>
                  <ul className="headerSearchResult w-100 mb-3 ps-0 d-flex flex-column rounded-2">
                    {searchPicnicOfficialData.map((d, i) => {
                      return (
                        <Link
                          to={`/activity/picnic/official/${d.id}`}
                          key={d.id}
                        >
                          {d.name}
                        </Link>
                      );
                    })}
                  </ul>
                </>
              )}
              {/* picnic private */}
              {searchPicnicPrivateData.length !== 0 && (
                <>
                  <p className="fs-6 mb-2 headerSearchResultTitle">野餐揪團</p>
                  <ul className="headerSearchResult w-100 mb-3 ps-0 d-flex flex-column rounded-2">
                    {searchPicnicPrivateData.map((d, i) => {
                      return (
                        <Link to={`/activity/picnic/group/${d.id}`} key={d.id}>
                          {d.name}
                        </Link>
                      );
                    })}
                  </ul>
                </>
              )}
              {/* camping */}
              {searchCampingData.length !== 0 && (
                <>
                  <p className="fs-6 mb-2 headerSearchResultTitle">露營活動</p>
                  <ul className="headerSearchResult w-100 mb-3 ps-0 d-flex flex-column rounded-2">
                    {searchCampingData.map((d, i) => {
                      return (
                        <Link to={`/activity/camping/${d.id}`} key={d.id}>
                          {d.name}
                        </Link>
                      );
                    })}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
