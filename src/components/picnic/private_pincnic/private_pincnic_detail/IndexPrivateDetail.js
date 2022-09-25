import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../../styles/picnic/_picnicPrivateDetail.scss';
import {
  BsFillPersonPlusFill,
  BsFillPersonDashFill,
  BsFillHandThumbsUpFill,
} from 'react-icons/bs';

import Header from '../../../public_component/Header';
import BreadCrumb from '../../../public_component/BreadCrumb';
import Footer from '../../../public_component/Footer';
import BackToTop from '../../../public_component/BackToTop';
import DetailTitle from './DetailTitle';
import PrivateDetailContent from './PrivateDetailContent';
import RecommendProducts from './RecommendProducts';
import Paicipant from './Paicipant';
import PaicipantCard from './PaicipantCard';
import Organiser from './Organiser';
import AsideMessage from './AsideMessage';
import RecommendActivity from './RecommendActivity';
import Notification from '../../../activity/Notification';
import EditForm from './EditForm';

import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';

function IndexPrivateDetail() {
  const [data, setData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [paicipantData, setPaicipantData] = useState([]); //參加者
  const [organiserData, setOrganiserData] = useState([]); //主辦人

  const userLength = paicipantData.length;
  const [userSlider, setUserSlider] = useState(0);

  const { groupId } = useParams();
  const { user, setUser } = useUserRights(); //登入使用者
  const [userJoin, setUserJoin] = useState([]);
  const [getMap, setGetMap] = useState([]);
  const [getMapUser, setGetMapUser] = useState([]);
  const [isGo, setIsgo] = useState(false); //觸發推薦活動畫面改變
  const [loginBtn, setLoginBtn] = useState(false);
  const [joinConfirm, setJoinConfirmm] = useState(false); //toast提示框 加入活動
  const [joinCancel, setJoinCancel] = useState(false); // toast提示框 取消活動
  const [editConfirm, setEditConfirmm] = useState(false); //toast提示框 修改成功
  const [delConfirm, setDelConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- 詳細頁 全部資料 ---
  useEffect(() => {
    let getOfficalDetail = async () => {
      let response = await axios.get(`${API_URL}/picnic/group/${groupId}`);
      setData(response.data.data);
      setProductsData(response.data.productsData);
      setOrganiserData(response.data.organiserData);
      setPaicipantData(response.data.paicipantData);
      // console.log(response);
    };
    setIsgo(false);
    getOfficalDetail();
  }, [isGo, groupId, edit]);

  // useEffect(() => {
  //   let getMap = async () => {
  //     let response = await axios.get(`${API_URL}/getMap/${officialId}`);
  //     setGetMap(response.data.picnicResult);
  //     setGetMapUser(response.data.picnicResult[0].users);
  //   };
  //   getMap();
  // }, []);

  useEffect(() => {}, [data, productsData, organiserData, paicipantData]);

  useEffect(() => {
    let getAllJoin = async () => {
      let response = await axios.get(`${API_URL}/picnic/group/picnicAllJoin`, {
        withCredentials: true,
      });
      // console.log('getAll', response.data);
      let hadJoin = response.data.map((data) => data.picnic_id);
      setUserJoin(hadJoin);
      console.log(hadJoin);
    };
    if (user) {
      getAllJoin();
    }
  }, [user]);

  // /api/1.0/picnic/groupAddJoin/1
  const handleAddJoin = async (groupId) => {
    let response = await axios.post(
      `${API_URL}/picnic/groupAddJoin/${groupId}`,
      {},
      { withCredentials: true }
    );
    // 回傳user所有加入活動
    // let nowJoin = response.data.getJoin.map((data) => data.picnic_id);
    // setUserJoin(nowJoin);
    console.log('add', response.data);
    setJoinConfirmm(true);
    setTimeout(() => {
      setJoinConfirmm(false);
    }, 2000);
  };

  // 取消活動
  const handleDeleteJoin = async (groupId) => {
    let response = await axios.delete(
      `${API_URL}/picnic/groupJoin/${groupId}`,
      { withCredentials: true }
    );
    let nowJoin = response.data.getJoin.map((data) => data.picnic_id);
    setUserJoin(nowJoin);
    // console.log('delete', response.data);
    setJoinCancel(true);
    setTimeout(() => {
      setJoinCancel(false);
    }, 2000);
  };

  const handleDelActivity = async (groupId) => {
    let response = await axios.delete(
      `${API_URL}/picnic/groupCreate/${groupId}`,
      { withCredentials: true }
    );
    // console.log('delete', createUser);
    setJoinCancel(true);
    setDelConfirm(true);
    setTimeout(() => {
      setJoinCancel(false);
      setSuccess(true);
    }, 2000);
  };

  const showToast = () => {
    setEditConfirmm(true);
    setTimeout(() => {
      setEditConfirmm(false);
    }, 2000);
  };

  // console.log(data);
  return (
    <>
      <Header />
      <main className="picnicPrivateDetailContainer container ">
        {joinConfirm ? (
          <Notification
            contaninText={'已加入活動'}
            setLoginBtn={setLoginBtn}
            bottom={30}
          >
            <BsFillPersonPlusFill />
          </Notification>
        ) : (
          ''
        )}
        {joinCancel ? (
          <Notification
            contaninText={'已取消活動'}
            setLoginBtn={setLoginBtn}
            bottom={30}
          >
            <BsFillPersonDashFill />
          </Notification>
        ) : (
          ''
        )}
        {editConfirm ? (
          <Notification
            contaninText={'修改成功'}
            setLoginBtn={setLoginBtn}
            bottom={30}
          >
            <BsFillHandThumbsUpFill />
          </Notification>
        ) : (
          ''
        )}
        {delConfirm ? (
          <Notification
            contaninText={'刪除成功'}
            setLoginBtn={setLoginBtn}
            bottom={30}
          >
            <BsFillHandThumbsUpFill />
          </Notification>
        ) : (
          ''
        )}
        {loginBtn ? (
          <Notification
            contaninText={'請先登入會員'}
            linkTo={'/signin/login'}
            setLoginBtn={setLoginBtn}
          />
        ) : (
          ''
        )}
        <BreadCrumb />
        <div className="main row">
          <div className="mainWrap col-12 col-sm-8 me-5">
            {/* 上方活動資訊和圖片 */}
            <DetailTitle
              data={data}
              handleDelActivity={handleDelActivity}
              user={user}
              setSuccess={setSuccess}
              success={success}
              setEdit={setEdit}
            />
            {/* 活動詳細內容 */}
            <PrivateDetailContent data={data} />
            {/* 主辦人 */}
            <Organiser
              organiserData={organiserData}
              setOrganiserData={setOrganiserData}
            />
            {/* 參加者 */}
            <Paicipant
              userLength={userLength}
              userSlider={userSlider}
              setUserSlider={setUserSlider}
              cardWidth={140}
              displayTotal={6}
              data={data}
              paicipantData={paicipantData}
            >
              <PaicipantCard
                userSlider={userSlider}
                paicipantData={paicipantData}
              />
            </Paicipant>
          </div>
          <div className="col-12 col-sm-2 ms-5">
            {/* 側邊資訊欄 */}
            <AsideMessage
              data={data}
              handleDeleteJoin={handleDeleteJoin}
              handleAddJoin={handleAddJoin}
              userJoin={userJoin}
              user={user}
              setIsgo={setIsgo}
              setLoginBtn={setLoginBtn}
            />
          </div>
          {/* 推薦商品 */}
          <RecommendProducts
            cardWidth={210}
            displayTotal={6}
            productsData={productsData}
            setProductsData={setProductsData}
          />
          {/* 熱門活動 */}
          <RecommendActivity />
        </div>
      </main>
      {edit ? (
        <EditForm setEdit={setEdit} data={data} showToast={showToast} />
      ) : null}
      <Footer />
      <BackToTop />
    </>
  );
}

export default IndexPrivateDetail;
