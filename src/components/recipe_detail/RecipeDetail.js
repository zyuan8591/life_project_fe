/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../public_component/Footer';
import Header from '../public_component/Header';
import BackToTop from '../public_component/BackToTop';
import '../../styles/_recipeDetail.scss';
import RecipeIntro from './component/RecipeIntro';
import RecipeRecommend from './component/RecipeRecommend';
import RecipeStepItem from './component/RecipeStepItem';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const stepRef = useRef(null);
  const stepBgRef = useRef(null);
  const introRef = useRef(null);
  const [stickyTop, setStickyTop] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bgLeft, setBgLeft] = useState(0);

  const sticky = css`
    position: sticky;
    top: ${stickyTop}px;
  `;
  const stepBg = css`
    height: 100vh;
    position: absolute;
    top: 0;
    left: ${bgLeft}px;
    z-index: -1;
    opacity: 0.6;
    overflow: hidden;
    /* transition: 0.1s; */
  `;

  const scrollHandler = (e) => {
    const hor = stepRef.current;
    const app = e.target;
    if (app.scrollTop < introRef.current.clientHeight) {
      setProgress(0);
      setStickyTop(0);
    } else if (
      app.scrollTop >
      window.innerHeight + introRef.current.clientHeight
    ) {
      setProgress(1);
      setStickyTop(
        parseInt(
          -(app.scrollTop - window.innerHeight - introRef.current.clientHeight)
        )
      );
    } else {
      setStickyTop(0);
      setProgress(
        (app.scrollTop - introRef.current.clientHeight) / window.innerHeight
      );
    }
    let stepPosition = (hor.scrollWidth - window.innerWidth) * progress;
    hor.scrollTo({ left: stepPosition });

    let stepBgPosition =
      (hor.scrollWidth - stepBgRef.current.offsetWidth) * progress;
    setBgLeft(parseInt(stepBgPosition));
  };

  return (
    <>
      <div className="recipeDetail" onScroll={(e) => scrollHandler(e)}>
        {/* Intro section */}
        <div ref={introRef}>
          <Header fixed={false} />
          <section className="recipeDetailIntro">
            <RecipeIntro />
          </section>
        </div>

        {/* Step section */}
        <section className="recipeDetailStep" ref={stepRef} css={sticky}>
          <div className="position-absolute h-100 top-0 start-0 flexCenter">
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
          </div>
          <div className="vh100 recipeDetailStepLeft"></div>
          <div className="vh100 recipeDetailStepRight"></div>
          {/* background */}
          <div className="" css={stepBg} ref={stepBgRef}>
            <img
              src="/img/recipe/other/recipe_step_bg.jpg"
              alt="stepBackGround"
              className=""
            />
          </div>
        </section>

        {/* Recommend section */}
        <section className="vh100"></section>
        <section className="recipeDetailRecommend mx-auto py-5 mb-5">
          <RecipeRecommend />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default RecipeDetail;
