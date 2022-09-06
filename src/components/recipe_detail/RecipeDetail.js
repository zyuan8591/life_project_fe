/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../public_component/Footer';
import Header from '../public_component/Header';
import BackToTop from '../public_component/BackToTop';
import '../../styles/_recipeDetail.scss';
import RecipeIntro from './component/RecipeIntro';
import RecipeRecommend from './component/RecipeRecommend';
import RecipeStepItem from './component/RecipeStepItem';
import RecipeStepNumb from './component/RecipeStepNumb';

const RecipeDetail = () => {
  const { recipeId } = useParams();

  // for step section animation
  const introRef = useRef(null);
  const stepRef = useRef(null);
  const [stickyTop, setStickyTop] = useState(0);
  const stepContentRef = useRef(null);
  const [stepContentLeft, setStepContentLeft] = useState(0);
  const stepBgRef = useRef(null);
  const [bgLeft, setBgLeft] = useState(0);
  const stepBorderRef = useRef(null);
  const [borderLeft, setBorderLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  const sticky = css`
    top: ${stickyTop}px;
  `;
  const stepBg = css`
    height: 100vh;
    left: ${bgLeft};
    z-index: -1;
  `;
  const stepBorder = css`
    left: ${borderLeft};
  `;
  const stepContent = css`
    left: ${stepContentLeft};
    z-index: 50;
    padding: 0 15rem;
    gap: 5rem;
    grid-template-columns: repeat(10, max-content);
  `;

  const scrollHandler = (e) => {
    const app = e.target;
    const stepBgWidth = stepBgRef.current.offsetWidth;
    const stepBorderWidth = stepBorderRef.current.offsetWidth;
    const stepContentWidth = stepContentRef.current.offsetWidth;
    if (app.scrollTop < introRef.current.clientHeight) {
      setProgress(0);
      setStickyTop(0);
    } else if (
      app.scrollTop >
      window.innerHeight * 2 + introRef.current.clientHeight
    ) {
      setProgress(1);
      setStickyTop(
        parseInt(
          -(
            app.scrollTop -
            window.innerHeight * 2 -
            introRef.current.clientHeight
          )
        )
      );
    } else {
      setStickyTop(0);
      setProgress(
        (app.scrollTop - introRef.current.clientHeight) /
          (window.innerHeight * 2)
      );
    }
    let stepBgPosition = (stepBgWidth - window.innerWidth) * progress;
    let stepBorderPosition = (stepBorderWidth - window.innerWidth) * progress;
    let stepContentPosition = (stepContentWidth - window.innerWidth) * progress;
    setBgLeft(`-${stepBgPosition}px`);
    setBorderLeft(`-${stepBorderPosition}px`);
    let setContent = stepContentPosition < 0 ? 0 : `-${stepContentPosition}px`;
    setStepContentLeft(setContent);
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
        <section
          className="recipeDetailStep position-sticky"
          ref={stepRef}
          css={sticky}
        >
          {/* step */}
          <div
            className="h-100 d-grid align-items-center position-absolute"
            ref={stepContentRef}
            css={stepContent}
          >
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
            <RecipeStepItem />
          </div>
          {/* Step Number */}
          <div className="position-absolute bottom-0 start-50 translate-middle recipeStepNum mb-3">
            <RecipeStepNumb num={10} />
          </div>
          {/* border */}
          <div
            className="d-flex position-absolute h-100"
            ref={stepBorderRef}
            css={stepBorder}
          >
            <img
              src="/img/recipe/other/step-bg1.png"
              alt=""
              className="h-100"
            />
            <img
              src="/img/recipe/other/step-bg2.png"
              alt=""
              className="h-100"
            />
          </div>
          {/* background */}
          <div
            className="position-absolute top-0 opacity-50"
            css={stepBg}
            ref={stepBgRef}
          >
            <img
              src="/img/recipe/other/recipe_step_bg.jpg"
              alt="stepBackGround"
              className="h-100"
            />
          </div>
        </section>

        {/* Recommend section */}
        <section className="vh100"></section>
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
