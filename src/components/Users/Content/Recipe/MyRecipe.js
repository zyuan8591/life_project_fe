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
import Notification from '../../../activity/Notification';
import { SiFoodpanda } from 'react-icons/si';

function MyRecipe() {
  const { user, setUser } = useUserRights();
  const [recipeData, setRecipeData] = useState([]);
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [warn, setWarn] = useState(false);
  const [warn1, setWarn1] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [display, setDisplay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const [delID, setDelID] = useState();
  const [hint, setHint] = useState(false);
  const [updataHint, setUpdataHint] = useState(false);
  function pop(id) {
    setDelID(id);
    setWarn(true);
  }
  const showHint = () => {
    setHint(true);
    setTimeout(() => {
      setHint(false);
    }, 2000);
  };
  const showUpdataHint = () => {
    setUpdataHint(true);
    setTimeout(() => {
      setUpdataHint(false);
    }, 2000);
  };
  // del recipe like
  const handleDelCollect = async () => {
    await axios.delete(`${API_URL}/recipes/${delID}/like`, {
      withCredentials: true,
    });
    getDataList(`${API_URL}/recipes?perPage=5&page=${pageNow}&userLike=true`);
    setWarn(false);
    showHint();
  };
  function delPop(id) {
    setDelID(id);
    setWarn1(true);
  }
  // set recipe valid = 0
  const handleDelRecipe = async () => {
    await axios.put(
      `${API_URL}/recipes/${delID}?valid=0`,
      {},
      { withCredentials: true }
    );
    getDataList(`${API_URL}/recipes?user=${user.id}&perPage=5&page=${pageNow}`);
    getDataList(`${API_URL}/recipes?user=${user.id}&perPage=5&page=${pageNow}`);
    setWarn1(false);
    showHint();
  };

  // get data list
  const getDataList = async (apiurl) => {
    let result = await axios.get(apiurl, { withCredentials: true });
    setRecipeData(result.data.data);
    setLastPage(result.data.pagination.lastPage);
  };

  // TRASH BUTTON ====================================================

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
      {hint && (
        <Notification contaninText="已刪除此食譜" iconSize={2} bottom={30}>
          <SiFoodpanda />
        </Notification>
      )}
      {updataHint && (
        <Notification contaninText="食譜修改成功" iconSize={2} bottom={30}>
          <SiFoodpanda />
        </Notification>
      )}
      <WarnWindow
        warn={warn}
        setWarn={setWarn}
        clickFunction={handleDelCollect}
        text1="確定要移除此項活動嗎？"
      />
      <WarnWindow
        warn={warn1}
        setWarn={setWarn1}
        clickFunction={handleDelRecipe}
        text1="確定要移除此項活動嗎？"
      />

      <h3 className={classes.title}>
        {display === 1 ? '我的食譜' : '食譜收藏'}
      </h3>
      <table className={`${classes.racipeTable} table table-hover `}>
        <thead>
          <tr>
            <th></th>
            <th>名稱</th>
            <th>食譜分類</th>
            <th>商品分類</th>
            <th>收藏</th>
            <th>留言</th>
            <th>建立時間</th>
            {display === 1 && <th></th>}
            {display === 2 && <th></th>}
          </tr>
        </thead>
        <tbody>
          {recipeData.map((d) => (
            <tr key={d.id}>
              <td className={classes.recipeImgContainer}>
                <img
                  src={`${API_URL_IMG}${d.image}`}
                  alt={d.name}
                  className="objectContain recipeImg"
                />
              </td>
              <td className={classes.data}>{d.name}</td>
              <td>{d.recipe_category_name}</td>
              <td>{d.product_category_name}</td>
              <td>{d.comments}</td>
              <td>{d.likes}</td>
              <td>{d.create_time.slice(0, 10)}</td>

              {display === 1 && (
                <td className={classes.recipeIcon}>
                  <Link to={`/recipeDetail?id=${d.id}`}>
                    <IconContext.Provider value={{ size: '1rem' }}>
                      <FaRegEye />
                    </IconContext.Provider>
                  </Link>
                  <i
                    className="fa-solid fa-pen-to-square icon cursorPointer"
                    onClick={() => {
                      setIsEdit(true);
                      setEditData(d.id);
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-trash icon cursorPointer"
                    onClick={() => {
                      if (display === 2) return pop(d.id);
                      delPop(d.id);
                    }}
                  ></i>
                </td>
              )}
              {display === 2 && (
                <td className={`${classes.recipeIcon} p-0`}>
                  <Link to={`/recipeDetail?id=${d.id}`}>
                    <IconContext.Provider value={{ size: '1rem' }}>
                      <FaRegEye />
                    </IconContext.Provider>
                  </Link>
                  <i
                    className="fa-solid fa-trash icon cursorPointer ms-3"
                    onClick={() => {
                      if (display === 2) return pop(d.id);
                      delPop(d.id);
                    }}
                  ></i>
                </td>
              )}
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

      {isEdit && (
        <section className={`${classes.creatingRecipe} flexCenter`}>
          <RecipeCreateForm
            closeCreateRecipe={closeEditRecipe}
            isEdit={isEdit}
            defaultData={editData}
            showUpdataHint={showUpdataHint}
          />
        </section>
      )}
    </div>
  );
}
export default MyRecipe;
