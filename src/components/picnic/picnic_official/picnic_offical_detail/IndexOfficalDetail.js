import React from 'react';
import '../../../../styles/picnic/_picnicOfficalDetail.scss';
import Header from '../../../public_component/Header';
import Footer from '../../../public_component/Footer';
import BackToTop from '../../../public_component/BackToTop';
import DetailTitle from '../../picnic_cpmpoent/DetailTitle';
import OffcialDetailContent from './OffcialDetailContent';
import RecommendProducts from '../../picnic_cpmpoent/RecommendProducts';
import Paicipant from '../../picnic_cpmpoent/Paicipant';
import PaicipantInfo from './PaicipantInfo';
import AsideMessageFix from '../../picnic_cpmpoent/AsideMessageFix';
import RecommendActivity from '../../picnic_cpmpoent/RecommendActivity';
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
  return (
    <>
      <Header />
      <div>LIFE / 活動專區 / 野餐專區 / 官方活動 / 夏季野餐趣</div>
      <main className="PicnicOfficalDetailContainer container row">
        <div className="mainWrap col-sm-8">
          {/* 上方活動資訊和圖片 */}
          <DetailTitle />
          {/* 活動詳細內容 */}
          <OffcialDetailContent />
          {/* 參加者 */}
          <Paicipant />
          <RecommendProducts />
        </div>
        <RecommendActivity />
        {/* 側邊資訊欄 */}
        <AsideMessageFix />
      </main>
      <PaicipantInfo />
      <Footer />
      <BackToTop />
    </>
  );
}

export default PicnicOfficalDetail;
