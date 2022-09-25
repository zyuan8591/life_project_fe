/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { API_URL } from '../../../../utils/config';
import axios from 'axios';
import { Form, Input } from 'antd';

const subClrBrown = '#817161';
const subClrGY = '#B9BDC5';

const formItem = css`
  .ant-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
    .ant-form-item-label {
      text-align: left;
      label {
        &::after {
          content: '';
        }
      }
    }
  }
`;
const imgLabel = css`
  border: 1px solid ${subClrGY};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;
const cateSelect = css`
  flex: 1 1 auto;
  padding: 0.25rem;
  &:hover {
    border-color: ${subClrBrown};
  }
  &:focus-visible {
    outline: none;
  }
`;

const RecipeIntro = ({ addForm, setAddForm, edit, error, setError }) => {
  const [recipeCate, setRecipeCate] = useState([]);
  const [productCate, setProductCate] = useState([]);

  // init category data ===============================================
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
    })();
  }, []);
  // recipe img handler ===============================================
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;
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
      setError({ ...error, image: '' });
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
  // input change handler =============================================
  const inputChangeHandler = (e) => {
    setError({ ...error, [e.target.name]: '' });
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };
  const inputBlurHandler = (e, text) => {
    let errorText = e.target.value.trim() ? '' : text;
    setError({ ...error, [e.target.name]: errorText });
  };

  return (
    <>
      {/* title */}
      <div css={formItem}>
        <Form.Item
          label={<label className="fs-4">食譜名稱</label>}
          validateStatus={error.name && 'error'}
          help={error.name}
        >
          <Input
            name="name"
            type="text"
            placeholder="請輸入食譜名稱"
            value={addForm.name}
            onChange={inputChangeHandler}
            onBlur={(e) => inputBlurHandler(e, '請輸入食譜名稱')}
          />
        </Form.Item>
      </div>
      {/* image */}
      <div css={formItem}>
        <Form.Item
          label={<label className="fs-4">食譜照片</label>}
          validateStatus={error.image && 'error'}
          help={error.image}
        >
          <label
            htmlFor="createRecipeImg"
            className="cursorPointer h-auto"
            css={imgLabel}
            style={{ borderColor: error.image && '#ff4d4f' }}
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
          <Input
            name="image"
            type="file"
            id="createRecipeImg"
            className="d-none"
            onChange={updateImgHandler}
          />
        </Form.Item>
      </div>
      {/* content */}
      <div css={formItem}>
        <Form.Item
          label={<label className="fs-4">簡介</label>}
          validateStatus={error.content && 'error'}
          help={error.content}
        >
          <Input.TextArea
            showCount
            allowClear
            maxLength="200"
            name="content"
            type="text"
            placeholder="請輸入食譜說明 ( 最多200字 )"
            rows="5"
            value={addForm.content}
            onChange={inputChangeHandler}
            onBlur={(e) => inputBlurHandler(e, '請輸入食譜說明')}
          />
        </Form.Item>
      </div>
      {/* category */}
      <div className="d-flex gap-3 mb-2">
        <select
          name="category"
          css={cateSelect}
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
          css={cateSelect}
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
  );
};

export default RecipeIntro;
