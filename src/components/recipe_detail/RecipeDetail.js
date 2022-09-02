import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../public_component/Footer';
import Header from '../public_component/Header';
import BackToTop from '../public_component/BackToTop';
import '../../styles/_recipeDetail.scss';
import RecipeIntro from './component/RecipeIntro';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const stepRef = useRef(null);
  const [stickyTop, setStickyTop] = useState(0);
  const [progress, setProgress] = useState(0);

  const sticky = css`
    position: sticky;
    top: ${stickyTop}px;
  `;

  // let recipeProgress = 0;
  const scrollHandler = (e) => {
    const hor = stepRef.current;
    const app = e.target;
    console.log(app.scrollTop);
    console.log(window.innerHeight);
    if (app.scrollTop < window.innerHeight) {
      setProgress(0);
      setStickyTop(0);
    } else if (app.scrollTop > window.innerHeight * 2) {
      setProgress(1);
      setStickyTop(parseInt(-(app.scrollTop - window.innerHeight * 2)));
    } else {
      setStickyTop(0);
      setProgress((app.scrollTop - window.innerHeight) / window.innerHeight);
    }
    let position = (hor.scrollWidth - window.innerWidth) * progress;
    hor.scrollTo({ left: position });
  };

  return (
    <>
      <div className="recipeDetail" onScroll={(e) => scrollHandler(e)}>
        {/* <div className="recipeDetail"> */}
        <Header fixed={false} />
        <section className="recipeDetailIntro">
          <RecipeIntro />
        </section>
        <section className="recipeDetailStep" ref={stepRef} css={sticky}>
          <div className="bg-success vh100 recipeDetailStepLeft"></div>
          <div className="bg-warning vh100 recipeDetailStepRight"></div>
        </section>
        <section className="vh100"></section>
        <section className="recipeDetailRecommend vh100">123</section>
        <Footer />
      </div>
    </>
  );
};

export default RecipeDetail;
