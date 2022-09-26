import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.css';
import { IconContext } from 'react-icons';
import { BsGridFill } from 'react-icons/bs';
import { FaRegTired, FaRegGrinHearts } from 'react-icons/fa';
import { FaListUl, FaSearch } from 'react-icons/fa';

import '../../../../styles/picnic/_picnicOffical.scss';
import '../../../../styles/picnic/camping_main/_campingMain.scss';
import Header from '../../../public_component/Header';
import BreadCrumb from '../../../public_component/BreadCrumb';
import Footer from '../../../public_component/Footer';
import BackToTop from '../../../public_component/BackToTop';
import ActivityStateFilter from './component/ActivityStateFilter';
import ActivitySliderPrice from './component/ActivitySliderPrice';
import ActivitySliderHeadcount from './component/ActivitySliderHeadcount';
import ActivityDateFilter from './component/ActivityDateFilter';
import ActivityCard from './component/ActivityCard';
import ActivityHorizontalCard from './component/ActivityHorizontalCard';
import PaginationBar from '../../../public_component/PaginationBar';
import ActivitySelect from './component/ActivitySelect';
import Notification from '../../../activity/Notification';
import { useUserRights } from '../../../../usecontext/UserRights';

import axios from 'axios';
import { API_URL } from '../../../../utils/config';

const activityState = [
  { value: 1, state: '即將開團', style: '#817161' },
  { value: 2, state: '開團中', style: '#F2AC33' },
  { value: 3, state: '已成團', style: '#1F9998' },
  { value: 4, state: '開團已截止', style: '#B9BDC5' },
  { value: '', state: '查詢全部', style: '#221E73' },
];

function PicnicList() {
  // const [isLoading, setIsLoading] = useState(false);
  const [stateSearch, setStateSearch] = useState(activityState);
  const [cardChange, setCardChange] = useState(true);
  const [horizontalCardChange, setHorizontalCardChange] = useState(false);
  const [iconChange, setIconChange] = useState(false);

  const [searchWords, setSearchWords] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [sort, setSort] = useState(0);
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [filterState, setFilterState] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [minJoinPeople, setMinJoinPeople] = useState(0);
  const [maxJoinPeople, setMaxJoinPeople] = useState(30);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [maxDateValue, setMaxDateValue] = useState('');
  const [minDateValue, setMinDateValue] = useState('');
  const [dateRemind, setDateRemind] = useState('');

  // 列表首頁 全部資料
  const [data, setData] = useState([]);
  const { officialId } = useParams();
  const { user, setUser } = useUserRights();
  const [userCollect, setUserCollect] = useState([]);
  const [collectConfirm, setCollectConfirm] = useState(false); //收藏新增
  const [collectCancel, setCollectCancel] = useState(false); //收藏取消
  const [loginBtn, setLoginBtn] = useState(false);

  // 列表首頁 搜尋、排序、頁碼
  const getOfficalList = async () => {
    let response = await axios.get(
      `${API_URL}/picnic/official?perPage=${perPage}&searchWord=${searchWords}&activitySort=${sort}&page=${pageNow}&filterState=${filterState}&minPrice=${minPrice}&maxPrice=${maxPrice}&minJoinPeople=${minJoinPeople}&maxJoinPeople=${maxJoinPeople}&minDate=${minDate}&maxDate=${maxDate}`
    );
    // console.log(response);
    setData(response.data.data);
    setLastPage(response.data.pagination.lastPage);
  };
  useEffect(() => {
    getOfficalList();
  }, [
    searchWords,
    sort,
    pageNow,
    filterState,
    maxPrice,
    minPrice,
    maxJoinPeople,
    minJoinPeople,
    minDate,
    maxDate,
    perPage,
  ]);

  // 此會員所有收藏
  useEffect(() => {
    let getAllCollect = async () => {
      let response = await axios.get(
        `${API_URL}/picnic/official/officialAllCollect`,
        {
          withCredentials: true,
        }
      );
      console.log('getAllCollect', response.data);
      let hadJoinCollect = response.data.map((data) => data.picnic_id);
      setUserCollect(hadJoinCollect);
    };
    if (user) {
      getAllCollect();
    }
  }, [user]);

  async function handleAddFav(officialId) {
    // console.log(officialId);
    let response = await axios.post(
      `${API_URL}/picnic/collectAddJoin/${officialId}`,
      {},
      { withCredentials: true }
    );
    console.log('handleAddJoin', response.data);
    let nowJoinCollect = response.data.getCollect.map((data) => data.picnic_id);
    setUserCollect(nowJoinCollect);
    // console.log('add', nowJoinCollect);
    setCollectConfirm(true); //加入收藏
    setTimeout(() => {
      setCollectConfirm(false);
    }, [2000]);
  }

  async function handleDelFav(officialId) {
    let response = await axios.delete(
      `${API_URL}/picnic/collectDelJoin/${officialId}`,
      { withCredentials: true }
    );
    console.log('handleDelFav', response.data);
    let nowJoinCollect = response.data.getCollect.map((data) => data.picnic_id);
    setUserCollect(nowJoinCollect);
    // console.log('del', nowJoinCollect);
    setCollectCancel(true); //取消收藏
    setTimeout(() => {
      setCollectCancel(false);
    }, 2000);
  }

  // 引入card
  const card = (
    <ActivityCard
      data={data}
      handleAddFav={handleAddFav}
      handleDelFav={handleDelFav}
      user={user}
      userCollect={userCollect}
      setCollectConfirm={setCollectConfirm}
      setLoginBtn={setLoginBtn}
    />
  );
  const horizontalCard = <ActivityHorizontalCard data={data} />;
  return (
    <>
      <Header />
      <IconContext.Provider value={{ color: '#817161', size: '2em' }}>
        <main className="activityPage">
          {collectConfirm ? (
            <Notification
              contaninText={'已加入收藏'}
              setLoginBtn={setLoginBtn}
              bottom={30}
            >
              <FaRegGrinHearts />
            </Notification>
          ) : (
            ''
          )}
          {collectCancel ? (
            <Notification
              contaninText={'已取消收藏'}
              setLoginBtn={setLoginBtn}
              bottom={30}
            >
              <FaRegTired />
            </Notification>
          ) : (
            ''
          )}
          {loginBtn ? (
            <Notification
              contaninText={'請先登入會員'}
              linkTo={'/signin?p=1'}
              setLoginBtn={setLoginBtn}
            />
          ) : (
            ''
          )}
          {/* banner */}
          <div className="banner">
            <img
              src="/img/picnic/activity_picnic_img/picnic_detail_banner.webp"
              alt="camping"
            />
          </div>
          <div className="main">
            {/* breadCrumb */}
            <div className="breadCrumb py-3">
              <BreadCrumb />
            </div>
            <div className="contain">
              <div className="row m-0">
                {/* 左側篩選欄 */}
                <div className="col-sm-3 col-12">
                  {/* state filter */}
                  <div className="activityState ">
                    <p className="stateText">活動狀態</p>
                    <div className="mb-flex">
                      {stateSearch.map((v, i) => {
                        return (
                          <ActivityStateFilter
                            key={uuidv4()}
                            v={v}
                            filterState={filterState}
                            setFilterState={setFilterState}
                            setPageNow={setPageNow}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* price slider */}
                  <ActivitySliderPrice
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    setPageNow={setPageNow}
                    data={data}
                  />

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
                    setPageNow={setPageNow}
                    setDateRemind={setDateRemind}
                    dateRemind={dateRemind}
                  />
                </div>
                {/* 右側活動列表 */}
                <div className="col-sm-9 col-12 mb-3 pc-view">
                  <div className="d-flex justify-content-between">
                    <div className="mb-3 ">
                      {/* card 切換 篩選ICON */}
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
                        <div className="me-ms-2">
                          <input
                            className="searchInput"
                            placeholder="Search.."
                            type="text"
                            value={searchWord}
                            onChange={(e) => {
                              // console.log(e.target.value);
                              setSearchWord(e.target.value);
                            }}
                          />
                          <FaSearch
                            className="ms-2 mb-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              if (searchWord === '') return setSearchWords('');
                              setPageNow(1);
                              setSearchWords(searchWord);
                            }}
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
                    lastPage={lastPage}
                    pageNow={pageNow}
                    setPageNow={setPageNow}
                  />
                </div>

                {/* RWD */}
                <div className="col-sm-9 col-12 mb-3 mb-view">
                  <div className="iconGroup">
                    <div className="d-flex align-items-center justify-content-center w-100 mb-3">
                      <div className="SearchBar">
                        <input
                          style={{ width: '275px' }}
                          className="searchInput"
                          placeholder="Search.."
                          type="text"
                          value={searchWord}
                          onChange={(e) => {
                            // console.log(e.target.value);
                            setSearchWord(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <IconContext.Provider
                          value={{ color: '#817161', size: '1.7em' }}
                        >
                          <FaSearch
                            className="ms-2 mb-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              if (searchWord === '') return setSearchWords('');
                              setPageNow(1);
                              setSearchWords(searchWord);
                            }}
                          />
                        </IconContext.Provider>
                      </div>
                    </div>
                    <div className="sortBar">
                      {/* 篩選ICON */}
                      <div className="sort">
                        <ActivitySelect sort={sort} setSort={setSort} />
                      </div>
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
                    lastPage={lastPage}
                    pageNow={pageNow}
                    perPage={perPage}
                    setPageNow={setPageNow}
                    setPerPage={setPerPage}
                    moreText={''}
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

export default PicnicList;

// --- 列表首頁 ---
// useEffect(() => {
//   let getOfficalList = async () => {
//     let response = await axios.get(
//       `${API_URL}/picnic/official?searchWord=${searchWords}&activitySort=${sort}&page=${pageNow}`
//     );
//     // console.log(response.data);
//     setData(response.data.data);
//     // setAllData(response.data);
//   };
//   getOfficalList();
// }, []);

// useEffect(() => {
//   // console.log(data);
// }, [data]);

// 搜尋 前端
// const handleSearch = (allData, searchWord) => {
//   let newData = [...allData];
//   if (searchWord.length) {
//     newData = allData.filter((data) => {
//       return data.picnic_title.includes(searchWord);
//     });
//   }
//   console.log(newData);
//   if (searchWord !== '') {
//     setData(newData);
//   } else {
//     setData(allData);
//   }
// };

// useEffect(() => {
//   let newData = [];

//   newData = handleSearch(allData, searchWord);
// }, [searchWord]);

// 排序
// const getSort = async () => {
//   console.log('sort', sort);
//   let response = await axios.get(
//     `${API_URL}/picnic/official?activitySort=${sort}`
//   );
//   setData(response.data);
//   // console.log(response.data);
// };
// useEffect(() => {
//   getSort();
// }, [sort]);
