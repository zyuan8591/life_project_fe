import { createSlice } from '@reduxjs/toolkit';

const initialState = { pagination: '首頁' };

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action) {
      state.pagination = action.payload;
    },
  },
});

export const { setPage } = paginationSlice.actions;
export default paginationSlice.reducer;
