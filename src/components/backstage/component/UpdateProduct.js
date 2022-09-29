import React, { useState, useEffect } from 'react';
import '../../../styles/backstage/_addCamping.scss';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import UpdateImgProduct from './UpdateImgProduct';
import UpdateImgProduct2 from './UpdateImgProduct2';
import UpdateImgProduct3 from './UpdateImgProduct3';
import UpdateImgProduct4 from './UpdateImgProduct4';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import Notification from '../../activity/Notification';
function UpdatePage({
  setUpdatePage,
  productData,
  loading,
  setLoading,
  setLoginBtn,
  user
}) {
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
  // const [loginBtn, setLoginBtn] = useState(false);
  const [detailImg, setDetailImg] = useState([]);
  const [cateArr, setCateArr] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/category`);
      setCateArr(result.data);
    })();
  }, []);
  const [originImages, setOriginImages] = useState({
    photo1: productData.img,
    photo2: productData.img2,
    photo3: productData.img3,
    photo4: productData.img4,
  });
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
    photo4: detailImg.img,
  });

  function handleChange(e) {
    const newProduct = { ...product, [e.target.name]: e.target.value };
    setProduct(newProduct);
  }
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/products/${productData.id}/detailImg`
      );
      setDetailImg(result.data[0]);
      setOriginImages({ ...originImages, photo4: result.data[0].img });
    })();
  }, [productData]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('id', productData.id);
      formData.append('detailId', detailImg.id);
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('cate', product.cate);
      // formData.append('brand', product.brand);
      formData.append('color', product.color);
      formData.append('intro', product.intro);
      formData.append('spec', product.spec);
      formData.append('inventory', product.inventory);
      formData.append('photo1', product.photo1);
      formData.append('photo1', product.photo2);
      formData.append('photo1', product.photo3);
      formData.append('photo1', product.photo4);

      formData.append('photoOrgin1', originImages.photo1);
      formData.append('photoOrgin2', originImages.photo2);
      formData.append('photoOrgin3', originImages.photo3);
      formData.append('photoOrgin4', originImages.photo4);

      formData.append('photoChange1', originImages.photo1 === product.photo1);
      formData.append('photoChange2', originImages.photo2 === product.photo2);
      formData.append('photoChange3', originImages.photo3 === product.photo3);
      formData.append('photoChange4', originImages.photo4 === product.photo4);

      let response = await axios.put(
        `${API_URL}/products/updateProduct`,
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
        setLoading(!loading);
        setLoginBtn('update');
        setTimeout(() => {
          setLoginBtn('');
        }, 2000);
        setUpdatePage(false);
      }
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
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label>商品分類：</label>
                <select
                  className="input m-0"
                  onChange={handleChange}
                  value={product.cate}
                  name="cate"
                >
                  {cateArr.map((v, i) => {
                    return (
                      <option value={v.id} key={v.id}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>

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
              maxLength={300}
              value={product.spec}
              onChange={handleChange}
            />
          </div>

          {/* img */}
          <div className="mb-4 leftInput">商品圖片：</div>
          <div className="mb-4 d-flex justify-content-center ms-4">
            <UpdateImgProduct product={product} setProduct={setProduct} />
            <UpdateImgProduct2 product={product} setProduct={setProduct} />
            <UpdateImgProduct3 product={product} setProduct={setProduct} />
          </div>
          <div className="mb-4 leftInput">商品詳細圖片：</div>
          <div className="mb-4 d-flex justify-content-center ms-4">
            <UpdateImgProduct4
              product={product}
              setProduct={setProduct}
              detailImg={detailImg}
            />
          </div>

          {/* btn */}
          <div className="mt-5 mb-4 text-center">
            <button className="addBtn" onClick={handleSubmit}>
              修改
            </button>
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
