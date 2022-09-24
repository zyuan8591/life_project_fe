import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../../../../styles/backstage/_addCamping.scss';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import UpdateImgCamping from './UpdateImgCamping';
import UpdateImgCamping2 from './UpdateImgCamping2';
import UpdateImgCamping3 from './UpdateImgCamping3';
import { useEffect } from 'react';

function UpdatePage({
  setUpdatePage,
  updateData,
  setLoading,
  loading,
  setLoginBtn,
}) {
  //const data = { ...updateData };

  // console.log(updateData);

  // console.log(data);
  const counties = {
    1: '台北市',
    2: '新北市',
    3: '基隆市',
    4: '桃園市',
    5: '新竹市',
    6: '新竹縣',
    7: '苗栗縣',
    8: '台中市',
    9: '彰化縣',
    10: '南投縣',
    11: '雲林縣',
    12: '嘉義市',
    13: '嘉義縣',
    14: '台南市',
    15: '高雄市',
    16: '屏東縣',
    17: '台東縣',
    18: '花蓮縣',
    19: '宜蘭縣',
  };
  const location = Object.keys(counties);

  const newAddress = updateData.address.slice(3);
  // console.log(newAddress);
  const [originImages, setOriginImages] = useState({
    photo1: updateData.img1,
    photo2: updateData.img2,
    photo3: updateData.img3,
  });

  //const [camping, setCamping] = useState({});
  const [camping, setCamping] = useState({
    campingId: updateData.id,
    title: updateData.title,
    place: updateData.place,
    lat: updateData.lat,
    price: updateData.price,
    pepCount: updateData.join_limit,
    lng: updateData.lng,
    actStartDate: updateData.activity_start_date,
    actEndDate: updateData.activity_end_date,
    startDate: updateData.start_date,
    endDate: updateData.end_date,
    county: updateData.location,
    address: newAddress,
    actInt: updateData.activity_about,
    actLodging: updateData.activity_lodging,
    photo1: updateData.img1,
    photo2: updateData.img2,
    photo3: updateData.img3,
  });

  // useEffect(() => {
  //   async function getFileFormUrl(key, name) {
  //     console.log(
  //       'http://localhost:3000/img/camping/activity_camping_img/' + name
  //     );

  //     const r = await fetch(
  //       'http://localhost:3000/img/camping/activity_camping_img/' + name
  //     );

  //     const p = await r.blob();
  //     console.log(p);
  //     const objUrl = URL.createObjectURL(p);
  //     console.log(objUrl);
  //     setCamping({ ...camping, [key]: objUrl });
  //   }

  //   //if (!updateData.img1) return;

  //   //setCamping();

  //   getFileFormUrl('photo1', updateData.img1);
  //   getFileFormUrl('photo2', updateData.img2);
  //   getFileFormUrl('photo3', updateData.img3);
  // }, []);

  function handleChange(e) {
    const newCamping = { ...camping, [e.target.name]: e.target.value };

    // console.log(newCamping['county']);
    let nowCounty = newCamping['county'];

    const campingData = {
      ...newCamping,
      countyName: counties[nowCounty],
      campingId: updateData.id,
    };

    console.log('campingData', campingData);
    setCamping(campingData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append('campingId', camping.campingId);
      formData.append('title', camping.title);
      formData.append('place', camping.place);
      formData.append('lat', camping.lat);
      formData.append('price', camping.price);
      formData.append('pepCount', camping.pepCount);
      formData.append('lng', camping.lng);
      formData.append('actStartDate', camping.actStartDate);
      formData.append('actEndDate', camping.actEndDate);
      formData.append('startDate', camping.startDate);
      formData.append('endDate', camping.endDate);
      formData.append('county', camping.county);
      formData.append('address', camping.address);
      formData.append('actInt', camping.actInt);
      formData.append('actLodging', camping.actLodging);
      formData.append('countyName', camping.countyName);

      formData.append('photo1', camping.photo1);
      formData.append('photo1', camping.photo2);
      formData.append('photo1', camping.photo3);

      formData.append('photoOrgin1', originImages.photo1);
      formData.append('photoOrgin2', originImages.photo2);
      formData.append('photoOrgin3', originImages.photo3);

      formData.append('photoChange1', originImages.photo1 === camping.photo1);
      formData.append('photoChange2', originImages.photo2 === camping.photo2);
      formData.append('photoChange3', originImages.photo3 === camping.photo3);

      // formData.append('photo2', camping.photo2);
      // formData.append('photo3', camping.photo3);
      // idben.chen@gmail.com
      let response = await axios.put(
        `${API_URL}/camping/campingUpdate`,
        formData
        // {
        //   withCredentials: true,
        // }
      );
      setLoginBtn('update');
      setTimeout(() => {
        setLoginBtn(false);
      }, 2000);
      setLoading(!loading);
      setTimeout(() => {
        setUpdatePage(false);
      }, 600);

      console.log(response.data.message);
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
            <p>修改活動</p>
          </div>

          <div className="d-flex justify-content-center mt-4">
            {/* title place lat */}
            <div className="d-flex flex-column align-items-end">
              <div className="mb-4">
                <label>活動標題：</label>
                <input
                  className="input"
                  id="title"
                  name="title"
                  type="text"
                  maxLength={20}
                  value={camping.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>活動地點：</label>
                <input
                  className="input"
                  id="place"
                  name="place"
                  type="text"
                  maxLength={15}
                  value={camping.place}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>經度：</label>
                <input
                  className="input"
                  id="lat"
                  name="lat"
                  type="text"
                  maxLength={20}
                  value={camping.lat}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* price pepCount lng */}
            <div className="ms-5 d-flex flex-column align-items-end">
              <div className="mb-4">
                <label>活動價格：</label>
                <input
                  className="input"
                  name="price"
                  type="number"
                  maxLength={10}
                  value={camping.price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>活動人數：</label>
                <input
                  className="input"
                  name="pepCount"
                  type="number"
                  maxLength={3}
                  value={camping.pepCount}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>緯度：</label>
                <input
                  className="input"
                  name="lng"
                  type="text"
                  maxLength={20}
                  value={camping.lng}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* actDate */}
          <div className="mb-4 leftInput dateInput">
            <label>活動日期：</label>
            <input
              className="input"
              name="actStartDate"
              type="date"
              maxLength={10}
              value={camping.actStartDate}
              onChange={handleChange}
            />
            <span>&emsp;～&emsp;</span>
            <input
              className="input"
              name="actEndDate"
              type="date"
              maxLength={10}
              value={camping.actEndDate}
              onChange={handleChange}
            />
          </div>

          {/* date */}
          <div className="mb-4 leftInput dateInput">
            <label>報名日期：</label>
            <input
              className="input "
              name="startDate"
              type="date"
              maxLength={10}
              value={camping.startDate}
              onChange={handleChange}
            />
            <span>&emsp;～&emsp;</span>
            <input
              className="input"
              name="endDate"
              type="date"
              maxLength={10}
              value={camping.endDate}
              onChange={handleChange}
            />
          </div>

          {/* address */}
          <div className="mb-4 leftInput">
            <label>活動地址：</label>
            <select
              name="county"
              id="county"
              // value={camping.countyName}
              value={camping.county}
              onChange={handleChange}
            >
              {location.map((v, i) => {
                return (
                  <option
                    key={v}
                    value={v}
                    // selected={camping.county === v ? true : false}
                  >
                    {counties[i + 1]}
                  </option>
                );
              })}
            </select>
            <input
              className="input addressSty"
              id="address"
              name="address"
              type="text"
              maxLength={25}
              value={camping.address}
              onChange={handleChange}
            />
          </div>

          {/* int */}
          {/* <div className="d-flex leftInput"> */}
          <div className="mb-4 d-flex flex-column align-items-start leftInput">
            <label className="mb-2">活動介紹：</label>
            <textarea
              className="textContent "
              placeholder="限150字"
              name="actInt"
              rows="5"
              cols="68"
              maxLength={150}
              value={camping.actInt}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 d-flex flex-column align-items-start leftInput">
            <label className="mb-2">注意事項：</label>
            <textarea
              className="textContent"
              placeholder="限150字"
              name="actLodging"
              rows="5"
              cols="68"
              maxLength={150}
              value={camping.actLodging}
              onChange={handleChange}
            />
          </div>
          {/* </div> */}

          {/* img */}
          <label className="mb-4 leftInput">活動照片：</label>
          <div className="mb-4 d-flex justify-content-center">
            <UpdateImgCamping camping={camping} setCamping={setCamping} />
            <UpdateImgCamping2 camping={camping} setCamping={setCamping} />
            <UpdateImgCamping3 camping={camping} setCamping={setCamping} />
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
