import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../../styles/_header.scss';
import { IconContext } from 'react-icons';
import HeaderSearch from './HeaderSearch';
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../../utils/config';
import { useUserRights } from '../../../usecontext/UserRights';

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

  const [menu, setMenu] = useState(false);

  // viewportWidth state for RWD design
  const [vw, setVw] = useState(window.innerWidth);
  const windowResize = () => setVw(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', windowResize);
  }, []);
  useEffect(() => {
    if (vw > 768) setMenu(false);
  }, [vw]);

  // enter search bar
  const userAvatorClickHandler = () => {
    if (userSelectActive) return setUserSelectActive(false);
    setUserSelectActive(true);
  };

  // SHOW header
  let scrollY = window.scrollY < 65 ? 65 : window.scrollY;
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
        <i
          className={`fa-solid fa-bars fs-4 headerMenu me-2 cursorPointer`}
          onClick={() => setMenu(!menu)}
        ></i>
        <Link to="/" className="headerTitle">
          <h1 className="m-0 header-item">LIFE</h1>
        </Link>
        {/* NAV BAR */}
        <nav
          className={`flexCenter header-item ${menu ? 'active shadow-sm' : ''}`}
        >
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
              <Link to="/orderstep/cart" className="flexCenter">
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
                    src={`${API_URL_IMG}${user.photo}`}
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
      {search && <HeaderSearch setSearch={setSearch} />}
    </header>
  );
};

export default Header;
