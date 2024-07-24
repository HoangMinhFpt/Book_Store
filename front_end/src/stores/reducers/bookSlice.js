// features/books/bookSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks } from '../../services/BookMange';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async ({ page, limit }) => {
    const response = await getBooks({ page, limit });
    return response.data;
});

const bookSlice = createSlice({
    name: 'books',
    initialState: { data: [], status: 'idle', error: null, totalPages: 1, totalItem: 1, fromItem: 1, toItem: 1 },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.data;
                state.totalPages = action.payload.last_page;
                state.totalItem = action.payload.total;
                state.fromItem = action.payload.from;
                state.toItem = action.payload.to;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default bookSlice.reducer;
