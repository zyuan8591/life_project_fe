import React from 'react';
import { useState } from 'react';
import Select from 'react-select';

const sortOption = [
  { value: 0, label: '搜尋範圍', distance: '', radius: '' },
  { value: 1, label: '< 1.5km', distance: '<1.5', radius: 3000 },
  { value: 2, label: '< 3km', distance: '<3', radius: 6000 },
  { value: 3, label: '< 4.5km', distance: '<4.5', radius: 9000 },
  { value: 4, label: '< 6km', distance: '<6', radius: 12000 },
  { value: 5, label: '< 10km', distance: '<10', radius: 20000 },
  // { value: 5, label: '>= 20km', distance: '>=20', radius: 10000 },
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
    width: '110px',
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
function DistanceSelect({ setDistanceSelect, setRadius }) {
  // const [selectSortOption, setSelectSortOption] = useState(null);

  return (
    <>
      <Select
        defaultValue={sortOption[0]}
        onChange={(e) => {
          // console.log(e.radius);
          setRadius(e.radius);
          setDistanceSelect(e.distance);
        }}
        options={sortOption}
        styles={customStyles}
        isSearchable={false}
      />
    </>
  );
}

export default DistanceSelect;
