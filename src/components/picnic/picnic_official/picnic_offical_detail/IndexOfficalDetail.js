import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../../styles/picnic/_picnicOfficalDetail.scss';
import { BsFillPersonPlusFill, BsFillPersonDashFill } from 'react-icons/bs';

import Header from '../../../public_component/Header';
import BreadCrumb from '../../../public_component/BreadCrumb';
import Footer from '../../../public_component/Footer';
import BackToTop from '../../../public_component/BackToTop';
import DetailTitle from '../../picnic_compoent/DetailTitle';
import OffcialDetailContent from './OffcialDetailContent';
import RecommendProducts from '../../picnic_compoent/RecommendProducts';
import Paicipant from '../../picnic_compoent/Paicipant';
import PaicipantCard from '../../picnic_compoent/PaicipantCard';
import AsideMessage from '../../picnic_compoent/AsideMessage';
import RecommendActivity from '../../picnic_compoent/RecommendActivity';
import Notification from '../../../activity/Notification';

import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';

function PicnicOfficalDetail() {
  const [data, setData] = useState([]);
  const [paicipantData, setPaicipantData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [getMap, setGetMap] = useState([]);

  const [getMapUser, setGetMapUser] = useState([]);
  const userLength = paicipantData.length;
  const [userSlider, setUserSlider] = useState(0); // slider
  // console.log(userLength);

  const { officialId } = useParams();
  const { user, setUser } = useUserRights();
  const [userJoin, setUserJoin] = useState([]);
  const [isGo, setIsgo] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);
  const [joinConfirm, setJoinConfirmm] = useState(false);
  const [joinCancel, setJoinCancel] = useState(false);
  // console.log(officialId);

  // --- 詳細頁 全部資料 ---
  useEffect(() => {
    let getOfficalDetail = async () => {
      let response = await axios.get(
        `${API_URL}/picnic/official/${officialId}`
      );
      setData(response.data.data);
      setPaicipantData(response.data.paicipantData);
      setProductsData(response.data.productsData);
    };
    setIsgo(false);
    getOfficalDetail();
  }, [isGo, officialId]);

  useEffect(() => {
    let getMap = async () => {
      let response = await axios.get(`${API_URL}/getMap/${officialId}`);
      setGetMap(response.data.picnicResult);
      setGetMapUser(response.data.picnicResult[0].users);
    };
    getMap();
  }, []);

  useEffect(() => {}, [data, paicipantData, productsData, getMap]);
  // console.log(getMap);

  useEffect(() => {
    let getAllJoin = async () => {
      let response = await axios.get(
        `${API_URL}/picnic/official/officialAllJoin`,
        {
          withCredentials: true,
        }
      );
      console.log('getAll', response.data);
      let hadJoin = response.data.map((data) => data.picnic_id);
      setUserJoin(hadJoin);
      // console.log(hadJoin);
    };
    if (user) {
      getAllJoin();
    }
  }, [user]);

  // /api/1.0/picnic/officialJoin/1
  const handleAddJoin = async (officialId) => {
    // console.log(officialId);
    let response = await axios.post(
      `${API_URL}/picnic/officialAddJoin/${officialId}`,
      {},
      { withCredentials: true }
    );
    let nowJoin = response.data.getJoin.map((data) => data.picnic_id);
    setUserJoin(nowJoin);
    console.log('add', response.data);
    setJoinConfirmm(true);
    setTimeout(() => {
      setJoinConfirmm(false);
    }, 2000);
  };

  //取消活動
  const handleDeleteJoin = async (officialId) => {
    let response = await axios.delete(
      `${API_URL}/picnic/officialJoin/${officialId}`,
      { withCredentials: true }
    );
    let nowJoin = response.data.getJoin.map((data) => data.picnic_id);
    setUserJoin(nowJoin);
    console.log('delete', response.data);
    setJoinCancel(true);
    setTimeout(() => {
      setJoinCancel(false);
    }, 2000);
  };

  //TODO: 參加者 user資料庫未新增 增加user名單

  return (
    <>
      <Header />
      <main className="PicnicOfficalDetailContainer container ">
        {joinConfirm ? (
          <Notification contaninText={'已加入活動'} setLoginBtn={setLoginBtn}>
            <BsFillPersonPlusFill />
          </Notification>
        ) : (
          ''
        )}
        {joinCancel ? (
          <Notification contaninText={'已取消活動'} setLoginBtn={setLoginBtn}>
            <BsFillPersonDashFill />
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
          <div className="mainWrap col-sm-8 me-5">
          <div></div>
            {/* 上方活動資訊和圖片 */}
            <DetailTitle data={data} />
            {/* 活動詳細內容 */}
            <OffcialDetailContent data={data} />
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
          <div className="col-sm-2">
            {/* 側邊資訊欄 */}
            <AsideMessage
              data={data}
              handleAddJoin={handleAddJoin}
              handleDeleteJoin={handleDeleteJoin}
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
          <RecommendActivity
            getMap={getMap}
            getMapUser={getMapUser}
            data={data}
            userJoin={userJoin}
            user={user}
          />
          ;
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default PicnicOfficalDetail;
