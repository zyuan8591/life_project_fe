import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import 'antd/dist/antd.css';
import { IconContext } from 'react-icons';
import { BsGridFill } from 'react-icons/bs';
import { FaListUl, FaSearch } from 'react-icons/fa';
import { GiCampingTent } from 'react-icons/gi';

import '../../../styles/camping/camping_main/_campingMain.scss';
import ActivityStateFilter from './component/ActivityStateFilter';
import ActivitySliderPrice from './component/ActivitySliderPrice';
import ActivitySliderHeadcount from './component/ActivitySliderHeadcount';
import ActivityDateFilter from './component/ActivityDateFilter';
import ActivityCard from './component/ActivityCard';
import ActivityHorizontalCard from './component/ActivityHorizontalCard';
import PaginationBar from '../../public_component/PaginationBar';
import ActivitySelect from './component/ActivitySelect';
import Notification from '../../activity/Notification';
import NotFound from './NotFound';
import { useUserRights } from '../../../usecontext/UserRights';

const activityState = [
  { id: 1, state: '即將開團', style: '#817161' },
  { id: 2, state: '開團中', style: '#F2AC33' },
  { id: 3, state: '已成團', style: '#1F9998' },
  { id: 4, state: '開團已截止', style: '#B9BDC5' },
  { id: '', state: '查看全部', style: '#221E73' },
];

function CampingMain() {
  const [stateSearch, setStateSearch] = useState(activityState);
  const [cardChange, setCardChange] = useState(true);
  const [horizontalCardChange, setHorizontalCardChange] = useState(false);
  const [campingData, setCampingData] = useState([]);
  const [dateRemind, setDateRemind] = useState('');
  const [state, setState] = useState('');
  const [maxPrice, setMaxPrice] = useState(9900);
  const [minPrice, setMinPrice] = useState(0);
  const [maxJoinTtl, setMaxJoinTtl] = useState(22);
  const [minJoinTtl, setMinJoinTtl] = useState(0);
  const [maxDateValue, setMaxDateValue] = useState('');
  const [minDateValue, setMinDateValue] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [order, setOrder] = useState('');
  const [titleSearch, setTitleSearch] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [numberTtl, setnumberTtl] = useState(0);
  const { user, setUser } = useUserRights();
  const [userCollected, setUserCollected] = useState([]);
  const [collectConfirm, setCollectConfirm] = useState(false);
  const [collectCancel, setCollectCancel] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);

  useEffect(() => {
    let getCampingData = async () => {
      let response = await axios.get(
        `${API_URL}/camping?state=${state}&maxPrice=${maxPrice}&minPrice=${minPrice}&minDate=${minDate}&maxDate=${maxDate}&search=${search}&order=${order}&page=${page}&maxJoinTtl=${maxJoinTtl}&minJoinTtl=${minJoinTtl}`
      );
      console.log(response.data.pagination.total);
      setnumberTtl(response.data.pagination.total);
      setLastPage(response.data.pagination.lastPage);
      setCampingData(response.data.result);
    };
    getCampingData();

    let getAllCollect = async () => {
      let response = await axios.get(`${API_URL}/camping/campingCollected`, {
        withCredentials: true,
      });
      // console.log('getAll', response.data);
      let collected = response.data.map((v) => v.activity_id);
      setUserCollected(collected);
    };
    if (user) {
      getAllCollect();
    }
  }, [
    state,
    minPrice,
    maxPrice,
    minDate,
    maxDate,
    order,
    search,
    page,
    maxJoinTtl,
    minJoinTtl,
    user,
  ]);
  // console.log(state);

  // stateLabelBtnStyle
  const stateClassName = (state) => {
    switch (state) {
      case '開團中':
        return '#F2AC33';
      case '已成團':
        return '#1F9998';
      case '開團已截止':
        return '#B9BDC5';
      default:
        return '#817161';
    }
  };

  // 引入card
  const card = () => {
    if (numberTtl !== 0) {
      return campingData.map((v) => {
        return (
          <ActivityCard
            key={v.id}
            v={v}
            stateClassName={stateClassName}
            user={user}
            setUser={setUser}
            userCollected={userCollected}
            setUserCollected={setUserCollected}
            // collectConfirm={collectConfirm}
            setCollectConfirm={setCollectConfirm}
            // collectCancel={collectCancel}
            setCollectCancel={setCollectCancel}
            setLoginBtn={setLoginBtn}
          />
        );
      });
    } else {
      return <NotFound />;
    }
  };
  // TODO:noData view
  const horizontalCard = () => {
    if (numberTtl !== 0) {
      return campingData.map((v) => {
        return (
          <ActivityHorizontalCard
            key={v.id}
            v={v}
            stateClassName={stateClassName}
            user={user}
            setUser={setUser}
            userCollected={userCollected}
            setUserCollected={setUserCollected}
          />
        );
      });
    } else {
      return <NotFound />;
    }
  };
  // campingData.map((v) => {
  //   return (
  //     <ActivityHorizontalCard
  //       key={v.id}
  //       v={v}
  //       stateClassName={stateClassName}
  //       user={user}
  //       setUser={setUser}
  //       userCollected={userCollected}
  //       setUserCollected={setUserCollected}
  //     />
  //   );
  // });

  return (
    <>
      <IconContext.Provider value={{ color: '#817161', size: '2em' }}>
        {collectConfirm ? (
          <Notification contaninText={'已加入收藏'} setLoginBtn={setLoginBtn}>
            <GiCampingTent />
          </Notification>
        ) : (
          ''
        )}
        {collectCancel ? (
          <Notification contaninText={'已取消收藏'} setLoginBtn={setLoginBtn}>
            <GiCampingTent />
          </Notification>
        ) : (
          ''
        )}
        {loginBtn ? (
          <Notification
            contaninText={'請先登入會員'}
            linkTo={'/signin/login'}
            setLoginBtn={setLoginBtn}
          />
        ) : (
          ''
        )}

        <main className="activityPage">
          {/* banner */}
          <div className="banner">
            <img
              src="/img/camping/activity_camping_img/main_img_1.jpg"
              alt="camping"
            />
          </div>
          <div className="main">
            {/* breadCrumb */}
            <p className="breadCrumb py-3">LIFE --- 活動專區 </p>
            <div className="contain">
              <div className="row m-0">
                {/* 左側篩選欄 */}
                <div className="col-12 col-sm-3">
                  {/* state filter */}
                  <div className="activityState">
                    <p className="stateText">活動狀態</p>
                    <div className="rwdFlex">
                      {stateSearch.map((v) => {
                        return (
                          <ActivityStateFilter
                            key={uuidv4()}
                            v={v}
                            setState={setState}
                            setPage={setPage}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="p-view">
                    {/* price slider */}
                    <ActivitySliderPrice
                      campingData={campingData}
                      setMaxPrice={setMaxPrice}
                      setMinPrice={setMinPrice}
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      setPage={setPage}
                    />

                    {/* headcount slider */}
                    <ActivitySliderHeadcount
                      maxJoinTtl={maxJoinTtl}
                      minJoinTtl={minJoinTtl}
                      setMinJoinTtl={setMinJoinTtl}
                      setMaxJoinTtl={setMaxJoinTtl}
                      setPage={setPage}
                    />
                  </div>

                  {/* RWD */}
                  <div className="m-view justify-content-between">
                    {/* price slider */}
                    <ActivitySliderPrice
                      campingData={campingData}
                      setMaxPrice={setMaxPrice}
                      setMinPrice={setMinPrice}
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      setPage={setPage}
                    />

                    {/* headcount slider */}
                    <ActivitySliderHeadcount
                      maxJoinTtl={maxJoinTtl}
                      minJoinTtl={minJoinTtl}
                      setMinJoinTtl={setMinJoinTtl}
                      setMaxJoinTtl={setMaxJoinTtl}
                      setPage={setPage}
                    />
                  </div>
                  {/* ------ */}

                  {/* date filter */}
                  <ActivityDateFilter
                    setMaxDate={setMaxDate}
                    setMinDate={setMinDate}
                    maxDateValue={maxDateValue}
                    setMaxDateValue={setMaxDateValue}
                    minDateValue={minDateValue}
                    setMinDateValue={setMinDateValue}
                    setPage={setPage}
                    setDateRemind={setDateRemind}
                    dateRemind={dateRemind}
                  />
                </div>
                {/* 右側活動列表 */}
                <div className="col-12 col-sm-9">
                  {/* 篩選 */}

                  {/* p-view */}
                  <div className="p-view">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <ActivitySelect setOrder={setOrder} />
                      </div>
                      <div className="d-flex align-items-center">
                        {/* card 切換 */}
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
                              maxLength={15}
                              // value={titleSearch}
                              onChange={(e) => {
                                let textValue = e.target.value.replace(
                                  /[, ]/g,
                                  ''
                                );
                                setTitleSearch(textValue);
                              }}
                            />
                            <FaSearch
                              className="ms-2 mb-1"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                if (titleSearch === '') return setSearch('');
                                setSearch(titleSearch);
                                setPage(1);
                              }}
                            />
                          </div>
                        </IconContext.Provider>
                      </div>
                    </div>
                  </div>
                  {/* page */}
                  <div className="pageTtl text-end me-2 p-view">
                    {numberTtl !== 0
                      ? `第 ${page} 頁，共 ${lastPage} 頁，共 ${numberTtl} 筆`
                      : ''}
                  </div>
                  {/* ------ */}

                  {/* RWD m-view */}
                  <div className="m-view justify-content-between align-items-center">
                    <ActivitySelect setOrder={setOrder} />
                    <IconContext.Provider
                      value={{ color: '#817161', size: '1.7em' }}
                    >
                      <div>
                        <input
                          className="searchInput"
                          placeholder="Search.."
                          type="text"
                          maxLength={15}
                          value={titleSearch}
                          onChange={(e) => {
                            let textValue = e.target.value.replace(/[, ]/g, '');
                            setTitleSearch(textValue);
                          }}
                        />
                        <FaSearch
                          className="ms-2 mb-1 me-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            if (titleSearch === '') return setSearch('');
                            setSearch(titleSearch);
                            setPage(1);
                          }}
                        />
                      </div>
                    </IconContext.Provider>
                  </div>

                  <div className="m-view justify-content-between mt-3 mx-2">
                    <div className="d-flex align-items-center">
                      {/* card 切換 */}
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
                    </div>
                    {/* page */}
                    <div className="pageTtl text-end m-view">
                      {numberTtl !== 0
                        ? `第 ${page} 頁，共 ${lastPage} 頁，共 ${numberTtl} 筆`
                        : ''}
                    </div>
                    {/* ------ */}
                  </div>

                  <IconContext.Provider value={{ color: '#000', size: '1rem' }}>
                    <div className="row p-view">
                      {/* 列表 card */}
                      {/* 列表 HorizontalStyle */}
                      {cardChange === true && horizontalCardChange === false
                        ? card()
                        : horizontalCard()}
                    </div>
                    <div className="cards m-view">
                      {/* 列表 card */}
                      {/* 列表 HorizontalStyle */}
                      {cardChange === true && horizontalCardChange === false
                        ? card()
                        : horizontalCard()}
                    </div>
                  </IconContext.Provider>
                  <PaginationBar
                    lastPage={lastPage}
                    pageNow={page}
                    setPageNow={setPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </IconContext.Provider>
    </>
  );
}

export default CampingMain;
