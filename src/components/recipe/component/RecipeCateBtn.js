import React from 'react';
import classes from '../../../styles/moduleCss/recipes/RecipeCateBtn.module.scss';
import { useSearchParams } from 'react-router-dom';

const RecipeCateBtn = ({ cateNum, onclick, content, active }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <button
      className={`${classes.btn} ${active ? classes.active : ''}`}
      onClick={() => {
        const params = Object.fromEntries([...searchParams]);
        params['recipeCate'] = cateNum;
        setSearchParams(params);
      }}
    >
      {content}
    </button>
  );
};

export default RecipeCateBtn;
