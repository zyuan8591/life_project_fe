import { createSlice } from '@reduxjs/toolkit';

const initialState = { pagination: '首頁' };

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action) {
      state.pagination = action.payload;
    },
    // products(state) {
    //   state.pagination = 'products';
    // },
    // recipes(state) {
    //   state.pagination = 'recipes';
    // },
    // users(state) {
    //   state.pagination = 'users';
    // },
    // activities(state) {
    //   state.pagination = 'activities';
    // },
    // cart(state) {
    //   state.pagination = 'cart';
    // },
    // news(state) {
    //   state.pagination = 'news';
    // },
  },
});

export const { setPage } = paginationSlice.actions;
// export const { homepage, products, recipes, users, activities, cart, news } =
//   paginationSlice.actions;
export default paginationSlice.reducer;
