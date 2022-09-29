import React, { useState, useEffect, DragEvent, useRef } from 'react';
import classes from '../../../../styles/moduleCss/recipes/RecipeCreatingForm.module.scss';
import RecipeMaterial from './RecipeMaterial';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../../../utils/config';
import RecipeIntro from './RecipeIntro';

import RecipeStep from './RecipeStep';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { message } from 'antd';

const RecipeCreateForm = ({
  closeCreateRecipe,
  isEdit = false,
  defaultData = [],
  showToast = () => {},
  showUpdataHint = () => {},
}) => {
  // for demo
  const [demo, setDemo] = useState(false);

  // recipe edit mode
  const [edit, setEdit] = useState(isEdit);

  // form 表單物件 ===================================================
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
    { id: uuidv4(), step: 1, img: null, content: '', error: '' },
  ]);

  // error msg
  const [introError, setIntroError] = useState({
    name: '',
    content: '',
    image: '',
  });
  const resetError = (obj) => {
    let newIntroError = { ...obj };
    for (let prop in newIntroError) {
      newIntroError[prop] = '';
    }
    return newIntroError;
  };
  const [materialError, setMaterialError] = useState([
    {
      name: '',
      quantity: '',
    },
  ]);
  const resetMaterialError = (material) => {
    let newError = material.map((m) => {
      return {
        name: m.name.trim() ? '' : '請輸入食材',
        quantity: m.quantity.trim() ? '' : '請輸入份量',
      };
    });
    return newError;
  };

  const [stepDefault, setStepDefault] = useState(0);

  // get initial data ==================================================
  useEffect(() => {
    (async () => {
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
        setIntroError(resetError(introError));
        setAddForm(recipe[0]);
        material = material.data.map((d) => {
          return { id: d.id, name: d.name, quantity: d.quantity };
        });
        setMaterialError(resetMaterialError(material));
        setMaterial(material);
        step = step.data.map((d) => {
          return {
            id: d.id,
            step: d.step,
            img: API_URL_IMG + d.img,
            content: d.content,
            error: '',
          };
        });
        setStep(step);
      }
    })();
  }, []);

  // Material ==========================================================
  // materail input change
  const materialChangerHandler = (val, i, input) => {
    let newData = [...material];
    if (input === 'name') newData[i].name = val;
    if (input === 'q') newData[i].quantity = val;
    setMaterial(newData);
  };
  // add material
  const addMaterialBtn = () => {
    setMaterialError([...materialError, { name: '', quantity: '' }]);
    setMaterial([...material, { id: uuidv4(), name: '', quantity: '' }]);
  };
  // delete material
  const deleteMaterailBtn = (i) => {
    let newData = [...material];
    newData.splice(i, 1);
    if (newData.length === 0) return;
    setMaterial(newData);
    let newError = [...materialError];
    newError.splice(i, 1);
    setMaterialError(newError);
  };
  // Step ===============================================================
  // step DragEnd
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    let newStep = [...step];
    let add = newStep[source.index];
    newStep.splice(source.index, 1);
    newStep.splice(destination.index, 0, add);
    setStep(sortStep(newStep));
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
    if (input === 'error') newData[i].error = val;
    setStep(sortStep(newData));
  };
  // add step
  const addStepBtn = (i) => {
    let newData = [...step];
    newData.splice(i + 1, 0, {
      id: uuidv4(),
      step: i,
      img: null,
      content: '',
      error: '',
    });
    setStep(sortStep(newData));
  };
  // delete step
  const deleteStepBtn = (i) => {
    let newData = [...step];
    newData.splice(i, 1);
    if (newData.length === 0) return;
    setStep(sortStep(newData));
  };

  // submit handler ======================================================
  const checkFormValid = () => {
    let formValid = true;
    let newIntroError = { ...introError };
    let newMaterialError = resetMaterialError(material);
    for (let prop in introError) {
      if (prop === 'image' && !addForm.image) {
        formValid = false;
        newIntroError.image = '請上傳圖片';
      }
      if (prop === 'name' && !addForm.name) {
        formValid = false;
        newIntroError.name = '請輸入食譜名稱';
      }
      if (prop === 'content' && !addForm.content) {
        formValid = false;
        newIntroError.content = '請輸入食譜說明';
      }
    }
    newMaterialError.forEach((error) => {
      if (error.name || error.quantity) formValid = false;
    });
    let newStep = [...step];
    newStep = newStep.map((step) => {
      if (step.error) formValid = false;
      return {
        ...step,
        error: !step.content || !step.img ? '請輸入食譜步驟及上傳圖片' : '',
      };
    });
    setStep(newStep);
    setMaterialError(newMaterialError);
    setIntroError(newIntroError);
    return formValid;
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!checkFormValid()) return message.error('請完成食譜後再新增');

    try {
      // recipe formdata
      let formData = new FormData();
      for (const key in addForm) {
        formData.append(key, addForm[key]);
      }
      // recipe step formdata
      let stepFormData = new FormData();
      let stepData = [];
      let contentData = [];
      for (let i = 0; i < step.length; i++) {
        stepData.push(step[i].step);
        contentData.push(step[i].content);
        stepFormData.append('img', step[i].img);
      }
      stepFormData.append('step', stepData);
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
        showUpdataHint();
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.container} onClick={(e) => e.stopPropagation()}>
        {/* add and cancel and demo button */}
        <div className={`ms-3 ${classes.createController}`}>
          <button
            className={`mb-1 ${classes.btn} ${classes.add}`}
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
              className={`mb-1 text-white ${classes.btn} ${classes.demo}`}
              onClick={() => {
                setIntroError(resetError(introError));
                setAddForm({
                  name: '月亮蝦餅',
                  content:
                    '在家也能輕鬆做月亮蝦餅喔！蝦餅名稱的由來，是因為在還沒炸之前是呈現圓圓白白像月亮的樣子，所以就叫月亮蝦餅。這道經典美食更常蟬聯團購榜首呢！如果你想品嘗人氣團購商品，又不想面對遙遙無期的漫長等待，那麼就一定要來學學這道料理，搭配氣炸烤箱現做現炸快速又方便，一鍵輕鬆免看顧，讓您享受美味不必久等。',
                  category: 7,
                  product_category: 7,
                });
                let demoMaterial = [
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
                ];
                setMaterialError(resetMaterialError(demoMaterial));
                setMaterial(demoMaterial);
                setStep([
                  {
                    id: uuidv4(),
                    step: 1,
                    content: '準備所有食材，白蝦去殼，薑切成薑末，蒜切成蒜末。',
                    error: '',
                  },
                  {
                    id: uuidv4(),
                    step: 2,
                    content: '白蝦用刀子拍扁，並剁成碎狀。',
                    error: '',
                  },
                  {
                    id: uuidv4(),
                    step: 3,
                    content:
                      '將花枝、蝦仁、豬油放調理杯中，用電動攪拌棒打成泥狀。',
                    error: '',
                  },
                  {
                    id: uuidv4(),
                    step: 4,
                    content:
                      '準備一個大容器，放進剁好的白蝦、攪打好的花枝蝦仁泥、雞蛋、薑末、蒜末、白胡椒粉、鹽巴、香油。',
                    error: '',
                  },
                  {
                    id: uuidv4(),
                    step: 5,
                    content: '用手攪拌均勻，拌到稍微有黏性出來即可。。',
                    error: '',
                  },
                  {
                    id: uuidv4(),
                    step: 6,
                    content:
                      '拿出1片潤餅皮，粗面朝上，平均放入餡料，再蓋上另外1片潤餅皮，一樣粗面朝內。',
                    error: '',
                  },
                  {
                    id: uuidv4(),
                    step: 7,
                    content: '將月亮蝦餅放上瀝油不沾烤盤，在表面刷上植物油。',
                    error: '',
                  },
                  {
                    id: uuidv4(),
                    step: 8,
                    content:
                      '放進氣炸烤箱中層，以200度氣炸13分後，再翻面繼續氣炸5分鐘至上色。',
                    error: '',
                  },
                  {
                    id: uuidv4(),
                    step: 9,
                    content: '待行程結束即可切開擺盤享用。',
                    error: '',
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
          <RecipeIntro
            addForm={addForm}
            setAddForm={setAddForm}
            edit={edit}
            error={introError}
            setError={setIntroError}
          />
          {/* material */}
          <div className={classes.formItem}>
            <label className="fs-4 mb-2">食材</label>
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
                  error={materialError}
                  setError={setMaterialError}
                ></RecipeMaterial>
              );
            })}
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
          {/* steps */}
          <div className={classes.formItem}>
            <label className="fs-4">步驟</label>
            {/* droppableId -> only identify the droppable is unique */}
            <Droppable droppableId="stepList">
              {(provided) => (
                <div
                  className="steps"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </form>
      </div>
    </DragDropContext>
  );
};

export default RecipeCreateForm;
