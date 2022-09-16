import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../../styles/picnic/_picnicOfficalDetail.scss';
import Header from '../../../public_component/Header';
import Footer from '../../../public_component/Footer';
import BackToTop from '../../../public_component/BackToTop';
import DetailTitle from '../../picnic_compoent/DetailTitle';
import OffcialDetailContent from './OffcialDetailContent';
import RecommendProducts from '../../picnic_compoent/RecommendProducts';
import Paicipant from '../../picnic_compoent/Paicipant';
import AsideMessage from '../../picnic_compoent/AsideMessage';
import RecommendActivity from '../../picnic_compoent/RecommendActivity';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';

function PicnicOfficalDetail() {
  const [data, setData] = useState([]);
  const [paicipantData, setPaicipantData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const { officialId } = useParams();
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
      // console.log(productsData);
    };
    getOfficalDetail();
  }, []);

  useEffect(() => {
    // console.log(data);
  }, [data, paicipantData, productsData]);

  //TODO: 參加者 user資料庫未新增 增加user名單
  //TODO: 推薦商品 連結
  //TODO: 熱門活動 連結

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
            <OffcialDetailContent data={data} />
            {/* 參加者 */}
            <Paicipant
              cardWidth={140}
              displayTotal={6}
              data={data}
              paicipantData={paicipantData}
            />
          </div>
          <div className="col-sm-2">
            {/* 側邊資訊欄 */}
            <AsideMessage data={data} />
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
      {/* <PaicipantInfo /> */}
      <Footer />
      <BackToTop />
    </>
  );
}

export default PicnicOfficalDetail;
