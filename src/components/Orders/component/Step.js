import React from 'react';
import { IconContext } from 'react-icons';
import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';

const Step = (props) => {
  // console.log(props);
  const stepIcon = (p) => {
    switch (p) {
      case 1:
        return <FiShoppingBag />;
      case 2:
        return <AiOutlineEdit />;
      case 3:
        return <AiOutlineCheck />;
      default:
        break;
    }
  };
  return (
    <>
      <div className={'stepBlock ' + (props.selected ? 'selected' : '')}>
        <div className={'circleWrapper'}>
          <div className="circle">
            <IconContext.Provider value={{ color: '#444', size: '2rem' }}>
              {stepIcon(props.index + 1)}
            </IconContext.Provider>
          </div>
        </div>
        <span>{props.label}</span>
      </div>
    </>
  );
};

export default Step;
