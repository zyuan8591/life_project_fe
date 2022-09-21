import React, { useState } from 'react';
import '../../../styles/backstage/_addCamping.scss';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { FiShoppingBag } from "react-icons/fi";

import axios from 'axios';
import { API_URL } from '../../../utils/config';
import Notification from '../../activity/Notification';
function AddPage({ setAddPage }) {
  const [errMsg, setErrMsg] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);

  const [product, setProduct] = useState({
    name: '享靜靜露營吧！',
    cate: '享靜靜露營區',
    color: '15',
    inventory: 12,
    price: '1000',
    actStartDate: '2022-12-12',
    actEndDate: '2022-12-13',
    intro: 'hhhhhhhh',
    spec: 'cccccccccc',
  });

  function handleChange(e) {}

  async function handleSubmit(e) {
    e.preventDefault();
    // 驗證

    // if (camping[e.target.name] === '') return alert('ok');
    try {
      let response = await axios.post(
        `${API_URL}/products/addProduct`,
        product
      );
      if (response.data.message === '此活動標題已存在') {
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
    } catch (e) {
      console.error('addCamping', e);
    }
  }

  function handleUpload(e) {}

  return (
    <>
      {errMsg ? (
        <Notification contaninText="活動標題已存在">
          <FiShoppingBag />
        </Notification>
      ) : (
        ''
      )}
      {loginBtn ? (
        <Notification
          // linkToText="返回列表頁"
          // linkTo="/backstageCamping"
          contaninText="新增成功"
          // setLoginBtn={setLoginBtn}
        />
      ) : (
        ''
      )}
      <div className="backstageAddPage">
        <form className="formContainer">
          <IconContext.Provider
            value={{ color: '#817161', size: '2em', className: 'closeIcon' }}
          >
            <IoCloseSharp
              onClick={() => {
                setAddPage(false);
              }}
            />
          </IconContext.Provider>

          <div className="pageTitle">
            <p>新增活動</p>
          </div>
          <div className="d-flex justify-content-center mt-4">
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
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label>商品分類：</label>
                <input
                  className="input"
                  id="category"
                  name="category"
                  type="text"
                  maxLength={15}
                  value={product.cate}
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
                  value={product.color}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* price pepCount lng */}
            <div className="ms-5 d-flex flex-column align-items-end">
              <div className="mb-4">
                <label>庫存：</label>
                <input
                  className="input"
                  id="inventory"
                  name="inventory"
                  type="number"
                  maxLength={10}
                  value={product.inventory}
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
                  value={product.price}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="mb-4">
                <label>緯度：</label>
                <input
                  className="input"
                  id="lng"
                  name="lng"
                  type="text"
                  maxLength={20}
                  value={product.lng}
                  onChange={handleChange}
                />
              </div> */}
            </div>
          </div>

          {/* actDate */}
          <div className="mb-4 leftInput dateInput">
            <label>折扣日期：</label>
            <input
              className="input"
              id="actStartDate"
              name="actStartDate"
              type="date"
              maxLength={10}
              value={product.actStartDate}
              onChange={handleChange}
            />
            <span>&emsp;～&emsp;</span>
            <input
              className="input"
              id="actEndDate"
              name="actEndDate"
              type="date"
              maxLength={10}
              value={product.actEndDate}
              onChange={handleChange}
            />
          </div>

          {/* date */}
          {/* <div className="mb-4 leftInput dateInput">
            <label>報名日期：</label>
            <input
              className="input "
              id="startDate"
              name="startDate"
              type="date"
              maxLength={10}
              value={product.startDate}
              onChange={handleChange}
            />
            <span>&emsp;～&emsp;</span>
            <input
              className="input"
              id="endDate"
              name="endDate"
              type="date"
              maxLength={10}
              value={product.endDate}
              onChange={handleChange}
            />
          </div> */}

          {/* address */}
          {/* <div className="mb-4 leftInput">
            <label>活動地址：</label>
            <select name="county" id="county">
              <option value="1">新北市</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <input
              className="input addressSty"
              id="address"
              name="address"
              type="text"
              maxLength={25}
              value={product.address}
              onChange={handleChange}
            />
          </div> */}

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
              value={product.intro}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 d-flex flex-column align-items-start leftInput">
            <label className="mb-2">商品規格：</label>
            <textarea
              className="textContent"
              placeholder="限150字"
              id="spec"
              name="spec"
              rows="5"
              cols="68"
              maxLength={150}
              value={product.spec}
              onChange={handleChange}
            />
          </div>

          {/* img */}
          <div className="mb-4 leftInput">商品圖片：</div>
          <div className="mb-4 d-flex justify-content-center">
            {/* 1 */}
            <label className="mb-4" htmlFor="photo1">
              <div className="d-flex flex-column align-items-center imgInput me-4">
                <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
                  <AiOutlineCamera />
                </IconContext.Provider>
                <span>點擊新增圖片</span>
              </div>
            </label>
            <input
              className="input d-none"
              name="Img1"
              type="file"
              id="photo1"
              onChange={handleUpload}
            />
            {/* 2 */}
            <label className="mb-4" htmlFor="photo2">
              <div className="d-flex flex-column align-items-center imgInput me-4">
                <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
                  <AiOutlineCamera />
                </IconContext.Provider>
                <span>點擊新增圖片</span>
              </div>
            </label>

            <input
              className="input d-none"
              name="Img2"
              type="file"
              id="photo2"
            />
            {/* 3 */}
            <label className="mb-4" htmlFor="photo3">
              <div className="d-flex flex-column align-items-center imgInput">
                <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
                  <AiOutlineCamera />
                </IconContext.Provider>
                <span>點擊新增圖片</span>
              </div>
            </label>
            <input
              className="input d-none"
              name="Img3"
              type="file"
              id="photo3"
            />
          </div>
          {/* btn */}
          <div className="mt-5 mb-4 text-center">
            <button className="addBtn" type="submit" onClick={handleSubmit}>
              新增
            </button>
            <button
              className="cancelBtn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setAddPage(false);
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

export default AddPage;
