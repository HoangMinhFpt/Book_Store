import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import authorReducer from './reducers/authorSlice';
import genreReducer from './reducers/genreSlice';
import bookReducer from './reducers/bookSlice';
import cartReducer from './reducers/cartSlice';
import wishlistReducer from './reducers/wishlistSlice';
import { loadState, saveState } from '../utils/localStorage';
import themeReducer from './reducers/themeSlice';
import languageReducer from './reducers/languageSlice';

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        authors: authorReducer,
        genres: genreReducer,
        books: bookReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        theme: themeReducer,
        language: languageReducer
    },
    preloadedState,
});

store.subscribe(() => {
    saveState({
        cart: store.getState().cart,
        wishlist: store.getState().wishlist,
        theme: store.getState().theme,
        language: store.getState().language
    });
});

export default store;
