/** @jsxImportSource @emotion/react */
import React from 'react';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input } from 'antd';
import { API_URL } from '../../../../utils/config';
import '../../../../styles/picnic/_editForm.scss';
import Notification from '../../../activity/Notification';
import { useUserRights } from '../../../../usecontext/UserRights';
import { IconContext } from 'react-icons';
import { API_URL_IMG } from '../../../../utils/config';
import {
  FaPenAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaCommentAlt,
  FaCamera,
} from 'react-icons/fa';
import { AiOutlineCamera, AiOutlineClose } from 'react-icons/ai';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
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

function CreateForm({ data, setEdit, showToast }) {
  const [imageSrc, setImageSrc] = useState('');
  const [loginBtn, setLoginBtn] = useState(false);
  const [location, setLocation] = useState(city);
  const { user, setUser } = useUserRights(); //登入使用者
  const { groupId } = useParams();

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

  let [fromData] = data;

  // from data
  const [activityContent, setActivityContent] = useState({
    title: fromData.picnic_title,
    activityDate: fromData.activity_date,
    location: fromData.location,
    address: fromData.address,
    joinLimit: fromData.join_limit,
    startDate: fromData.start_date,
    endDate: fromData.end_date,
    intr: fromData.intr,
    image: null,
  });

  console.log('activityContent', activityContent);

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

    // 上傳圖片預覽
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
    if (!e.target.value) {
      return message.error('請輸入欄位');
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

        let response = await axios.put(
          `${API_URL}/picnic/createUpdate/${groupId}`,
          formData,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        showToast();
        setEdit(false);
        setSuccess(true);
      } catch (e) {
        console.log('formData', e);
      }
  }
  return (
    <>
      <div className="fromBg">
        <main className="createFormMain container">
          <div>
            <form className="d-flex flex-column">
              <IconContext.Provider value={{ color: '#444', size: '1.8rem' }}>
                <div className="endIcon d-flex justify-content-end mt-3 cursorPointer">
                  <AiOutlineClose
                    className="endIcon"
                    onClick={() => {
                      setEdit(false);
                    }}
                  />
                </div>
              </IconContext.Provider>
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
                    <IconContext.Provider
                      value={{ color: '#444', size: '4rem' }}
                    >
                      <AiOutlineCamera />
                    </IconContext.Provider>
                    <div className="imgTitleText">
                      <span>新增圖片</span>
                    </div>
                    {activityContent.image ? (
                      <img className="upLoadImg" src={imageSrc} alt="picnic" />
                    ) : (
                      <img
                        className="upLoadImg"
                        src={`${API_URL_IMG}/picnic/${fromData.img1}`}
                        alt="picnic"
                      />
                    )}
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
                  validateStatus={error.text && 'error'}
                  help={error.text}
                >
                  <textarea
                    className="w-100"
                    type="text"
                    placeholder="說請明活動內容"
                    rows="5"
                    name="intr"
                    value={activityContent.intr}
                    onChange={handleChange}
                    required
                    onBlur={(e) => handleInputBlur(e, '請輸入結束日期')}
                  />
                </Form.Item>
              </div>

              <div className="button d-flex justify-content-center mb-3">
                <button
                  type="submit"
                  className="btn transition duration-200 ease-in"
                  onClick={handleSubmit}
                >
                  送出
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default CreateForm;
