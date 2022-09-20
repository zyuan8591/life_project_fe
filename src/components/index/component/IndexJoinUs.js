/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';

// emotion css
const subClrBrown = '#817161';

const container = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 600px;
  height: 600px;
  max-width: 100vw;
  @media (max-width: 500px) {
    max-height: 450px;
  }
`;
const joinUs = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 400px;
  height: 400px;
  background: rgba(0, 0, 0, 0.1);
  outline: 10px solid ${subClrBrown};

  // layout
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 0 1rem;
  &::after {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    backdrop-filter: blur(4px);
  }
  @media (max-width: 500px) {
    width: 300px;
    height: 300px;
    p {
      font-size: 12px;
    }
  }
`;
const joinUsTitle = css`
  font-size: 2rem;
  border-bottom: 1px solid #fff;
`;
const joinUsLink = css`
  color: #fff !important;
  padding: 0.5rem 1.75rem;
  border: 1px solid #fff;
  transition: all 0.2s ease-in-out;
  border-radius: 500px;
  &:hover {
    box-shadow: 0 0 10px 0 #fff inset, 0 0 20px 2px #fff;
  }
`;

const IndexJoinUs = () => {
  return (
    <div css={container}>
      <img src="/img/index/joinUs.jpg" className="objectCover" alt="joinUs" />
      <div css={joinUs}>
        <span css={joinUsTitle}>JOIN OUR LIFE</span>
        <p className="my-3">
          生活上的美好,都是因為擁有了最好的生活選物,
          <br />
          LIFE提供無論是單身或是家庭的您,享受更高品質的生活。
        </p>
        <Link to="/signin/signup" css={joinUsLink}>
          JOIN NOW
        </Link>
      </div>
    </div>
  );
};

export default IndexJoinUs;
