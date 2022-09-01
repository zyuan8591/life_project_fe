import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../public_component/Footer';
import Header from '../public_component/Header';
import BackToTop from '../public_component/BackToTop';
import '../../styles/_recipeDetail.scss';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const location = useLocation();
  const stepRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // recipe progress
  let recipeProgress = 0;
  const scrollHandler = (e) => {
    console.log('scroll top：' + e.target.scrollTop);
    console.log('innerHeight：' + window.innerHeight);
    // const scrollTop = e.target.scrollTop;
    // const innerHeight = window.innerHeight;
    // if (scrollTop < innerHeight) {
    //   recipeProgress = 0;
    //   setProgress(recipeProgress);
    // } else if (scrollTop > innerHeight * 2) {
    //   recipeProgress = 1;
    //   setProgress(recipeProgress);
    // } else {
    //   recipeProgress = (scrollTop - innerHeight) / innerHeight;
    //   setProgress(recipeProgress);
    // }
    // let position =
    //   (stepRef.current.scrollWidth - window.innerWidth) * recipeProgress;
    // stepRef.current.scrollTo({ left: position });
    if (e.target.scrollTop < window.innerHeight) {
      recipeProgress = 0;
    } else if (e.target.scrollTop > window.innerHeight * 2) {
      recipeProgress = 1;
    } else {
      recipeProgress =
        (e.target.scrollTop - window.innerHeight) / window.innerHeight;
    }
    console.log(recipeProgress);

    let position =
      (stepRef.current.scrollWidth - window.innerWidth) * recipeProgress;

    stepRef.current.scrollTo({ left: position });

    setProgress(parseInt(recipeProgress));
  };

  return (
    <>
      <div
        className="recipeDetail"
        onScroll={(e) => {
          scrollHandler(e);
        }}
      >
        <Header fixed={false} />
        <section className="recipeDetailIntro">intro</section>
        <section
          className={`recipeDetailStep ${progress < 1 ? 'sticky' : ''}`}
          ref={stepRef}
        >
          <div className="vh100 bg-info"></div>
          <div className="vh100 bg-danger"></div>
        </section>
        <div className="vh100 bg-primary"></div>
        <div className="vh100 bg-warning"></div>

        <section className="recipeDetailRecommend vh100 bg-dark"></section>
        {/* <BackToTop /> */}
        <Footer />
      </div>
    </>
  );
};

export default RecipeDetail;
