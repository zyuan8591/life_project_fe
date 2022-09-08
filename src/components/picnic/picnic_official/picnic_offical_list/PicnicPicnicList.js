import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.css';
import { IconContext } from 'react-icons';
import { BsGridFill } from 'react-icons/bs';
import { FaListUl, FaSearch } from 'react-icons/fa';

import '../../../../styles/camping/camping_main/_campingMain.scss';
import Footer from '../../../public_component/Footer';
import Header from '../../../public_component/Header';
import BackToTop from '../../../public_component/BackToTop';
import ActivityStateFilter from './component/ActivityStateFilter';
import ActivitySliderPrice from './component/ActivitySliderPrice';
import ActivitySliderHeadcount from './component/ActivitySliderHeadcount';
import ActivityDateFilter from './component/ActivityDateFilter';
import ActivityCard from './component/ActivityCard';
import ActivityHorizontalCard from './component/ActivityHorizontalCard';
import PaginationBar from '../../../public_component/PaginationBar';
import ActivitySelect from './component/ActivitySelect';

const activityState = [
  { state: '即將開團', style: '#817161' },
  { state: '開團中', style: '#F2AC33' },
  { state: '已成團', style: '#1F9998' },
  { state: '開團已截止', style: '#B9BDC5' },
];

function CampingMain() {
  const [stateSearch, setStateSearch] = useState(activityState);
  const [cardChange, setCardChange] = useState(true);
  const [horizontalCardChange, setHorizontalCardChange] = useState(false);
  const [pageNow, setPageNow] = useState(1);

  // 引入card
  const card = <ActivityCard />;
  const horizontalCard = <ActivityHorizontalCard />;

  return (
    <>
      <Header />
      <IconContext.Provider value={{ color: '#817161', size: '2em' }}>
        <main className="activityPage">
          {/* banner */}
          <div className="banner">
            <img
              src="/img/picnic/activity_picnic_img/picnic_detail_banner.webp"
              alt="camping"
            />
          </div>
          <div className="main">
            {/* breadCrumb */}
            <p className="breadCrumb py-3">LIFE --- 活動專區 </p>
            <div className="contain">
              <div className="row m-0">
                {/* 左側篩選欄 */}
                <div className="col-3">
                  {/* state filter */}
                  <div className="activityState">
                    <p className="stateText">活動狀態</p>
                    {stateSearch.map((v, i) => {
                      return <ActivityStateFilter key={uuidv4()} v={v} />;
                    })}
                  </div>

                  {/* price slider */}
                  <ActivitySliderPrice />

                  {/* headcount slider */}
                  <ActivitySliderHeadcount />

                  {/* date filter */}
                  <ActivityDateFilter />
                </div>
                {/* 右側活動列表 */}
                <div className="col-9">
                  <div className="d-flex justify-content-between">
                    <div className="mb-3 ">
                      {/* card 切換 */}
                      <ActivitySelect />
                    </div>
                    <div className="d-flex align-items-center">
                      <FaListUl
                        className="me-3 changeBtn"
                        onClick={() => {
                          setCardChange(false);
                          setHorizontalCardChange(true);
                        }}
                      />

                      <BsGridFill
                        className="me-3 changeBtn"
                        onClick={() => {
                          setCardChange(true);
                          setHorizontalCardChange(false);
                        }}
                      />
                      <IconContext.Provider
                        value={{ color: '#817161', size: '1.7em' }}
                      >
                        <div className="me-2">
                          <input
                            className="searchInput"
                            placeholder="Search.."
                            type="text"
                          />
                          <FaSearch
                            className="ms-2 mb-1"
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      </IconContext.Provider>
                    </div>
                  </div>

                  <IconContext.Provider value={{ color: '#000', size: '1rem' }}>
                    <div className="row ">
                      {/* 列表 card */}
                      {/* 列表 HorizontalStyle */}
                      {cardChange === true && horizontalCardChange === false
                        ? card
                        : horizontalCard}
                    </div>
                  </IconContext.Provider>
                  <PaginationBar
                    lastPage={12}
                    pageNow={pageNow}
                    setPageNow={setPageNow}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </IconContext.Provider>
      <Footer />
      <BackToTop />
    </>
  );
}

export default CampingMain;
