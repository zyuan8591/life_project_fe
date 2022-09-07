import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/_header.scss';
import { IconContext } from 'react-icons';
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

const pages = [
  // { title: '首頁', route: '/' },
  { title: '商品一覽', route: '/products' },
  { title: '料理食譜', route: '/recipes' },
  { title: '活動專區', route: '/activity' },
  { title: '會員中心', route: '/users/account' },
  { title: '最新消息', route: '/news' },
  // { title: '聯絡我們', route: '/contact' },
];

const Header = ({ fixed = true }) => {
  const [search, setSearch] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });

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
            {/* Like */}
            {/* <li className="me-3 userItem">
              <Link to="/:user/recipe" className="flexCenter">
                <AiOutlineHeart />
              </Link>
            </li>
            {/* OrderStep */}
            <li className="me-3 userItem">
              <Link to="/orderstep" className="flexCenter">
                <AiOutlineShoppingCart />
              </Link>
            </li>
            {/* User */}
            {/* <li className="me-3 userItem">
              <Link to="/users/account" className="flexCenter">
                <AiOutlineUser />
              </Link>
            </li> */}
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
                <span>1213213132132</span>
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
