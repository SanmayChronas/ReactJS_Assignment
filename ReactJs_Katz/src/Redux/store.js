import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './colorSlice'; // Import the colorSlice

export const store = configureStore({
  reducer: {
    colors: colorReducer,
  },
});

export default store;
