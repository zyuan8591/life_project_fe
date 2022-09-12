import React from 'react';
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
  return (
    <>
      <Header />
      <div>LIFE / 活動專區 / 野餐專區 / 官方活動 / 夏季野餐趣</div>
      <main className="PicnicOfficalDetailContainer container ">
        <div className="main row">
          <div className="mainWrap col-sm-8 me-5">
            {/* 上方活動資訊和圖片 */}
            <DetailTitle />
            {/* 活動詳細內容 */}
            <PrivateDetailContent />
            {/* 主辦人 */}
            <Organiser />
            {/* 參加者 */}
            <Paicipant cardWidth={140} displayTotal={6} />
          </div>
          <div className="col-sm-2">
            {/* 側邊資訊欄 */}
            <AsideMessageFix />
          </div>
          {/* 推薦商品 */}
          <RecommendProducts cardWidth={210} displayTotal={6} />
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

export default IndexPrivateDetail;
