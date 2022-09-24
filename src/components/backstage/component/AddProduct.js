import React, { useState } from 'react';
import '../../../styles/backstage/_addCamping.scss';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { FiShoppingBag } from 'react-icons/fi';
import AddImgProduct from './AddImgProduct';
import AddImgProduct2 from './AddImgProduct2';
import AddImgProduct3 from './AddImgProduct3';
import AddImgProduct4 from './AddImgProduct4';

import axios from 'axios';
import { API_URL } from '../../../utils/config';
import Notification from '../../activity/Notification';
function AddPage({ setAddPage, loading, setLoading }) {
  const [errMsg, setErrMsg] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);

  const [product, setProduct] = useState({
    name: '義大利半自動義式咖啡機',
    cate: 9,
    color: '白色',
    inventory: 12,
    price: 25800,
    // actStartDate: '2022-09-01',
    // actEndDate: '2022-09-29',
    intro:
      '榮獲Good Design大獎 15Bar氣壓蒸氣高壓萃取技術 不鏽鋼蒸氣奶泡管，完成綿密奶泡 自動停止滴漏設計 1公升分離式透明水箱，加水便利',
    spec: '類型	半自動咖啡機, 義式咖啡機/品牌	SMEG/型號	ECF01CRUS/顏色	白色系/產地	中國/機身材質	不鏽鋼/機身尺寸(長x寬x高)(mm)	14.9 x 37 x 30 cm/電壓	120V/產品重量	5kg/水箱容量	0.5公升-1公升/保固	1年/消耗功率	1200~1400W/BSMI許可字號	R45336',
    photo1: '',
    photo2: '',
    photo3: '',
  });
  function handleChange(e) {
    const newProduct = { ...product, [e.target.name]: e.target.value };

    setProduct(newProduct);
    // console.log(newProduct);
  }
  let brand = 11;
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(!loading);
    console.log(loading);
    try {
      let formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('cate', product.cate);
      formData.append('brand', brand);
      formData.append('color', product.color);
      formData.append('intro', product.intro);
      formData.append('spec', product.spec);
      formData.append('inventory', product.inventory);
      formData.append('photo1', product.photo1);
      formData.append('photo1', product.photo2);
      formData.append('photo1', product.photo3);
      formData.append('photo1', product.photo4);
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
      // console.log(response.data.message);
      // console.log(formData);
    } catch (e) {
      console.error('addCamping', e);
    }
  }

  return (
    <>
      {errMsg ? (
        <Notification contaninText="商品名稱重複">
          <FiShoppingBag />
        </Notification>
      ) : (
        ''
      )}
      {loginBtn ? (
        <Notification
          // linkToText="返回列表頁"
          // linkTo="/backstage"
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
            <p>新增商品</p>
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
                  value={product.name}
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
            <div className="">
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
                  value={product.actStartDate}
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
                value={product.actEndDate}
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
              value={product.intro}
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
              value={product.spec}
              onChange={handleChange}
            />
          </div>

          {/* img */}
          <div className="mb-4 leftInput">商品圖片：</div>
          <div className="mb-4 d-flex justify-content-center ms-4">
            <AddImgProduct product={product} setProduct={setProduct} />
            <AddImgProduct2 product={product} setProduct={setProduct} />
            <AddImgProduct3 product={product} setProduct={setProduct} />
            {/* {[...Array(3)].map((v, i) => {
              return (
                
              );
            })} */}
          </div>
          <div className="mb-4 leftInput">商品詳細圖片：</div>
          <div className="mb-4 d-flex justify-content-center ms-4">
            <AddImgProduct4 product={product} setProduct={setProduct} />
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
