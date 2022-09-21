import React, { useEffect, useState } from 'react';
import classes from '../../../../styles/Users/MyRecipe.module.scss';
import { API_URL, API_URL_IMG } from '../../../../utils/config';
import axios from 'axios';
import { useUserRights } from '../../../../usecontext/UserRights';
import PaginationBar from '../../../public_component/PaginationBar';
import { IconContext } from 'react-icons';
import { FaArrowDown, FaRegEye } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import WarnWindow from '../Account/component/WarnWindow';
import RecipeCreateForm from '../../../recipe/component/RecipeCreateForm';
import NoDataDisplay from '../../../public_component/NoDataDisplay';

function MyRecipe() {
  const { user, setUser } = useUserRights();
  const [recipeData, setRecipeData] = useState([]);
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [warn, setWarn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [display, setDisplay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState([]);

  // get data list
  const getDataList = async (apiurl) => {
    let result = await axios.get(apiurl, { withCredentials: true });
    setRecipeData(result.data.data);
    setLastPage(result.data.pagination.lastPage);
  };

  // TRASH BUTTON ====================================================
  // del recipe like
  const delLike = async (recipe_id) => {
    await axios.delete(`${API_URL}/recipes/${recipe_id}/like`, {
      withCredentials: true,
    });
    getDataList(`${API_URL}/recipes?perPage=5&page=${pageNow}&userLike=true`);
  };
  // set recipe valid = 0
  const delRecipe = async (recipe_id) => {
    await axios.put(
      `${API_URL}/recipes/${recipe_id}?valid=0`,
      {},
      { withCredentials: true }
    );
    getDataList(`${API_URL}/recipes?user=${user.id}&perPage=5&page=${pageNow}`);
  };
  // EDIT BUTTON =====================================================
  const closeEditRecipe = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    setDisplay(parseInt(searchParams.get('p')));
  }, [searchParams]);

  useEffect(() => {
    let apiurl = '';
    (async () => {
      if (display === 1) {
        apiurl = `${API_URL}/recipes?user=${user.id}&perPage=5&page=${pageNow}`;
      } else if (display === 2) {
        apiurl = `${API_URL}/recipes?perPage=5&page=${pageNow}&userLike=true`;
      }
      getDataList(apiurl);
    })();
  }, [display, pageNow, isEdit]);

  useEffect(() => {
    setPageNow(1);
  }, [display]);

  return (
    <div className={classes.myRecipe}>
      <h3 className={classes.title}>
        {display === 1 ? '我的食譜' : '食譜收藏'}
      </h3>
      <table className={`${classes.racipeTable} table table-hover`}>
        <thead>
          <tr>
            <th></th>
            <th className="d-flex">
              名稱
              <span
                className={`ms-1 d-flex align-items-center transition ${classes.rotate}`}
              >
                <FaArrowDown />
              </span>
            </th>
            <th>食譜分類</th>
            <th>商品分類</th>
            <th>收藏</th>
            <th>留言</th>

            <th className="d-flex">
              建立時間
              <span
                className={`ms-1 d-flex align-items-center transition ${classes.rotate}`}
              >
                <FaArrowDown />
              </span>
            </th>
            <th></th>
            {display === 1 && <th></th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {recipeData.map((d) => (
            <tr key={d.id}>
              <td className={classes.recipeImgContainer}>
                <img
                  src={`${API_URL_IMG}${d.image}`}
                  alt={d.name}
                  className={`objectContain `}
                />
              </td>
              <td className={classes.data}>{d.name}</td>
              <td>{d.recipe_category_name}</td>
              <td>{d.product_category_name}</td>
              <td>{d.comments}</td>
              <td>{d.likes}</td>
              <td>{d.create_time.slice(0, 10)}</td>
              <td>
                <Link to={`/recipeDetail?id=${d.id}`}>
                  <IconContext.Provider value={{ size: '1rem' }}>
                    <FaRegEye />
                  </IconContext.Provider>
                </Link>
              </td>
              {display === 1 && (
                <td>
                  <i
                    className="fa-solid fa-pen-to-square icon cursorPointer"
                    onClick={() => {
                      setIsEdit(true);
                      setEditData(d.id);
                    }}
                  ></i>
                </td>
              )}
              <td>
                <i
                  className="fa-solid fa-trash icon cursorPointer"
                  onClick={() => {
                    if (display === 2) return delLike(d.id);
                    delRecipe(d.id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {recipeData.length === 0 && <NoDataDisplay noDataText="食譜" />}
      {!!lastPage && (
        <PaginationBar
          lastPage={lastPage}
          pageNow={pageNow}
          setPageNow={setPageNow}
        />
      )}
      <WarnWindow warn={warn} setWarn={setWarn} />
      {isEdit && (
        <section className={`${classes.creatingRecipe} flexCenter`}>
          <RecipeCreateForm
            closeCreateRecipe={closeEditRecipe}
            isEdit={isEdit}
            defaultData={editData}
          />
        </section>
      )}
    </div>
  );
}
export default MyRecipe;
