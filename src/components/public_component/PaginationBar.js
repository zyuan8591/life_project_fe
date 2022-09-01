/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

// emotion css setting
const subClrBrown = '#817161';

const pageList = css`
  display: flex;
  gap: 1rem;
  margin-top: 5rem;
  padding: 0;
  justify-content: center;
`;
const pageItem = css`
  padding: 0.5rem 1.25rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0 1.7px 1px rgb(0 0 0 / 8%);
  &:hover {
    color: #fff;
    background: ${subClrBrown};
    svg {
      color: #fff !important;
    }
  }
`;

// page on click change display pages
const displayPageHandler = (i, pageNow, lastPage, displayPage) => {
  let result = 0;
  if (i + 1 < pageNow) {
    result = displayPage - 1 < 10 ? 10 : displayPage - 1;
  } else if (i + 1 > pageNow) {
    result = displayPage + 1 > lastPage ? lastPage : displayPage + 1;
  } else {
    result = displayPage;
  }
  return result;
};

const PaginationBar = ({ lastPage = 5, pageNow = 1, setPageNow }) => {
  const [displayPage, setDisplayPage] = useState(10);
  return (
    <IconContext.Provider value={{ color: subClrBrown }}>
      <ul css={pageList}>
        <li
          css={pageItem}
          onClick={() => {
            setDisplayPage(displayPage - 1 < 10 ? 10 : displayPage - 1);
            setPageNow(pageNow - 1 < 1 ? 1 : pageNow - 1);
          }}
          key={uuidv4()}
        >
          <AiOutlineLeft />
        </li>
        {Array(lastPage)
          .fill(1)
          .map((p, i) => {
            if (i >= displayPage) return;
            if (i < displayPage - 10) return;
            return (
              <li
                css={css`
                  ${pageItem};
                  background: ${pageNow === i + 1 ? subClrBrown : '#fff'};
                  color: ${pageNow === i + 1 ? '#fff' : subClrBrown};
                `}
                onClick={() => {
                  setDisplayPage(
                    displayPageHandler(i, pageNow, lastPage, displayPage)
                  );
                  setPageNow(i + 1);
                }}
              >
                {i + 1}
              </li>
            );
          })}
        <li
          css={pageItem}
          onClick={() => {
            setDisplayPage(
              displayPage + 1 > lastPage ? lastPage : displayPage + 1
            );
            setPageNow(pageNow + 1 > lastPage ? lastPage : pageNow + 1);
          }}
        >
          <AiOutlineRight />
        </li>
      </ul>
    </IconContext.Provider>
  );
};

export default PaginationBar;
