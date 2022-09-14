import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/_header.scss';
import { IconContext } from 'react-icons';
import { API_URL } from '../../utils/config';
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import axios from 'axios';
import { useUserRights } from '../../usecontext/UserRights';

const pages = [
  { title: '商品一覽', route: '/products' },
  { title: '料理食譜', route: '/recipes' },
  { title: '活動專區', route: '/activity' },
  { title: '最新消息', route: '/news' },
];

const Header = ({ fixed = true }) => {
  const [search, setSearch] = useState(false);
  const { user, setUser } = useUserRights();
  const [scrollDown, setScrollDown] = useState(false);
  const [userSelectActive, setUserSelectActive] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  // const [searchData, setSearchData] = useState([]);

  // enter search bar
  const userAvatorClickHandler = () => {
    if (userSelectActive) return setUserSelectActive(false);
    setUserSelectActive(true);
  };
  // search bar key handler
  const inputHandler = (e) => {
    setSearchKey(e.target.value);
  };

  // SHOW header
  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });

  // LOG OUT
  async function handelLogout() {
    await axios.get(`${API_URL}/logout`, { withCredentials: true });
    setUser(null);
  }

  return (
    <header
      className={`header position-relative w-100 ${
        fixed ? 'position-fixed' : ''
      } ${scrollDown ? 'hidden' : ''}`}
    >
      <IconContext.Provider
        value={{ color: '#444', size: '2rem', className: 'headerIcon' }}
      >
        <Link to="/" className="headerTitle">
          <h1 className="m-0 header-item">LIFE</h1>
        </Link>
        {/* NAV BAR */}
        <nav className="flexCenter header-item">
          <ul className="nav list-unstyled flexCenter">
            {pages.map((p) => {
              return (
                <li key={uuidv4()}>
                  <NavLink
                    to={p.route}
                    className={(nav) => (nav.isActive ? 'active' : '')}
                  >
                    {p.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="user flexCenter header-item">
          <ul className="list-unstyled flexCenter mb-0">
            {/* search */}
            <li
              className="me-3 userItem active"
              onClick={() => {
                setSearch(true);
              }}
            >
              <button className="flexCenter border-0 bg-white">
                <AiOutlineSearch />
              </button>
            </li>
            {/* OrderStep */}
            <li className="me-3 userItem">
              <Link to="/orderstep" className="flexCenter">
                <AiOutlineShoppingCart />
              </Link>
            </li>

            {/* Login state display User avator */}

            {user ? (
              // IS LOGIN
              <li className="userItem position-relative headerLoginState">
                <figure
                  className="headerAvator m-0 flexCenter cursorPointer"
                  onClick={() => userAvatorClickHandler()}
                >
                  <img
                    src="/img/user/user_img/fish.png"
                    alt="userAvatar"
                    className="objectContain"
                  />
                </figure>
                {userSelectActive && (
                  <ul className="headerUserControl position-absolute top-100 end-0 mt-3 d-flex flex-column align-items-center fs-6 px-0 py-1">
                    <li className="py-1">
                      <Link to="/users/account">個人檔案</Link>
                    </li>
                    <li className="py-1" onClick={handelLogout}>
                      登出
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              // NOT LOGIN YET
              <li className="userItem position-relative headerLoginState cursorPointer">
                <div
                  className="flexCenter loginAvator"
                  onClick={() => userAvatorClickHandler()}
                >
                  <AiOutlineUser />
                </div>
                {userSelectActive && (
                  <ul className="headerUserControl position-absolute top-100 end-0 mt-3 d-flex flex-column align-items-center fs-6 px-0 py-1">
                    <li className="py-1">
                      <Link to="/signin/login">登入</Link>
                    </li>
                    <li className="py-1" onClick={handelLogout}>
                      <Link to="/signin/signup">註冊</Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </IconContext.Provider>
      {/* Search Section */}
      {search && (
        <div
          className={`headerSearchSection position-absolute top-0 start-0`}
          onClick={() => {
            setSearch(false);
          }}
        >
          <div
            className="headerSearch bg-white rounded-2 p-3 mx-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="headerSearchInput position-relative">
              <input
                type="text"
                placeholder="搜尋"
                className="w-100 rounded-2"
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
              <IconContext.Provider
                value={{
                  color: '#817161',
                  size: '1.75rem',
                  className:
                    'position-absolute top-50 start-0 translate-middle-y ms-3',
                }}
              >
                <AiOutlineSearch />
              </IconContext.Provider>
            </div>
            <div className="py-2 headerSearchTitle">搜尋結果</div>
            <div className="flexCenter mb-3">目前無搜尋結果</div>
            <ul className="headerSearchResult w-100 mb-3 ps-0 d-flex flex-column rounded-2">
              <li>
                <span>543</span>
              </li>
              <li>
                <span>1213213132132</span>
              </li>
              <li>
                <span>1213213132132</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
