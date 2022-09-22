import React, { useState, useEffect } from 'react';
import '../../../styles/backstage/_addCamping.scss';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import AddImgProduct from './AddImgProduct';
import AddImgProduct2 from './AddImgProduct2';
import AddImgProduct3 from './AddImgProduct3';
import AddImgProduct4 from './AddImgProduct4';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import Notification from '../../activity/Notification';
function UpdatePage({ setUpdatePage, productData }) {
  const {
    name,
    price,
    category,
    color,
    img,
    img2,
    img3,
    intro,
    spec,
    inventory,
  } = productData;
  const [errMsg, setErrMsg] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);
  const [product, setProduct] = useState({
    name: name,
    cate: category,
    color: color,
    inventory: inventory,
    price: price,
    // actStartDate: '2022-09-01',
    // actEndDate: '2022-09-29',
    intro: intro,
    spec: spec,
    photo1: img,
    photo2: img2,
    photo3: img3,
  });
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/products/${productData.id}/detailImg`
      );
      let { img } = result.data[0];
      // console.log(img);
    })();
  }, [productData.id]);

  function handleChange(e) {
    const newProduct = { ...product, [e.target.name]: e.target.value };
    setProduct(newProduct);
    console.log(product);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let formData = new FormData();
      // formData.append('name', name);
      // formData.append('price', product.price);
      // formData.append('cate', product.cate);
      // formData.append('brand', brand);
      // formData.append('color', product.color);
      // formData.append('intro', product.intro);
      // formData.append('spec', product.spec);
      // formData.append('inventory', product.inventory);
      // formData.append('photo1', product.photo1);
      // formData.append('photo1', product.photo2);
      // formData.append('photo1', product.photo3);
      // formData.append('photo1', product.photo4);
      let response = await axios.post(
        `${API_URL}/products/addProduct`,
        formData
        // {
        //   withCredentials: true,
        // }
      );
      if (response.data.message === '此商品已存在') {
        setErrMsg(true);
        setTimeout(() => {
          setErrMsg(false);
        }, 2000);
      } else {
        setLoginBtn(true);
        setTimeout(() => {
          setLoginBtn(false);
        }, 2000);
      }
      console.log(response.data.message);
      console.log(formData);
    } catch (e) {
      console.error('addCamping', e);
    }
  }

  return (
    <>
      <div className="backstageAddPage">
        <form className="formContainer">
          <IconContext.Provider
            value={{ color: '#817161', size: '2em', className: 'closeIcon' }}
          >
            <IoCloseSharp
              onClick={() => {
                setUpdatePage(false);
              }}
            />
          </IconContext.Provider>
          <div className="pageTitle">
            <p>編輯商品</p>
          </div>
          <div className="grid">
            {/* title place lat */}
            <div className="d-flex flex-column align-items-end">
              <div className="mb-4">
                <label>商品名稱：</label>
                <input
                  className="input"
                  id="name"
                  name="name"
                  type="text"
                  maxLength={15}
                  value={name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label>商品分類：</label>
                <input
                  className="input"
                  id="cate"
                  name="cate"
                  type="text"
                  maxLength={15}
                  value={category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label>顏色：</label>
                <input
                  className="input"
                  id="color"
                  name="color"
                  type="text"
                  maxLength={10}
                  value={color}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* price pepCount lng */}
            <div className="">
              <div className="mb-4">
                <label>庫存：</label>
                <input
                  className="input"
                  id="inventory"
                  name="inventory"
                  type="number"
                  maxLength={10}
                  value={inventory}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>價格：</label>
                <input
                  className="input"
                  id="price"
                  name="price"
                  type="number"
                  maxLength={10}
                  value={price}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* actDate */}
          <div className="grid2">
            <div className="d-flex flex-column align-items-end">
              <div className="mb-4 ">
                <label>折扣日期：</label>
                <input
                  className="input"
                  id="actStartDate"
                  name="actStartDate"
                  type="date"
                  maxLength={10}
                  value=""
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <span>&emsp;　&emsp;</span>
              <input
                className="input"
                id="actEndDate"
                name="actEndDate"
                type="date"
                maxLength={10}
                value=""
                onChange={handleChange}
              />
            </div>
          </div>
          {/* int */}
          <div className="mb-4 d-flex flex-column align-items-start leftInput">
            <label className="mb-2">商品介紹：</label>
            <textarea
              className="textContent "
              placeholder="限150字"
              id="intro"
              name="intro"
              rows="5"
              cols="68"
              maxLength={150}
              value={intro}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 d-flex flex-column align-items-start leftInput">
            <label className="mb-2">商品規格：</label>
            <textarea
              className="textContent"
              placeholder="限200字"
              id="spec"
              name="spec"
              rows="5"
              cols="68"
              maxLength={200}
              value={spec}
              onChange={handleChange}
            />
          </div>

          {/* img */}
          <div className="mb-4 leftInput">商品圖片：</div>
          <div className="mb-4 d-flex justify-content-center ms-4">
            <AddImgProduct img={img} />
            <AddImgProduct2 img2={img2} />
            <AddImgProduct3 img3={img3} />
          </div>
          <div className="mb-4 leftInput">商品圖片：</div>
          <div className="mb-4 d-flex justify-content-center ms-4">
            <AddImgProduct4 />
          </div>

          {/* btn */}
          <div className="mt-5 mb-4 text-center">
            <button className="addBtn">修改</button>
            <button
              className="cancelBtn"
              onClick={() => {
                setUpdatePage(false);
              }}
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdatePage;
