import React, { useEffect, useState } from 'react';
import classes from '../../../../styles/Users/MyRecipe.module.scss';
import { API_URL, API_URL_IMG } from '../../../../utils/config';
import axios from 'axios';
import { useUserRights } from '../../../../usecontext/UserRights';

function MyRecipe() {
  const { user, setUser } = useUserRights();
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/recipes?user=${user.id}`);
      setRecipeData(result.data.data);
    })();
  }, []);

  return (
    <div className={classes.myRecipe}>
      <h3 className={classes.title}>我的食譜</h3>
      <table className={`${classes.racipeTable} table table-striped`}>
        <thead>
          <tr>
            <th></th>
            <th>名稱</th>
            <th>食譜分類</th>
            <th>商品分類</th>
            <th>收藏</th>
            <th>留言</th>
            <th>建立時間</th>
          </tr>
        </thead>
        <tbody>
          {recipeData.map((d) => (
            <tr key={d.id}>
              <td className={classes.recipeImgContainer}>
                <img
                  src={`${API_URL_IMG}${d.image}`}
                  alt={d.name}
                  className="objectContain"
                />
              </td>
              <td className={classes.data}>{d.name}</td>
              <td>{d.recipe_category_name}</td>
              <td>{d.product_category_name}</td>
              <td>{d.comments}</td>
              <td>{d.likes}</td>
              <td>{d.create_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MyRecipe;
