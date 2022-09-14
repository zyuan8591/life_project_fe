import React, { useState } from 'react';
import classes from '../../../../styles/moduleCss/recipes/RecipeCreatingForm.module.scss';
import RecipeMaterial from './RecipeMaterial';
import RecipeStep from './RecipeStep';
import { AiOutlineCamera } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useUserRights } from '../../../../usecontext/UserRights';

const RecipeCreateForm = ({ setCreateRecipe }) => {
  const { user } = useUserRights();
  // console.log(user);

  const [formData, setFormData] = useState({
    name: '招牌鍋貼',
    content: '好吃又好玩',
    material: [
      { name: '高麗菜', quantity: '5顆' },
      { name: '水', quantity: '一杯' },
      {},
    ],
    category: 2,
    product_category: 9,
    image: '/img/recipe/recipe_img/ApplePie.jpg',
    user_id: user.id,
    step: [
      {
        image: '/img/recipe/recipe_step_img/ApplePie_01.jpg',
        content: '準備好食材',
      },
      {
        image: '/img/recipe/recipe_step_img/ApplePie_01.jpg',
        content: '吃掉食材',
      },
    ],
  });

  return (
    <div className={classes.container} onClick={(e) => e.stopPropagation()}>
      {/* add and cancel */}
      <div className={`ms-3 ${classes.createController}`}>
        <button className={`mb-1 bg-success ${classes.btn}`}>新增</button>
        <button
          className={`bg-danger ${classes.btn}`}
          onClick={() => {
            setCreateRecipe(false);
          }}
        >
          取消
        </button>
      </div>
      {/* create form */}
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
          <textarea
            type="text"
            placeholder="請輸入食譜描述 ( 最多200字 )"
            rows="5"
          />
        </div>

        <div className={classes.formItem}>
          <label>食材</label>
          <RecipeMaterial />
          <button
            className={classes.addMaterialBtn}
            onClick={(e) => {
              e.preventDefault();
              console.log('click');
            }}
          >
            加入食材
          </button>
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
