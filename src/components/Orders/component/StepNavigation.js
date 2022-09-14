import React from 'react';
import Step from './Step';
import '../../../styles/Order/stepNavigation.scss';

const StepNavigation = (props) => {
  return (
    <>
      <div className="stepWrapper">
        {props.stepLabel.map((item, index) => (
          <Step
            key={index}
            index={index}
            label={item}
            selected={props.currentStep >= index + 1}
          ></Step>
        ))}
      </div>
    </>
  );
};

export default StepNavigation;
