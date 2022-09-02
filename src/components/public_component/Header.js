import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/_header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../utils/paginationSlice';
import { IconContext } from 'react-icons';
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineShopping,
} from 'react-icons/ai';

const pages = [
  { title: '首頁', route: '/' },
  { title: '商品', route: '/products' },
  { title: '食譜', route: '/recipes' },
  { title: '活動專區', route: '/activity' },
  { title: '最新消息', route: '/news' },
  { title: '聯絡我們', route: '/contact' },
];

const Header = ({ fixed = true }) => {
  const [scrollDown, setScrollDown] = useState(false);
  const pageNow = useSelector((state) => state.pagination.pagination);
  const dispatch = useDispatch();

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });

  return (
    <IconContext.Provider
      value={{ color: '#444', size: '2rem', className: 'headerIcon' }}
    >
      <header
        className={`header w-100 ${fixed ? 'position-fixed' : ''} ${
          scrollDown ? 'hidden' : ''
        }`}
      >
        <h1 className="mb-0 header-item">LIFE</h1>
        <nav className="flexCenter header-item">
          <ul className="nav list-unstyled flexCenter">
            {pages.map((p) => {
              return (
                <li key={uuidv4()}>
                  <Link
                    to={p.route}
                    className={`${pageNow === p.title ? 'active' : ''}`}
                    onClick={() => {
                      dispatch(setPage(p.title));
                    }}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="user flexCenter header-item">
          <ul className="list-unstyled flexCenter mb-0">
            {/* search */}
            <li className="me-3 userItem active">
              <Link to="/" className="flexCenter">
                <AiOutlineSearch />
              </Link>
            </li>
            {/* Like */}
            <li className="me-3 userItem">
              <Link
                to="/:user/recipe"
                className="flexCenter"
                onClick={() => {
                  dispatch(setPage(''));
                }}
              >
                <AiOutlineHeart />
              </Link>
            </li>
            {/* Cart */}
            <li className="me-3 userItem">
              <Link
                to="/cart"
                className="flexCenter"
                onClick={() => {
                  dispatch(setPage(''));
                }}
              >
                <AiOutlineShoppingCart />
              </Link>
            </li>
            {/* User */}
            <li className="me-3 userItem">
              <Link
                to="/users/account"
                className="flexCenter"
                onClick={() => {
                  dispatch(setPage(''));
                }}
              >
                <AiOutlineUser />
              </Link>
            </li>
            {/* Shop */}
            {/* <li className="headerShop ps-3">
              <Link to="/products" className="flexCenter headerIcon">
                <AiOutlineShopping />
                <span className="ms-3">SHOP</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </header>
    </IconContext.Provider>
  );
};

export default Header;
