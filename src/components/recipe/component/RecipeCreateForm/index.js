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

const RecipeCreateForm = ({ closeCreateRecipe, recipeCate }) => {
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
          新增
        </button>
        <button
          className={`mb-1 bg-danger ${classes.btn}`}
          onClick={() => closeCreateRecipe()}
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
                content: '將花枝、蝦仁、豬油放調理杯中，用電動攪拌棒打成泥狀。',
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
