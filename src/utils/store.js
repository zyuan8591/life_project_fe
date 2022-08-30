import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './paginationSlice';

const store = configureStore({
  reducer: {
    pagination: paginationReducer,
  },
});

export default store;
