import React from 'react';
import { useState } from 'react';
import Select from 'react-select';

const sortOption = [
  { value: '', label: '全部活動' },
  { value: 1, label: '露營' },
  { value: 2, label: '野餐' },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    height: '32px',
    color: state.isSelected ? '#fff' : '#444',
    background: state.isSelected ? '#817161' : '#fff',
    ':active': {
      ...provided[':active'],
      backgroundColor: !state.isDisabled
        ? state.isSelected
          ? '#817161'
          : '#81716180'
        : undefined,
    },
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '32px',
    width: '32px',
  }),
  control: (base, state) => ({
    ...base,
    width: '110px',
    marginRight: '5px',
    border: '1px solid #817161',
    minHeight: '32px',
    borderColor: state.isFocused ? '#817161' : 'hsl(0, 0%, 80%)',
    boxShadow: 0,
    '&:hover': {
      border: state.isFocused ? '1px solid #817161' : '1px solid #817161',
    },
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};
function MapActivitySelect({ setTypeSelect }) {
  // const [selectSortOption, setSelectSortOption] = useState(null);

  return (
    <>
      <Select
        defaultValue={sortOption[0]}
        onChange={(e) => {
          // console.log(e.value);
          const value = e.value;
          if (value === 2) {
            setTypeSelect(e.value);
          } else {
            setTypeSelect(e.value);
          }
        }}
        options={sortOption}
        styles={customStyles}
        isSearchable={false}
      />
    </>
  );
}

export default MapActivitySelect;
