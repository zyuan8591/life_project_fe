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
import {
  FaPaw,
  FaExclamationTriangle,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function PicnicOfficalDetail() {
  const [scrollDown, setScrollDown] = useState(false);

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });

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
            <Paicipant />
            {/* 推薦商品 */}
            <RecommendProducts />
          </div>
          <div className="col-sm-3">
            {/* 側邊資訊欄 */}
            <AsideMessageFix
              scrollDown={scrollDown}
              setScrollDown={setScrollDown}
            />
          </div>
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
