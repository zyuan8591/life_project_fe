/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const subClrBrown = '#817161';
const newsTextClr = '#8c8c8c';
const newsBgClr = '#f2f2f2';

const container = css`
  color: #444;
  flex-wrap: wrap;
  border-bottom: 1px dashed ${newsTextClr};
  padding: 1rem 0;
  &:last-child {
    border: 0;
  }
  &:hover {
    color: ${subClrBrown};
  }
`;
const category = css`
  color: ${newsTextClr};
  background: ${newsBgClr};
  padding: 0.25rem 1.5rem;
  font-weight: bold;
  @media (max-width: 768px) {
    padding: 0.25rem 0.75rem;
  }
`;

const IndexNews = ({ data = [] }) => {
  return (
    <>
      <ul className="ps-0">
        {data.slice(0, 5).map((d) => {
          return (
            <li
              key={d.id}
              css={container}
              className="d-flex align-items-center gap-2 cursorPointer"
            >
              <span>{d.date}</span>
              <div className="text-nowrap" css={category}>
                {d.categoryName}
              </div>
              <span>{d.content}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default IndexNews;
