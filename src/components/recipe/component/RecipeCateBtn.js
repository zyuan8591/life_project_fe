import React from 'react';
import classes from '../../../styles/moduleCss/recipes/RecipeCateBtn.module.scss';

const RecipeCateBtn = ({ cateNum, onclick, content, active }) => {
  return (
    <button
      className={`${classes.btn} ${active ? classes.active : ''}`}
      onClick={() => onclick(cateNum)}
    >
      {content}
    </button>
  );
};

export default RecipeCateBtn;
