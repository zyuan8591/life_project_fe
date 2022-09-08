import React from 'react';
import { useState } from 'react';
import '../../../../styles/picnic/_picnicOfficalDetail.scss';
import Header from '../../../public_component/Header';
import Footer from '../../../public_component/Footer';
import BackToTop from '../../../public_component/BackToTop';
import DetailTitle from '../../picnic_compoent/DetailTitle';
import OffcialDetailContent from './OffcialDetailContent';
import RecommendProducts from '../../picnic_compoent/RecommendProducts';
import Paicipant from '../../picnic_compoent/Paicipant';
import PaicipantInfo from './PaicipantInfo';
import AsideMessageFix from '../../picnic_compoent/AsideMessageFix';
import RecommendActivity from '../../picnic_compoent/RecommendActivity';

function PicnicOfficalDetail() {
  return (
    <>
      <Header />
      <div>LIFE / 活動專區 / 野餐專區 / 官方活動 / 夏季野餐趣</div>
      <main className="PicnicOfficalDetailContainer container ">
        <div className="main row">
          <div className="mainWrap col-sm-8">
            {/* 上方活動資訊和圖片 */}
            <DetailTitle />
            {/* 活動詳細內容 */}
            <OffcialDetailContent />
            {/* 參加者 */}
            <Paicipant cardWidth={140} displayTotal={6} />
          </div>
          <div className="col-sm-3">
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

export default PicnicOfficalDetail;
