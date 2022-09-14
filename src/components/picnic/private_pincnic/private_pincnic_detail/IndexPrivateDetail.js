import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../../styles/picnic/_picnicPrivateDetail.scss';
import Header from '../../../public_component/Header';
import Footer from '../../../public_component/Footer';
import BackToTop from '../../../public_component/BackToTop';
import DetailTitle from './DetailTitle';
import PrivateDetailContent from './PrivateDetailContent';
import RecommendProducts from './RecommendProducts';
import Paicipant from './Paicipant';
import Organiser from './Organiser';
import AsideMessageFix from './AsideMessageFix';
import RecommendActivity from './RecommendActivity';

import axios from 'axios';
import { API_URL } from '../../../../utils/config';

function IndexPrivateDetail() {
  const [data, setData] = useState([]);
  const [paicipantData, setPaicipantData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const { groupId } = useParams();

  // --- 詳細頁 全部資料 ---
  useEffect(() => {
    let getOfficalDetail = async () => {
      let response = await axios.get(`${API_URL}/picnic/group/${groupId}`);
      setData(response.data.data);
      setPaicipantData(response.data.paicipantData);
      setProductsData(response.data.productsData);
      // console.log(productsData);
    };
    getOfficalDetail();
  }, []);

  useEffect(() => {
    // console.log(data);
  }, [data, paicipantData, productsData]);

  return (
    <>
      <Header />
      <div>LIFE / 活動專區 / 野餐專區 / 官方活動 / 夏季野餐趣</div>
      <main className="PicnicOfficalDetailContainer container ">
        <div className="main row">
          <div className="mainWrap col-sm-8 me-5">
            {/* 上方活動資訊和圖片 */}
            <DetailTitle data={data} />
            {/* 活動詳細內容 */}
            <PrivateDetailContent data={data} />
            {/* 主辦人 */}
            <Organiser />
            {/* 參加者 */}
            <Paicipant
              cardWidth={140}
              displayTotal={6}
              paicipantData={paicipantData}
            />
          </div>
          <div className="col-sm-2">
            {/* 側邊資訊欄 */}
            <AsideMessageFix data={data} />
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
