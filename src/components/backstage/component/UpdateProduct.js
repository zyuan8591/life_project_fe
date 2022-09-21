import React from 'react';
import '../../../styles/backstage/_addCamping.scss';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';

function UpdatePage({ setUpdatePage }) {
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
                  maxLength={15}
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
                />
              </div>
              <div className="mb-4">
                <label>活動人數：</label>
                <input
                  className="input"
                  name="pepCount"
                  type="number"
                  maxLength={3}
                />
              </div>
              <div className="mb-4">
                <label>緯度：</label>
                <input
                  className="input"
                  name="lng"
                  type="text"
                  maxLength={20}
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
            />
            <span>&emsp;～&emsp;</span>
            <input
              className="input"
              name="actEndDate"
              type="date"
              maxLength={10}
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
            />
            <span>&emsp;～&emsp;</span>
            <input
              className="input"
              name="endDate"
              type="date"
              maxLength={10}
            />
          </div>

          {/* address */}
          <div className="mb-4 leftInput">
            <label>活動地址：</label>
            <input
              className="input addressSty"
              name="address"
              type="text"
              maxLength={25}
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
            />
          </div>
          {/* </div> */}

          {/* img */}
          <label className="mb-4 leftInput">活動照片：</label>
          <div className="mb-4 d-flex justify-content-center">
            {/* 1 */}
            <div className="d-flex flex-column align-items-center imgInput me-4">
              <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
                <AiOutlineCamera />
              </IconContext.Provider>
              <span>點擊新增圖片</span>
            </div>
            <input className="input d-none" name="actImg1" type="file" />
            {/* 2 */}
            <div className="d-flex flex-column align-items-center imgInput me-4">
              <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
                <AiOutlineCamera />
              </IconContext.Provider>
              <span>點擊新增圖片</span>
            </div>
            <input className="input d-none" name="actImg2" type="file" />
            {/* 3 */}
            <div className="d-flex flex-column align-items-center imgInput">
              <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
                <AiOutlineCamera />
              </IconContext.Provider>
              <span>點擊新增圖片</span>
            </div>
            <input className="input d-none" name="actImg3" type="file" />
          </div>

          {/* btn */}
          <div className="mt-5 mb-4 text-center">
            <button className="addBtn">新增</button>
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
