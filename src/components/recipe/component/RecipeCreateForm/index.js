import React, { useState, useEffect, DragEvent } from 'react';
import classes from '../../../../styles/moduleCss/recipes/RecipeCreatingForm.module.scss';
import RecipeMaterial from './RecipeMaterial';
import RecipeStep from './RecipeStep';
import { AiOutlineCamera } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { v4 as uuidv4 } from 'uuid';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';

const RecipeCreateForm = ({ setCreateRecipe, recipeCate }) => {
  // for demo
  const [demo, setDemo] = useState(false);

  // preview file
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;

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
      // insert recipe
      let formData = new FormData();
      for (const key in addForm) {
        formData.append(key, addForm[key]);
      }
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
      // insert recipe step
      let stepFormData = new FormData();
      let stepData = [];
      let imgData = [];
      let contentData = [];
      for (let i = 0; i < step.length; i++) {
        stepData.push(step[i].step);
        imgData.push(step[i].img);
        contentData.push(step[i].content);
      }
      stepFormData.append('step', stepData);
      for (let i = 0; i < imgData.length; i++) {
        stepFormData.append('img', imgData[i]);
      }
      stepFormData.append('content', contentData);
      await axios.post(`${API_URL}/recipes/${insertId}/step`, stepFormData, {
        withCredentials: true,
      });
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
          新增
        </button>
        <button
          className={`mb-1 bg-danger ${classes.btn}`}
          onClick={() => setCreateRecipe()}
        >
          取消
        </button>
        {/* demo button */}
        <button
          className={`mb-1 bg-warning text-dark ${classes.btn}`}
          onClick={() => {
            setAddForm({
              name: '泰式檸檬魚',
              content:
                '夏日開胃料理檸檬魚，不用到泰式餐廳，用電鍋就可以輕鬆做出這道美食，只要掌握好調味料，廚房新手也可以完成這道菜。酸辣鮮美的醬汁可以讓人在夏天多吃一碗飯，海鮮類經過檸檬酸香提味，肉質鮮嫩、更加爽口。',
              category: 7,
              product_category: 12,
            });
            setMaterial([
              { id: uuidv4(), name: '鱸魚', quantity: '1條' },
              { id: uuidv4(), name: '蔥', quantity: '1支' },
              { id: uuidv4(), name: '辣椒', quantity: '1支' },
              { id: uuidv4(), name: '蒜頭', quantity: '5瓣' },
              { id: uuidv4(), name: '香菜', quantity: '少許' },
              { id: uuidv4(), name: '檸檬', quantity: '1顆' },
              { id: uuidv4(), name: '魚露', quantity: '2大匙' },
              { id: uuidv4(), name: '白糖', quantity: '2大匙' },
              { id: uuidv4(), name: '米酒', quantity: '1大匙' },
              { id: uuidv4(), name: '鹽', quantity: '少許' },
            ]);
            setStep([
              {
                id: uuidv4(),
                step: 1,
                content:
                  '將鱸魚洗淨切塊抹上醃料備用，檸檬榨汁，蔥切段，辣椒及蒜頭切末備用。',
              },
              {
                id: uuidv4(),
                step: 2,
                content: '辣椒末、蒜末、檸檬汁與調味料拌勻為「醬汁」。',
              },
              {
                id: uuidv4(),
                step: 3,
                content: '取一盤子底部放蔥段，將魚攤平放上，再淋上醬汁。',
              },
              {
                id: uuidv4(),
                step: 4,
                content:
                  '電鍋外鍋加入1杯水，放入蒸架再將盤子放入電鍋內，按下加熱開關待開關跳起，撒上香菜即可享用。',
              },
            ]);
            setDemo(true);
          }}
        >
          填入
        </button>
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
              id=""
              className={classes.cateSelect}
              onChange={inputChangeHandler}
              value={addForm.category}
            >
              {recipeCate.map((d) => {
                if (d.id === 0) return;
                return (
                  <option
                    value={d.id}
                    key={d.id}
                    // selected={d.id === addForm.category}
                  >
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
              {recipeCate.map((d) => {
                if (d.id === 0) return;
                return (
                  <option
                    value={d.id}
                    key={d.id}
                    // selected={d.id === addForm.product_category}
                  >
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
          {/* Drop zone */}
          {/* <Droppable droppableId="list">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}> */}
          {material.map((d, i) => {
            return (
              <RecipeMaterial
                key={d.id}
                i={i}
                data={d}
                demo={demo}
                delHandler={deleteMaterailBtn}
                onchange={materialChangerHandler}
              ></RecipeMaterial>
            );
          })}
          {/* {provided.placeholder}
              </div>
            )}
          </Droppable> */}

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
