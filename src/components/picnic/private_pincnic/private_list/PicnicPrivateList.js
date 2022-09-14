import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.css';
import { IconContext } from 'react-icons';
import { BsGridFill } from 'react-icons/bs';
import { FaListUl, FaSearch } from 'react-icons/fa';

import '../../../../styles/picnic/_picnicPrivateList.scss';
import '../../../../styles/picnic/camping_main/_campingMain.scss';
import Footer from '../../../public_component/Footer';
import Header from '../../../public_component/Header';
import BackToTop from '../../../public_component/BackToTop';
import ActivityStateFilter from './component/ActivityStateFilter';
import ActivitySliderHeadcount from './component/ActivitySliderHeadcount';
import ActivityDateFilter from './component/ActivityDateFilter';
import ActivityCard from './component/ActivityCard';
import ActivityHorizontalCard from './component/ActivityHorizontalCard';
import PaginationBar from '../../../public_component/PaginationBar';
import ActivitySelect from './component/ActivitySelect';

import axios from 'axios';
import { API_URL } from '../../../../utils/config';

const activityState = [
  { value: 1, state: '即將開團', style: '#817161' },
  { value: 2, state: '開團中', style: '#F2AC33' },
  { value: 3, state: '已成團', style: '#1F9998' },
  { value: 4, state: '開團已截止', style: '#B9BDC5' },
  { value: '', state: '查詢全部', style: '#221E73' },
];

function PicnicPrivateList() {
  const [stateSearch, setStateSearch] = useState(activityState);
  const [cardChange, setCardChange] = useState(true);
  const [horizontalCardChange, setHorizontalCardChange] = useState(false);

  const [searchWords, setSearchWords] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [sort, setSort] = useState(0);

  const [filterState, setFilterState] = useState('');
  const [minJoinPeople, setMinJoinPeople] = useState(0);
  const [maxJoinPeople, setMaxJoinPeople] = useState(15);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [maxDateValue, setMaxDateValue] = useState('');
  const [minDateValue, setMinDateValue] = useState('');
  const [pageNow, setPageNow] = useState(1);

  // 列表首頁 全部資料
  const [data, setData] = useState([]);

  const getPrivatelList = async () => {
    let response = await axios.get(
      `${API_URL}/picnic/group?searchWord=${searchWords}&activitySort=${sort}&page=${pageNow}&filterState=${filterState}&minJoinPeople=${minJoinPeople}&maxJoinPeople=${maxJoinPeople}&minDate=${minDate}&maxDate=${maxDate}`
    );
    // console.log(response.data.data);
    setData(response.data.data);
  };
  useEffect(() => {
    getPrivatelList();
  }, [
    searchWords,
    sort,
    pageNow,
    filterState,
    maxJoinPeople,
    minJoinPeople,
    minDate,
    maxDate,
  ]);

  // 引入card
  const card = <ActivityCard data={data} />;
  const horizontalCard = <ActivityHorizontalCard data={data} />;

  return (
    <>
      <Header />
      <IconContext.Provider value={{ color: '#817161', size: '2em' }}>
        <main className="activityPage">
          {/* banner */}
          <div className="banner">
            <img
              src="/img/picnic/activity_picnic_img/picnic_detail_banner2.jpeg"
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
                      return (
                        <ActivityStateFilter
                          key={uuidv4()}
                          v={v}
                          filterState={filterState}
                          setFilterState={setFilterState}
                        />
                      );
                    })}
                  </div>

                  {/* headcount slider */}
                  <ActivitySliderHeadcount
                    minJoinPeople={minJoinPeople}
                    setMinJoinPeople={setMinJoinPeople}
                    maxJoinPeople={maxJoinPeople}
                    setMaxJoinPeople={setMaxJoinPeople}
                    setPageNow={setPageNow}
                  />

                  {/* date filter */}
                  <ActivityDateFilter
                    minDate={minDate}
                    setMinDate={setMinDate}
                    maxDate={maxDate}
                    setMaxDate={setMaxDate}
                    maxDateValue={maxDateValue}
                    setMaxDateValue={setMaxDateValue}
                    minDateValue={minDateValue}
                    setMinDateValue={setMinDateValue}
                  />
                </div>
                {/* 右側活動列表 */}
                <div className="col-9">
                  <div className="d-flex justify-content-between">
                    <div className="mb-3 ">
                      {/* card 切換 */}
                      <ActivitySelect sort={sort} setSort={setSort} />
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
                            value={searchWord}
                            onChange={(e) => {
                              setSearchWord(e.target.value);
                            }}
                          />
                          <FaSearch
                            className="ms-2 mb-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setSearchWords(searchWord)}
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
                    lastPage={2}
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

export default PicnicPrivateList;
