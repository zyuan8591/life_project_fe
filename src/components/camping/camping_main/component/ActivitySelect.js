import React from 'react';
import { useState } from 'react';
import Select from 'react-select';

const sortOption = [
  { value: 1, label: '最新活動' },
  { value: 2, label: '活動費用' },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
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
  control: (base, state) => ({
    ...base,
    border: '1px solid #817161',
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
function ActivitySelect() {
  const [selectSortOption, setSelectSortOption] = useState(null);

  return (
    <>
      <Select
        defaultValue={sortOption[0]}
        onChange={setSelectSortOption}
        options={sortOption}
        styles={customStyles}
        isSearchable={false}
      />
    </>
  );
}

export default ActivitySelect;
