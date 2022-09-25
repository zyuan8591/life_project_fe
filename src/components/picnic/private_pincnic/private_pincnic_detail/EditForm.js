import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import '../../../../styles/picnic/_createForm.scss';
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
} from 'react-icons/fa';
import { AiOutlineCamera, AiOutlineClose } from 'react-icons/ai';

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

function CreateForm({ data, setEdit, showToast }) {
  const [imageSrc, setImageSrc] = useState('');
  const [loginBtn, setLoginBtn] = useState(false);
  const [location, setLocation] = useState(city);
  const { user, setUser } = useUserRights(); //登入使用者
  const { groupId } = useParams();

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
  // console.log(data);

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
    let newActivityContent = { ...activityContent };
    newActivityContent[e.target.name] = e.target.value;
    setActivityContent(newActivityContent);
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
      return setRemindJoinLimit('最低活動人數5人');
    }
    if (activityContent.startDate > activityContent.endDate) {
      return setRemindStartDate('*開始日期不得大於結束日期');
    }
    if (activityContent.endDate > activityContent.activityDate) {
      return setRemindActivityDate('*活動日期不得小於報名日期');
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
  // TODO: 表單重新驗證
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
                  報名起始日
                  <span className="remindText">{remindStartDate}</span>
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
