import React from 'react';
import classes from '../../../styles/moduleCss/index/IndexRecipeActivity.module.scss';
import { Link } from 'react-router-dom';

const IndexRecipeActivity = () => {
  return (
    <div className={classes.px2}>
      <Link
        to="/recipes"
        className={`mx-auto ${classes.container} p-3 my-5 d-flex flex-column position-relative`}
      >
        <figure className="m-0 position-absolute bottom-0 start-50 translate-middle-x">
          <img
            src="/img/index/indexRecipeActivity.png"
            alt="recipe_activity_img"
            className="objectContain"
          />
        </figure>
        <div className={`fs-2 fw-bold position-relative ${classes.title}`}>
          今晚，我想來點．．．
        </div>
        <div
          className={`fw-bold ms-5 position-relative fs-6 ${classes.subtitle}`}
        >
          找尋適合您的料理及家電吧
        </div>
        <div className="align-self-end position-relative fs-6">　</div>
      </Link>
    </div>
  );
};

export default IndexRecipeActivity;
