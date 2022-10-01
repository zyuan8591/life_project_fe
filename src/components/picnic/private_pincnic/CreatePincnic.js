/** @jsxImportSource @emotion/react */
import React from 'react';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input } from 'antd';
import { API_URL } from '../../../utils/config';
import '../../../styles/picnic/_createPincnic.scss';
import Header from '../../public_component/Header';
import BreadCrumb from '../../public_component/BreadCrumb';
import Footer from '../../public_component/Footer';
import BackToTop from '../../public_component/BackToTop';
import Notification from '../../activity/Notification';
import { useUserRights } from '../../../usecontext/UserRights';
import { IconContext } from 'react-icons';
import {
  FaPenAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaCommentAlt,
  FaCamera,
} from 'react-icons/fa';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { AiOutlineCamera } from 'react-icons/ai';
import { message } from 'antd';

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

const formItem = css`
  .ant-row {
    display: flex;
    flex-direction: column;
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

function CreatePincnic() {
  const [imageSrc, setImageSrc] = useState('');
  const [loginBtn, setLoginBtn] = useState(false);
  const [location, setLocation] = useState(city);
  const { user, setUser } = useUserRights(); //登入使用者
  const [addConfirm, setAddConfirm] = useState(false); //自製alert提示框 加入活動

  // Navigate state
  const [success, setSuccess] = useState(false);

  // remind text
  const [error, setError] = useState({
    name: '',
    content: '',
  });

  useEffect(() => {
    console.log(error);
  }, [error]);
  // from data
  const [activityContent, setActivityContent] = useState({
    title: '綠生活野餐日',
    activityDate: '2022-11-15',
    location: '11',
    address: '崇仰三路2號',
    joinLimit: '4',
    startDate: '2022-11-01',
    endDate: '2022-11-13',
    intr: '隱藏在靜謐巷弄裡，占地寬闊、綠意環繞，宛如社區裡的後花園，假日總能看見親子一同蹓狗、散步、野餐，悠閒共度溫暖的午後。沿著湖邊走，可以看見休憩涼亭和九曲橋，也可在平緩的步道中觀察生態、吸收森林芬多精。',
    image: '',
  });

  function handleChange(e) {
    // console.log('handleChange', e.target.name, e.target.value);
    // let newActivityContent = { ...activityContent };
    // newActivityContent[e.target.name] = e.target.value;
    setError({ ...error, [e.target.name]: '' });
    setActivityContent({ ...activityContent, [e.target.name]: e.target.value });
  }

  function handleInputBlur(e, text) {
    let errorText = e.target.value.trim() ? '' : text;
    setError({ ...error, [e.target.name]: errorText });
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
      return message.error('最低活動人數5人');
    }
    if (activityContent.startDate > activityContent.endDate) {
      return message.error('開始日期不得大於結束日期');
    }
    if (activityContent.endDate > activityContent.activityDate) {
      return message.error('活動日期不得小於報名日期');
    }
    if (activityContent)
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

        let response = await axios.post(`${API_URL}/picnic/create`, formData, {
          withCredentials: true,
        });
        console.log(response.data);
        setAddConfirm(true);
        setTimeout(() => {
          setAddConfirm(false);
          setSuccess(true);
        }, 1500);
      } catch (e) {
        console.log('formData', e);
      }
    await axios.post(
      `${API_URL}/user/points`,
      {
        point: 50, //新增/扣除點數
        event: '新增揪團', //名目
      },
      {
        withCredentials: true,
      }
    );
  }

  return (
    <>
      <Header />
      {addConfirm ? (
        <Notification
          contaninText={'建立活動成功'}
          setLoginBtn={setLoginBtn}
          button={40}
        >
          <BsFillHandThumbsUpFill />
        </Notification>
      ) : (
        ''
      )}
      {loginBtn ? (
        <Notification
          contaninText={'請先登入會員'}
          linkTo={'/signin?p=1'}
          setLoginBtn={setLoginBtn}
        />
      ) : (
        ''
      )}
      <main className="createPincnicMain container">
        <BreadCrumb />
        <div>
          <form className="d-flex flex-column">
            <div className="form mt-4" css={formItem}>
              <Form.Item
                label={
                  <label>
                    <FaPenAlt className="faIcon" /> 活動標題
                  </label>
                }
                validateStatus={error.title && 'error'}
                help={error.title}
              >
                <Input
                  type="text"
                  placeholder="請輸入活動名稱"
                  value={activityContent.title}
                  name="title"
                  onChange={handleChange}
                  required
                  onBlur={(e) => handleInputBlur(e, '請輸入活動名稱')}
                />
              </Form.Item>
            </div>

            <div className="form" css={formItem}>
              <Form.Item
                label={
                  <label>
                    <FaCamera className="faIcon" /> 活動圖片
                  </label>
                }
                validateStatus={error.image && 'error'}
                help={error.image}
              >
                <label htmlFor="createImg" className="imgLabel cursorPointer">
                  <IconContext.Provider value={{ color: '#444', size: '4rem' }}>
                    <AiOutlineCamera />
                  </IconContext.Provider>
                  <div className="imgTitleText">
                    <span>新增圖片</span>
                  </div>
                  <img className="upLoadImg" src={imageSrc} alt="" />
                </label>
                <Input
                  type="file"
                  className="imageInput"
                  id="createImg"
                  name="image"
                  onChange={handleUpload}
                  onBlur={(e) => handleInputBlur(e, '請上傳圖片')}
                />
              </Form.Item>
            </div>

            <div className="form " css={formItem}>
              <Form.Item
                label={
                  <label>
                    <FaCalendarAlt className="faIcon" />
                    活動日期
                  </label>
                }
                validateStatus={error.activityDate && 'error'}
                help={error.activityDate}
              >
                <Input
                  className="w-100"
                  type="date"
                  value={activityContent.activityDate}
                  name="activityDate"
                  onChange={handleChange}
                  required
                  onBlur={(e) => handleInputBlur(e, '請輸入活動日期')}
                />
              </Form.Item>
            </div>

            <div className="form" css={formItem}>
              <Form.Item
                label={
                  <label>
                    <FaMapMarkerAlt className="faIcon" />
                    活動地點
                  </label>
                }
                validateStatus={error.address && 'error'}
                help={error.address}
              >
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
                  <Input
                    type="text"
                    className="col-sm-12"
                    placeholder="請輸入地址"
                    name="address"
                    value={activityContent.address}
                    onChange={handleChange}
                    required
                    onBlur={(e) => handleInputBlur(e, '請輸入地址')}
                  />
                </div>
              </Form.Item>
            </div>

            <div className="form" css={formItem}>
              <Form.Item
                label={
                  <label>
                    <FaUserFriends className="faIcon" />
                    活動人數上限 (最低人數5人)
                  </label>
                }
                validateStatus={error.joinLimit && 'error'}
                help={error.joinLimit}
              >
                <input
                  className="w-100"
                  type="number"
                  placeholder="最低人數5人"
                  name="joinLimit"
                  value={activityContent.joinLimit}
                  onChange={handleChange}
                  required
                  onBlur={(e) => handleInputBlur(e, '請輸入活動人數')}
                />
              </Form.Item>
            </div>
            <div className="form" css={formItem}>
              <Form.Item
                label={
                  <label>
                    <FaCalendarAlt className="faIcon" />
                    報名起始日
                  </label>
                }
                validateStatus={error.startDate && 'error'}
                help={error.startDate}
              >
                <input
                  className="w-100"
                  type="date"
                  name="startDate"
                  value={activityContent.startDate}
                  onChange={handleChange}
                  required
                  onBlur={(e) => handleInputBlur(e, '請輸入開始日期')}
                />
              </Form.Item>
            </div>
            <div className="form" css={formItem}>
              <Form.Item
                label={
                  <label>
                    <FaCalendarAlt className="faIcon" />
                    報名結束日
                  </label>
                }
                validateStatus={error.endDate && 'error'}
                help={error.endDate}
              >
                <input
                  className="w-100"
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  required
                  onBlur={(e) => handleInputBlur(e, '請輸入結束日期')}
                />
              </Form.Item>
            </div>

            <div className="form" css={formItem}>
              <Form.Item
                label={
                  <label>
                    <FaCommentAlt className="faIcon" />
                    活動內容
                  </label>
                }
                validateStatus={error.intr && 'error'}
                help={error.intr}
              >
                <textarea
                  className="w-100"
                  type="text"
                  placeholder="說輸入活動內容"
                  rows="5"
                  name="intr"
                  value={activityContent.intr}
                  onChange={handleChange}
                  required
                  onBlur={(e) => handleInputBlur(e, '說輸入活動內容')}
                />
              </Form.Item>
            </div>

            <div className="button d-flex justify-content-center mb-3">
              {user ? (
                <button
                  type="submit"
                  className="btn transition duration-200 ease-in"
                  onClick={handleSubmit}
                >
                  新增活動
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn transition duration-200 ease-in"
                  onClick={() => {
                    setLoginBtn(true);
                  }}
                >
                  新增活動
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <BackToTop />
      {success && <Navigate to="/activity/picnic/group" />}
    </>
  );
}

export default CreatePincnic;
