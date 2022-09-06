import React from 'react';
import { useLocation } from 'react-router-dom';
import { pathnameLocale } from '../../utils/config';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const BreadCrumb = ({ last = '' }) => {
  const { pathname } = useLocation();

  const formatTextLocale = (pathname) => {
    // transform path to array
    const pathArray = pathname.split('/');

    // translate array to chinese
    const pathArrayLocale = pathArray.map((v, i) => {
      if (!v) return '';
      if (Number(v)) return '';
      return pathnameLocale[v] ? pathnameLocale[v] : v;
    });

    // list array
    const listArray = pathArrayLocale.map((v, i, array) => {
      if (i === 0 || v === '') return '';

      // last item
      if (i === array.length - 1) {
        return (
          <li
            key={uuidv4()}
            className="breadcrumb-item active"
            aria-current="page"
          >
            {v}
          </li>
        );
      }

      // middle items
      return (
        <li key={uuidv4()} className="breadcrumb-item">
          <Link to={pathArray.slice(0, i + 1).join('/')}>{v}</Link>
        </li>
      );
    });
    if (last) {
      listArray.push(
        <li
          key={uuidv4()}
          className="breadcrumb-item active"
          aria-current="page"
        >
          {last}
        </li>
      );
    }
    return listArray;
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          {formatTextLocale(pathname)}
        </ol>
      </nav>
    </>
  );
};

export default BreadCrumb;
