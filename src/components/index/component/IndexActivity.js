/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

// emotion css
const subClrBrown = '#817161';
const subClrGY = '#B9BDC5';
const contentClr = '#444';
const container = css`
  margin: 2rem 0;
  color: ${contentClr};
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;
const cards = css`
  display: flex;
  gap: 0.5rem;
  flex: 1 1 auto;
`;
const card = css`
  flex: 1 1 auto;
  padding: 1.75rem 0;
  position: relative;
  &::before {
    display: flex;
    align-items: center;
    justify-content: center;
    content: '';
    height: 4px;
    width: 100%;
    background: ${subClrGY};
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s;
  }
  &:hover:before {
    background: ${subClrBrown};
  }
  &:hover .cardCotainer .textContent {
    opacity: 0.8;
  }
  &:hover .cardCotainer .imgContainer {
    opacity: 0.5;
  }
  &:last-child .cardCotainer {
    border: none;
  }
  @media (max-width: 500px) {
    padding: 1rem 0;
  }
`;
const cardCotainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  transition: 0.3s;
  position: relative;
  border-right: 1px dashed ${subClrGY};
  margin: 0 -0.25rem;
  @media (max-width: 768px) {
    border: none;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
const imgContainer = css`
  max-width: 50px;
  max-height: 50px;
  margin: 0;
  opacity: 0.8;
  transition: 0.3s;
`;
const textContent = css`
  display: flex;
  flex-direction: column;
  transition: 0.3s;
`;
const btns = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1 1 auto;
  max-width: 180px;
  @media (max-width: 768px) {
    max-width: 100%;
    flex-direction: row;
  }
`;
const btn = css`
  flex: 1 1 auto;
  padding: 0.5rem 1.5rem;
  border: 2px solid ${subClrGY};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: 0.3s;
  white-space: nowrap;
  &:hover {
    border-color: ${subClrBrown};
  }
  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

const IndexActivity = () => {
  const activity = [
    {
      titleEn: 'Activities',
      titleCh: '活動專區',
      img: 'indexActivity.png',
      link: '/activity',
    },
    {
      titleEn: 'Camping',
      titleCh: '立即前往露營',
      img: 'indexCamping.png',
      link: '/activity/camping',
    },
    {
      titleEn: 'Picnic',
      titleCh: '立即前往野餐',
      img: 'indexPicnic.png',
      link: '/activity/picnic',
    },
  ];

  const [vw, setVw] = useState(window.innerWidth);
  const setViewportWidth = () => setVw(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', setViewportWidth);
    return function cleanUp() {
      window.removeEventListener('resize', setViewportWidth);
    };
  }, []);

  return (
    <div css={container}>
      <div css={cards}>
        {activity.map((a, i) => {
          if (vw < 795 && i === 0) return '';
          return (
            <Link to={a.link} key={a.titleEn} css={card}>
              <div css={cardCotainer}>
                <figure css={imgContainer}>
                  <img
                    className="objectContain"
                    src={`/img/index/${a.img}`}
                    alt="campImage"
                  />
                </figure>
                <div css={textContent}>
                  <span>{a.titleEn}</span>
                  <span>{a.titleCh}</span>
                </div>
                {vw > 500 && (
                  <IconContext.Provider
                    value={{ color: '#817161', size: '0.75rem' }}
                  >
                    <FaArrowAltCircleRight />
                  </IconContext.Provider>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <div css={btns}>
        <Link to="/activity/picnic/official" css={btn}>
          <IconContext.Provider value={{ color: '#817161', size: '0.75rem' }}>
            <FaArrowAltCircleRight />
          </IconContext.Provider>
          <span>官方活動一覽</span>
        </Link>
        <Link to="/activity/picnic/group" css={btn}>
          <IconContext.Provider value={{ color: '#817161', size: '0.75rem' }}>
            <FaArrowAltCircleRight />
          </IconContext.Provider>
          <span>私人活動一覽</span>
        </Link>
      </div>
    </div>
  );
};

export default IndexActivity;
