import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { API_URL } from '../../../utils/config';
import '../../../styles/picnic/_createPincnic.scss';
import Header from '../../public_component/Header';
import Footer from '../../public_component/Footer';
import BackToTop from '../../public_component/BackToTop';
import { IconContext } from 'react-icons';
import {
  FaPenAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaCommentAlt,
} from 'react-icons/fa';
import { AiOutlineCamera } from 'react-icons/ai';

function CreatePincnic() {
  const [activityContent, setActivityContent] = useState({
    title: '',
    activityDate: '',
    location: '',
    address: '',
    joinLimit: '',
    startDate: '',
    endDate: '',
    intr: '',
    image: '',
  });

  function handleChange(e) {
    // console.log('handleChange', e.target.name, e.target.value);
    let newActivityContent = { ...activityContent };
    newActivityContent[e.target.name] = e.target.value;
    setActivityContent(newActivityContent);
  }

  function handleUpload(e) {
    setActivityContent({ ...activityContent, image: e.target.files[0] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('title', activityContent.title);
      formData.append('activityDate', activityContent.activityDate);
      formData.append('location', activityContent.location);
      formData.append('address', activityContent.address);
      formData.append('joinLimit', activityContent.joinLimit);
      formData.append('startDate', activityContent.startDate);
      formData.append('endDate', activityContent.endDate);
      formData.append('intr', activityContent.intr);
      formData.append('image', activityContent.image);
      let response = await axios.post(`${API_URL}/picnic/create`, formData);
      console.log(response.data);
    } catch (e) {
      console.log('formData', e);
    }
  }

  //TODO: 無法取得地區資料
  const [locationData, setlocationData] = useState([]);
  const getLocationData = async () => {
    let response = await axios.get(`${API_URL}/picnic/create?`);
    setlocationData(response.data.data);
    // console.log(response.data.data);
  };
  useEffect(() => {
    getLocationData();
  });

  return (
    <>
      <Header />
      <main className="createPincnicMain container">
        <div>
          <form className="d-flex flex-column">
            <div className="form d-flex flex-column mt-4 mb-2">
              <label>
                <FaPenAlt className="faIcon" />
                活動標題
              </label>
              <input
                type="text"
                placeholder="請輸入活動名稱"
                value={activityContent.title}
                name="title"
                onChange={handleChange}
                required
              />
              {/* <div>{if(activityContent.title===''){
                return( <div>'必填項目未輸入'</div>)
              }}</div> */}
            </div>

            <div className="form d-flex flex-column mb-4">
              <label htmlFor="createImg" className="imgLabel cursorPointer">
                <IconContext.Provider value={{ color: '#444', size: '4rem' }}>
                  <AiOutlineCamera />
                </IconContext.Provider>
                新增圖片
              </label>
              <input
                type="file"
                id="createImg"
                // className="d-none"
                onChange={handleUpload}
              />
            </div>

            <div className="form d-flex flex-column mb-4">
              <label>
                <FaCalendarAlt className="faIcon" />
                活動日期
              </label>
              <input
                type="date"
                value={activityContent.activityDate}
                name="activityDate"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form mb-4">
              <label>
                <FaMapMarkerAlt className="faIcon" />
                活動地點
              </label>
              <div className="m-auto">
                <div className="location mb-2">
                  <input
                    type="text"
                    name="placeName"
                    value="台北市"
                    className="inputCity mb-2"
                    readOnly
                    disabled
                  />
                  <select
                    className="ms-2"
                    name="location"
                    value={activityContent.location}
                    onChange={handleChange}
                    required
                  >
                    {/* TODO:撈地區資料 */}
                    <option>地區</option>
                    <option value="1">松山區</option>
                    <option value="2">大安區</option>
                    <option value="3">信義區</option>
                  </select>
                </div>
                <input
                  type="text"
                  className="col-sm-12"
                  placeholder="請輸入地址"
                  name="address"
                  value={activityContent.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form d-flex flex-column mb-4">
              <label>
                <FaUserFriends className="faIcon" />
                活動人數上限 (最低人數5人)
              </label>
              <input
                type="number"
                placeholder="最低人數5人"
                name="joinLimit"
                value={activityContent.joinLimit}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form d-flex flex-column mb-4">
              <label>
                <FaCalendarAlt className="faIcon" />
                報名起始日
              </label>
              <input
                type="date"
                name="startDate"
                value={activityContent.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form d-flex flex-column mb-4">
              <label>
                <FaCalendarAlt className="faIcon" />
                報名結束日
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form d-flex flex-column mb-4">
              <label>
                <FaCommentAlt className="faIcon" />
                活動內容
              </label>
              <textarea
                type="text"
                placeholder="說請明活動內容"
                rows="5"
                name="intr"
                value={activityContent.intr}
                onChange={handleChange}
                required
              />
            </div>

            <div className="button d-flex justify-content-center mb-3">
              <button
                type="submit"
                className="btn transition duration-200 ease-in"
                onClick={handleSubmit}
              >
                新增活動
              </button>
            </div>
          </form>
        </div>
      </main>{' '}
      {/* <Formik
        initialValues={{
          title: '',
          activityDate: '',
          location: '',
          address: '',
          joinLimit: '',
          startDate: '',
          endDate: '',
          intr: '',
          image: '',
        }}
        validationSchema={yup.object({
          title: yup
            .string()
            .max(10, '請輸入活動名稱')
            .required('必填項目未輸入。'),
          activityDate: yup.string().required('必填項目未輸入。'),
          location: yup.string().required('必填項目未輸入。'),
          confirmPassword: yup
            .string()
            .required('必填項目未輸入。')
            .max(16, '請輸入8-16個半形英文和數字')
            .min(8, '請輸入8-16個半形英文和數字')
            .when('password', (password, schema) => {
              return password ? schema.oneOf([password], '密碼不一致') : schema;
            }),
        })}
        onSubmit={async (values) => {
          try {
            await axios.post(`${API_URL}/signup`, values);
          } catch (e) {
            console.error('register', e);
          }
        }}
      >

      </Formik> */}
      <Footer />
      <BackToTop />
    </>
  );
}

export default CreatePincnic;
