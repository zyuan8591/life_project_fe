import React from 'react';
import { useState } from 'react';
import Select from 'react-select';

const sortOption = [
  { value: 1, label: '< 1km' },
  { value: 2, label: '< 2km' },
  { value: 3, label: '< 3km' },
  { value: 4, label: '< 4km' },
  { value: 5, label: '< 5km' },
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
function DistanceSelect() {
  // const [selectSortOption, setSelectSortOption] = useState(null);

  return (
    <>
      <Select
        defaultValue={sortOption[0]}
        onChange={(e) => {
          // console.log(e.value);
          // setOrder(e.value);
        }}
        options={sortOption}
        styles={customStyles}
        isSearchable={false}
      />
    </>
  );
}

export default DistanceSelect;
