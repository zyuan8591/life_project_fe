import React, { useState, useEffect } from 'react';
import classes from '../../../../styles/moduleCss/recipes/RecipeCreatingForm.module.scss';
import RecipeMaterial from './RecipeMaterial';
import RecipeStep from './RecipeStep';
import { AiOutlineCamera } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useUserRights } from '../../../../usecontext/UserRights';

const RecipeCreateForm = ({ setCreateRecipe, recipeCate }) => {
  const { user } = useUserRights();

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;

  // form 表單物件
  const [addForm, setAddForm] = useState({
    name: '招牌鍋貼',
    content: '好吃又好玩',
    category: 1,
    product_category: 1,
    image: null,
    // TODO: 記得之後要刪除
    user_id: 5,
    material: [
      { name: '高麗菜', quantity: '5顆' },
      { name: '水', quantity: '一杯' },
      {},
    ],
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

  const inputChangeHandler = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const updateImgHandler = (e) => {
    const file = e.target.files[0];
    // check image type
    if (!file.type.match(imageMimeType)) {
      console.error('Image mime type is not valid');
      return;
    }
    setFile(file);
    setAddForm({ ...addForm, [e.target.name]: e.target.files[0] });
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      // get image url
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    // unmounting
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

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
        {/* title */}
        <div className={classes.formItem}>
          <label>食譜名稱</label>
          <input
            name="name"
            type="text"
            placeholder="請輸入食譜名稱"
            value={addForm.name}
            onChange={inputChangeHandler}
          />
        </div>
        {/* image */}
        <div className={classes.formItem}>
          <label
            htmlFor="createRecipeImg"
            className={`${classes.imgLabel} cursorPointer h-auto`}
          >
            {fileDataURL ? (
              <img src={fileDataURL} alt="prev" className="w-100" />
            ) : (
              <IconContext.Provider value={{ color: '#444', size: '4.5rem' }}>
                <AiOutlineCamera />
                <span>點此新增圖片</span>
              </IconContext.Provider>
            )}
          </label>
          <input
            name="image"
            type="file"
            id="createRecipeImg"
            className="d-none"
            onChange={updateImgHandler}
          />
        </div>
        {/* content */}
        <div className={classes.formItem}>
          <label>簡介</label>
          <textarea
            name="content"
            type="text"
            placeholder="請輸入食譜描述 ( 最多200字 )"
            rows="5"
            value={addForm.content}
            onChange={inputChangeHandler}
          />
        </div>
        {/* category */}
        <div className="d-flex gap-3 mb-2">
          <select
            name="category"
            id=""
            className={classes.cateSelect}
            onChange={inputChangeHandler}
          >
            {recipeCate.map((d) => {
              if (d.id === 0) return;
              return (
                <option value={d.id} key={d.id} required>
                  {d.name}
                </option>
              );
            })}
          </select>
          <select
            name="product_category"
            className={classes.cateSelect}
            onChange={inputChangeHandler}
          >
            {recipeCate.map((d) => {
              if (d.id === 0) return;
              return (
                <option value={d.id} key={d.id} required>
                  {d.name}
                </option>
              );
            })}
          </select>
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
