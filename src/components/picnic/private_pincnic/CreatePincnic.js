import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '../../../utils/config';
import '../../../styles/picnic/_createPincnic.scss';
import Header from '../../public_component/Header';
import BreadCrumb from '../../public_component/BreadCrumb';
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

const city = [
  { value: 1, name: '信義區' },
  { value: 2, name: '中正區' },
  { value: 3, name: '萬華區' },
  { value: 4, name: '大同區' },
  { value: 5, name: '中山區' },
  { value: 6, name: '松山區' },
  { value: 7, name: '大安區' },
  { value: 8, name: '內湖區' },
  { value: 9, name: '南港區' },
  { value: 10, name: '士林區' },
  { value: 11, name: '北投區' },
  { value: 12, name: '文山區' },
];

function CreatePincnic() {
  const [imageSrc, setImageSrc] = useState('');
  const [location, setLocation] = useState(city);

  // Navigate state
  const [success, setSuccess] = useState(false);

  // remind text
  const [remindTitle, setRemindTitle] = useState('');
  const [remindActivityDate, setRemindActivityDate] = useState('');
  const [remindAddress, setRemindAddress] = useState('');
  const [remindJoinLimit, setRemindJoinLimit] = useState('');
  const [remindStartDate, setRemindStartDate] = useState('');
  const [remindEndDate, setRemindEndDate] = useState('');
  const [remindIntr, setRemindIntr] = useState('');
  const [remindImage, setRemindImage] = useState('');

  // from data
  const [activityContent, setActivityContent] = useState({
    title: 'test',
    activityDate: '2022-11-15',
    location: '2',
    address: 'test',
    joinLimit: '10',
    startDate: '2022-11-01',
    endDate: '2022-11-13',
    intr: '隱藏在靜謐巷弄裡，占地寬闊、綠意環繞，宛如社區裡的後花園，假日總能看見親子一同蹓狗、散步、野餐，悠閒共度溫暖的午後。沿著湖邊走，可以看見休憩涼亭和九曲橋，也可在平緩的步道中觀察生態、吸收森林芬多精。',
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

    let file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      setImageSrc(reader.result);
    });
    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (activityContent.joinLimit < 5) {
      return setRemindJoinLimit('最低活動人數5人');
    }
    if (activityContent.startDate > activityContent.endDate) {
      return setRemindStartDate('*開始日期不得大於結束日期');
    }
    if (activityContent.endDate > activityContent.activityDate) {
      return setRemindActivityDate('*活動日期不得小於報名日期');
    }
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
      setSuccess(true);

      console.log(response.data);
      alert(response.data.Message);
    } catch (e) {
      console.log('formData', e);
    }
  }
  // TODO: 表單重新驗證
  return (
    <>
      <Header />
      <main className="createPincnicMain container">
        <BreadCrumb />
        <div>
          <form className="d-flex flex-column">
            <div className="form d-flex flex-column mt-4 mb-2">
              <label>
                <FaPenAlt className="faIcon" />
                活動標題 <span className="remindText">{remindTitle}</span>
              </label>
              <input
                type="text"
                placeholder="請輸入活動名稱"
                value={activityContent.title}
                name="title"
                onChange={handleChange}
                required
                onBlur={() => {
                  if (!activityContent.title) {
                    setRemindTitle('*請輸入標題');
                  } else {
                    setRemindTitle('');
                  }
                }}
              />
            </div>

            <div className="form d-flex flex-column mb-4">
              <label htmlFor="createImg" className="imgLabel cursorPointer">
                <IconContext.Provider value={{ color: '#444', size: '4rem' }}>
                  <AiOutlineCamera />
                </IconContext.Provider>
                <div className="imgTitleText">
                  <span>新增圖片</span>
                  <span className="remindText">{remindImage}</span>
                </div>
                <img className="upLoadImg" src={imageSrc} alt="" />
              </label>
              <input
                type="file"
                className="imageInput"
                id="createImg"
                onChange={handleUpload}
                onBlur={() => {
                  if (!activityContent.image) {
                    setRemindImage('*請上傳圖片');
                  } else {
                    setRemindImage('');
                  }
                }}
              />
            </div>

            <div className="form d-flex flex-column mb-4">
              <label>
                <FaCalendarAlt className="faIcon" />
                活動日期{' '}
                <span className="remindText">{remindActivityDate}</span>
              </label>
              <input
                type="date"
                value={activityContent.activityDate}
                name="activityDate"
                onChange={handleChange}
                required
                onBlur={() => {
                  if (!activityContent.activityDate) {
                    setRemindActivityDate('*請輸入活動日期');
                  } else {
                    setRemindActivityDate('');
                  }
                }}
              />
            </div>

            <div className="form mb-4">
              <label>
                <FaMapMarkerAlt className="faIcon" />
                活動地點 <span className="remindText">{remindAddress}</span>
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
                    <option>地區</option>
                    {location.map((city) => {
                      return (
                        <option value={city.value} key={city.value}>
                          {city.name}
                        </option>
                      );
                    })}
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
                  onBlur={() => {
                    if (!activityContent.address) {
                      setRemindAddress('*請輸入地址');
                    } else {
                      setRemindAddress('');
                    }
                  }}
                />
              </div>
            </div>

            <div className="form d-flex flex-column mb-4">
              <label>
                <FaUserFriends className="faIcon" />
                活動人數上限 (最低人數5人){' '}
                <span className="remindText">{remindJoinLimit}</span>
              </label>
              <input
                type="number"
                placeholder="最低人數5人"
                name="joinLimit"
                value={activityContent.joinLimit}
                onChange={handleChange}
                required
                onBlur={() => {
                  if (!activityContent.joinLimit) {
                    setRemindJoinLimit('*請輸入活動人數');
                  } else {
                    setRemindJoinLimit('');
                  }
                }}
              />
            </div>
            <div className="form d-flex flex-column mb-4">
              <label>
                <FaCalendarAlt className="faIcon" />
                報名起始日 <span className="remindText">{remindStartDate}</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={activityContent.startDate}
                onChange={handleChange}
                required
                onBlur={() => {
                  if (!activityContent.startDate) {
                    setRemindStartDate('*請輸入開始日期');
                  } else {
                    setRemindStartDate('');
                  }
                }}
              />
            </div>

            <div className="form d-flex flex-column mb-4">
              <label>
                <FaCalendarAlt className="faIcon" />
                報名結束日 <span className="remindText">{remindEndDate}</span>
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                required
                onBlur={() => {
                  if (!activityContent.endDate) {
                    setRemindEndDate('*請輸入結束日期');
                  } else {
                    setRemindEndDate('');
                  }
                }}
              />
            </div>

            <div className="form d-flex flex-column mb-4">
              <label>
                <FaCommentAlt className="faIcon" />
                活動內容 <span className="remindText">{remindIntr}</span>
              </label>
              <textarea
                type="text"
                placeholder="說請明活動內容"
                rows="5"
                name="intr"
                value={activityContent.intr}
                onChange={handleChange}
                required
                onBlur={() => {
                  if (!activityContent.intr) {
                    setRemindIntr('*請輸入內容');
                  } else {
                    setRemindIntr('');
                  }
                }}
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
      {success && <Navigate to="/activity/picnic/group" />}
    </>
  );
}

export default CreatePincnic;
