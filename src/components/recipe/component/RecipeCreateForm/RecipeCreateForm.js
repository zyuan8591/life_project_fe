import React from 'react';
import classes from '../../../../styles/moduleCss/recipes/RecipeCreatingForm.module.scss';
import RecipeMaterial from './RecipeMaterial';
import RecipeStep from './RecipeStep';
import { AiOutlineCamera } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const RecipeCreateForm = ({ setCreateRecipe }) => {
  return (
    <div className={classes.container} onClick={(e) => e.stopPropagation()}>
      <div className={`mb-3 ${classes.createController}`}>
        <button className={`${classes.addBtn} ${classes.btn}`}>新增食譜</button>
        <button
          className={`${classes.delBtn} ${classes.btn}`}
          onClick={() => {
            setCreateRecipe(false);
          }}
        >
          取消
        </button>
      </div>
      <form action="" className={classes.addingForm}>
        <div className={classes.formItem}>
          <label>食譜名稱</label>
          <input type="text" placeholder="請輸入食譜名稱" />
        </div>

        <div className={classes.formItem}>
          <label
            htmlFor="createRecipeImg"
            className={`${classes.imgLabel} cursorPointer`}
          >
            <IconContext.Provider value={{ color: '#444', size: '4.5rem' }}>
              <AiOutlineCamera />
            </IconContext.Provider>
            點此新增圖片
          </label>
          <input type="file" id="createRecipeImg" className="d-none" />
        </div>

        <div className={classes.formItem}>
          <label>簡介</label>
          <input type="text" placeholder="請輸入食譜描述 ( 最多200字 )" />
        </div>

        <div className={classes.formItem}>
          <label>食材</label>
          <RecipeMaterial />
          <button className={classes.addMaterialBtn}>加入食材</button>
        </div>

        <div className={classes.formItem}>
          <label>步驟</label>
          <RecipeStep />
          <RecipeStep />
          <RecipeStep />
        </div>
      </form>
    </div>
  );
};

export default RecipeCreateForm;
