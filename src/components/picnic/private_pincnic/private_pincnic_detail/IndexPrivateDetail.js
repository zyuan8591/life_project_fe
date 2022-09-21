import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../../styles/picnic/_picnicPrivateDetail.scss';
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
  const { user, setUser } = useUserRights();
  const [userJoin, setUserJoin] = useState([]);
  const [getMap, setGetMap] = useState([]);
  const [getMapUser, setGetMapUser] = useState([]);
  const { officialId } = useParams();
  const [isGo, setIsgo] = useState(false);

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
  }, [isGo]);

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
      console.log('getAll', response.data);
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
    let nowJoin = response.data.getJoin.map((data) => data.picnic_id);
    setUserJoin(nowJoin);
    // console.log('add', response.data);
    alert('已加入活動');
  };

  const handleDeleteJoin = async (groupId) => {
    let response = await axios.delete(
      `${API_URL}/picnic/groupJoin/${groupId}`,
      { withCredentials: true }
    );
    let nowJoin = response.data.getJoin.map((data) => data.picnic_id);
    setUserJoin(nowJoin);
    // console.log('delete', response.data);
    alert('已取消活動');
  };

  //TODO: 加入活動後 要重新整理才能顯示參加者和人數
  return (
    <>
      <Header />
      <main className="picnicPrivateDetailContainer container ">
        <BreadCrumb />
        <div className="main row">
          <div className="mainWrap col-sm-8 me-5">
            {/* 上方活動資訊和圖片 */}
            <DetailTitle data={data} />
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
          <div className="col-sm-2">
            {/* 側邊資訊欄 */}
            <AsideMessage
              data={data}
              handleDeleteJoin={handleDeleteJoin}
              handleAddJoin={handleAddJoin}
              userJoin={userJoin}
              user={user}
              setIsgo={setIsgo}
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
      <Footer />
      <BackToTop />
    </>
  );
}

export default IndexPrivateDetail;
