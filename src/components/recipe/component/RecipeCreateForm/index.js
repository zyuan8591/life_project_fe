import React, { useState, useEffect, DragEvent, useRef } from 'react';
import classes from '../../../../styles/moduleCss/recipes/RecipeCreatingForm.module.scss';
import RecipeMaterial from './RecipeMaterial';
import { AiOutlineCamera } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../../../utils/config';

// TODO: drag
import RecipeStep from './RecipeStep';

const RecipeCreateForm = ({
  closeCreateRecipe,
  isEdit = false,
  defaultData = [],
  showToast = () => {},
}) => {
  // for demo
  const [demo, setDemo] = useState(false);

  // preview file
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;

  // recipe edit mode
  const [edit, setEdit] = useState(isEdit);

  // form 表單物件
  const [addForm, setAddForm] = useState({
    name: '',
    content: '',
    category: 1,
    product_category: 1,
    image: null,
  });
  const [material, setMaterial] = useState([
    { id: uuidv4(), name: '', quantity: '' },
  ]);
  const [step, setStep] = useState([
    { id: uuidv4(), step: 1, img: null, content: '' },
  ]);

  const [recipeCate, setRecipeCate] = useState([]);
  const [productCate, setProductCate] = useState([]);
  const [stepDefault, setStepDefault] = useState(0);

  useEffect(() => {
    (async () => {
      // get all recipe cate name
      let recipeCateResult = await axios.get(`${API_URL}/recipes/category`);
      let recipeCateData = recipeCateResult.data;
      setRecipeCate(recipeCateData);
      // get all product cate name
      let productCateResult = await axios.get(`${API_URL}/products/category`);
      let productCateData = productCateResult.data;
      setProductCate(productCateData);

      // editing default value
      if (isEdit) {
        let id = defaultData;
        let recipe = await axios.get(`${API_URL}/recipes/${id}`);
        let material = await axios.get(`${API_URL}/recipes/${id}/material`);
        let step = await axios.get(`${API_URL}/recipes/${id}/step`);
        setStepDefault(step.data.length);
        recipe = recipe.data.map((d) => {
          let { name, content, category, product_category, image } = d;
          return {
            name,
            content,
            category,
            product_category,
            image: API_URL_IMG + image,
          };
        });
        setAddForm(recipe[0]);
        material = material.data.map((d) => {
          return { id: d.id, name: d.name, quantity: d.quantity };
        });
        setMaterial(material);
        step = step.data.map((d) => {
          return {
            id: d.id,
            step: d.step,
            img: API_URL_IMG + d.img,
            content: d.content,
          };
        });
        setStep(step);
      }
    })();
  }, []);

  // test useeffect
  useEffect(() => {
    console.log('step', step);
    console.log('default', stepDefault);
  }, [step]);

  // recipe info handler
  const inputChangeHandler = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  // recipe img handler
  const updateImgHandler = (e) => {
    const file = e.target.files[0];
    // check image type
    if (!file.type.match(imageMimeType)) {
      console.error('Image mime type is not valid');
      return;
    }
    setFile(file);
    setAddForm({ ...addForm, image: file });
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

  // materail input change
  const materialChangerHandler = (val, i, input) => {
    let newData = [...material];
    if (input === 'name') newData[i].name = val;
    if (input === 'q') newData[i].quantity = val;
    setMaterial(newData);
  };

  // add material
  const addMaterialBtn = () => {
    setMaterial([...material, { id: uuidv4(), name: '', quantity: '' }]);
  };
  // delete material
  const deleteMaterailBtn = (i) => {
    let newData = [...material];
    newData.splice(i, 1);
    if (newData.length === 0) return;
    setMaterial(newData);
  };

  // step sort
  const sortStep = (data) => {
    return [...data].map((d, i) => {
      return { ...d, step: i + 1 };
    });
  };
  // step input change
  const stepChangeHandler = (val, i, input) => {
    let newData = [...step];
    if (input === 'content') newData[i].content = val;
    if (input === 'img') newData[i].img = val;
    setStep(sortStep(newData));
  };
  // add step
  const addStepBtn = (i) => {
    let newData = [...step];
    newData.splice(i + 1, 0, { id: uuidv4(), step: i, img: null, content: '' });
    setStep(sortStep(newData));
  };
  // delete step
  const deleteStepBtn = (i) => {
    let newData = [...step];
    newData.splice(i, 1);
    if (newData.length === 0) return;
    setStep(sortStep(newData));
  };

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // recipe formdata
      let formData = new FormData();
      for (const key in addForm) {
        formData.append(key, addForm[key]);
      }
      // recipe step formdata
      let stepFormData = new FormData();
      let stepData = [];
      // let imgData = [];
      let contentData = [];
      for (let i = 0; i < step.length; i++) {
        stepData.push(step[i].step);
        // imgData.push(step[i].img);
        contentData.push(step[i].content);
        stepFormData.append('img', step[i].img);
      }
      stepFormData.append('step', stepData);
      // for (let i = 0; i < imgData.length; i++) {
      // stepFormData.append('img', imgData[i]);
      // }
      stepFormData.append('content', contentData);

      // connect to api ===============================================
      if (!isEdit) {
        // insert recipe
        let response = await axios.post(`${API_URL}/recipes`, formData, {
          withCredentials: true,
        });
        let insertId = response.data.id;
        // insert recipe material
        await axios.post(
          `${API_URL}/recipes/${insertId}/material`,
          { material },
          {
            withCredentials: true,
          }
        );
        await axios.post(`${API_URL}/recipes/${insertId}/step`, stepFormData, {
          withCredentials: true,
        });
        showToast();
      } else if (isEdit) {
        let id = defaultData;
        // put recipe
        let recipeData = null;
        if (typeof addForm.image === 'object') recipeData = formData;
        if (typeof addForm.image === 'string') recipeData = { ...addForm };
        await axios.put(`${API_URL}/recipes/${id}`, recipeData, {
          withCredentials: true,
        });
        // del origin material
        await axios.delete(`${API_URL}/recipes/${id}/material`, {
          withCredentials: true,
        });
        // post new material
        await axios.post(
          `${API_URL}/recipes/${id}/material`,
          { material },
          {
            withCredentials: true,
          }
        );
        let putContent = [];
        let putImageStep = [];
        let postStepData = [];
        let postContentData = [];
        let putImageFormData = new FormData();
        let postFormData = new FormData();
        step.map((d) => {
          if (d.step > stepDefault) {
            postStepData.push(d.step);
            postContentData.push(d.content);
            postFormData.append('img', d.img);
            return;
          }
          if (typeof d.img === 'object') {
            putImageFormData.append('img', d.img);
            putImageStep.push(d.step);
            return;
          }
          putContent.push([d.step, d.content]);
        });
        // put step content
        await axios.put(
          `${API_URL}/recipes/${id}/step?mode=content`,
          { putContent },
          { withCredentials: true }
        );
        // put step image
        if (putImageStep.length) {
          putImageFormData.append('step', putImageStep);
          await axios.put(
            `${API_URL}/recipes/${id}/step?mode=image`,
            putImageFormData,
            { withCredentials: true }
          );
        }
        // post new step
        postFormData.append('step', postStepData);
        postFormData.append('content', postContentData);
        await axios.post(`${API_URL}/recipes/${id}/step`, postFormData, {
          withCredentials: true,
        });
      }
      // close form
      closeCreateRecipe();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.container} onClick={(e) => e.stopPropagation()}>
      {/* add and cancel and demo button */}
      <div className={`ms-3 ${classes.createController}`}>
        <button
          className={`mb-1 bg-success ${classes.btn}`}
          onClick={submitHandler}
        >
          {isEdit ? '修改' : '新增'}
        </button>
        <button
          className={`mb-1 bg-danger ${classes.btn}`}
          onClick={() => closeCreateRecipe()}
        >
          取消
        </button>
        {/* demo button */}
        {!isEdit && (
          <button
            className={`mb-1 bg-warning text-dark ${classes.btn}`}
            onClick={() => {
              setAddForm({
                name: '月亮蝦餅',
                content:
                  '在家也能輕鬆做月亮蝦餅喔！蝦餅名稱的由來，是因為在還沒炸之前是呈現圓圓白白像月亮的樣子，所以就叫月亮蝦餅。這道經典美食更常蟬聯團購榜首呢！如果你想品嘗人氣團購商品，又不想面對遙遙無期的漫長等待，那麼就一定要來學學這道料理，搭配氣炸烤箱現做現炸快速又方便，一鍵輕鬆免看顧，讓您享受美味不必久等。',
                category: 7,
                product_category: 7,
              });
              setMaterial([
                { id: uuidv4(), name: '白蝦', quantity: '8尾' },
                { id: uuidv4(), name: '海蝦仁', quantity: '280公克' },
                { id: uuidv4(), name: '豬油', quantity: '80公克' },
                { id: uuidv4(), name: '花枝', quantity: '280公克' },
                { id: uuidv4(), name: '雞蛋', quantity: '1顆' },
                { id: uuidv4(), name: '薑', quantity: '2公克' },
                { id: uuidv4(), name: '蒜頭', quantity: '4瓣' },
                { id: uuidv4(), name: '白胡椒粉', quantity: '1/4小匙' },
                { id: uuidv4(), name: '鹽巴', quantity: '1/4小匙' },
                { id: uuidv4(), name: '香油', quantity: '1小匙' },
                { id: uuidv4(), name: '春捲皮', quantity: '2片' },
              ]);
              setStep([
                {
                  id: uuidv4(),
                  step: 1,
                  content: '準備所有食材，白蝦去殼，薑切成薑末，蒜切成蒜末。',
                },
                {
                  id: uuidv4(),
                  step: 2,
                  content: '白蝦用刀子拍扁，並剁成碎狀。',
                },
                {
                  id: uuidv4(),
                  step: 3,
                  content:
                    '將花枝、蝦仁、豬油放調理杯中，用電動攪拌棒打成泥狀。',
                },
                {
                  id: uuidv4(),
                  step: 4,
                  content:
                    '準備一個大容器，放進剁好的白蝦、攪打好的花枝蝦仁泥、雞蛋、薑末、蒜末、白胡椒粉、鹽巴、香油。',
                },
                {
                  id: uuidv4(),
                  step: 5,
                  content: '用手攪拌均勻，拌到稍微有黏性出來即可。。',
                },
                {
                  id: uuidv4(),
                  step: 6,
                  content:
                    '拿出1片潤餅皮，粗面朝上，平均放入餡料，再蓋上另外1片潤餅皮，一樣粗面朝內。',
                },
                {
                  id: uuidv4(),
                  step: 7,
                  content: '將餅皮平均壓平，用刀子在表面戳洞透氣。',
                },
                {
                  id: uuidv4(),
                  step: 8,
                  content: '將月亮蝦餅放上瀝油不沾烤盤，在表面刷上植物油。',
                },
                {
                  id: uuidv4(),
                  step: 9,
                  content:
                    '放進氣炸烤箱中層，以200度氣炸13分後，再翻面繼續氣炸5分鐘至上色。',
                },
                {
                  id: uuidv4(),
                  step: 10,
                  content: '待行程結束即可切開擺盤享用。',
                },
              ]);
              setDemo(true);
            }}
          >
            填入
          </button>
        )}
      </div>
      {/* create form */}
      <form action="" className={classes.addingForm}>
        {/* recipe info */}
        <>
          {/* title */}
          <div className={classes.formItem}>
            <label className="fs-4">食譜名稱</label>
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
              {fileDataURL || edit ? (
                <img
                  src={fileDataURL || addForm.image}
                  alt="prev"
                  className="w-100"
                />
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
            <label className="fs-4">簡介</label>
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
              className={classes.cateSelect}
              onChange={inputChangeHandler}
              value={addForm.category}
            >
              {recipeCate.map((d) => {
                if (d.id === 0) return;
                return (
                  <option value={d.id} key={d.id}>
                    {d.name}
                  </option>
                );
              })}
            </select>
            <select
              name="product_category"
              className={classes.cateSelect}
              onChange={inputChangeHandler}
              value={addForm.product_category}
            >
              {productCate.map((d) => {
                if (d.id === 0) return;
                return (
                  <option value={d.id} key={d.id}>
                    {d.name}
                  </option>
                );
              })}
            </select>
          </div>
        </>
        {/* material */}
        <div className={classes.formItem}>
          <label className="fs-4">食材</label>
          {/* TODO: drag */}
          <div>
            {material.map((d, i) => {
              return (
                <RecipeMaterial
                  key={d.id}
                  i={i}
                  data={d}
                  demo={demo}
                  edit={edit}
                  delHandler={deleteMaterailBtn}
                  onchange={materialChangerHandler}
                ></RecipeMaterial>
              );
            })}
          </div>
          <button
            className={classes.addMaterialBtn}
            onClick={(e) => {
              e.preventDefault();
              addMaterialBtn();
            }}
          >
            加入食材
          </button>
        </div>

        <div className={classes.formItem}>
          <label className="fs-4">步驟</label>
          {step.map((d, i) => (
            <RecipeStep
              key={d.id}
              i={i}
              data={d}
              demo={demo}
              edit={edit}
              changeStep={stepChangeHandler}
              delStep={deleteStepBtn}
              addStep={addStepBtn}
            ></RecipeStep>
          ))}
        </div>
      </form>
    </div>
  );
};

export default RecipeCreateForm;
