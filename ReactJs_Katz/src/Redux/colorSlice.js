import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colors: ['#ecd5d5', '#FFDAB9', '#f2e5f2', '#e4c3e4', '#FFFFFF', '#FFFACD'], // An array of initial colors
};

export const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
});

export default colorSlice.reducer;
