import React from 'react';
import classes from '../../../styles/moduleCss/recipes/RecipeCateBtn.module.scss';

const RecipeCateBtn = ({ onclick, content, active }) => {
  return (
    <button className={`${classes.btn} ${active ? classes.active : ''}`}>
      {content}
    </button>
  );
};

export default RecipeCateBtn;
