// src/store/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light', // default theme
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
